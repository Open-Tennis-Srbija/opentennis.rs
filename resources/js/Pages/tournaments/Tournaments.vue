<script setup>
import { ref, onMounted } from 'vue';
import utils from '../../utils';
import axios from 'axios';
import bus from 'vue3-eventbus';
import EditBtn from '@components/EditIcon.vue';
import { computed } from 'vue';

const utl = utils;

const isClient = ref(false);

const leagues = ref([]);
const isLoading = ref(true); // Add loading state

const formatDate = ((start, end) =>{

    let raw_start = new Date(start);
    let raw_end = new Date(end);

    if(raw_start.getFullYear() == raw_end.getFullYear()){
      if(raw_start.getMonth() == raw_end.getMonth()){
        if(raw_start.getFullYear() ==  new Date().getFullYear()) 
          return `${utl.getDateDay(start)} ${raw_start.getDate()} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(start)}`
        else
          return `${utl.getDateDay(start)} ${raw_start.getDate()} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(start)} ${raw_end.getFullYear()}`
      }
      else{
        return `${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)} ${raw_end.getFullYear()}`
      }
    }
    else{
      return `${utl.formatDate(start)} - ${utl.formatDate(end)}`
    }
})

const formatDates =((start,end)=>{

    let raw_start = new Date(start);
    let raw_end = new Date(end);

    if(raw_start.getFullYear() == raw_end.getFullYear()){
        if(raw_start.getFullYear() ==  new Date().getFullYear()) 
          return [`${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)}`, `${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)}`]
        else
          return [`${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)}`, `${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)} ${raw_end.getFullYear()}`]
    }
    else{
      return [`${utl.formatDate(start)}`, `${utl.formatDate(end)}`]
    }


})
const isInactive = (date_end) => {
  const end = new Date(date_end);
  const now = new Date();
  return end < now.setHours(0,0,0,0);
};



onMounted(() => {
  isClient.value = true;
  axios.get('/get-tournaments').then((response) => {
    leagues.value = response.data;
    isLoading.value = false; // Set loading to false when data is loaded
    bus.emit('loading', false);
  }).catch((error) => {
    console.error('Error fetching leagues:', error);
    isLoading.value = false; // Set loading to false on error as well
    bus.emit('loading', false);
  });
 bus.on('scroll', (top) => {
        handleScroll(top);
    });
});

const scrollPos = ref(0);

const handleScroll = (top) => {
  scrollPos.value = top;
}

const topOffset = computed(() => {
    if (scrollPos.value >= 50) {
        return 95;
    } else {
        return scrollPos.value * 2;
    }
});

// Function to generate random widths for more realistic skeleton
const getRandomWidth = () => {
    return Math.floor(Math.random() * (85 - 60 + 1)) + 60; // Random between 60% and 85%
};
</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Turniri -" />
  <div class="rankings-wrapper leagues mobile-mb-300">
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="skeleton-wrapper">
      <div id="desktop">
        <div class="rankings-header" style="top: 90px;">
          <div class="spacer"></div>
          <div class="name">turniri</div>
          <div class="wins">poeni</div>
          <div class="total-matches">mečevi</div>
          <div class="loses">teniseri</div>
          <div class="elo">početak - kraj</div>
          <div class="elo">opština</div>
        </div>
        <div v-for="n in 8" :key="`desktop-skeleton-${n}`" class="ranking-entry skeleton" :style="{marginTop: n === 1 ? '25px' : '0'}">
          <div class="rank">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="name">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="elo league-points">
            <div class="skeleton-item skeleton-text medium"></div>
          </div>
          <div class="total-matches">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="loses">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="wins smaller-font">
            <div class="skeleton-item skeleton-text" style="margin-bottom: 4px; width: 70%;"></div>
            <div class="skeleton-item skeleton-text" style="width: 80%;"></div>
          </div>
          <div class="wins smaller-font">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
        </div>
      </div>
      <div id="mobile">
        <div v-for="n in 8" :key="`mobile-skeleton-${n}`" class="ranking-entry skeleton">
          <div class="rank">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="name" style="font-weight: bold; text-align: center;">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="date">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="county">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actual Content -->
    <div v-else>
      <div id="desktop">
        <div class="rankings-header" style="top: 90px;">
        <!-- <div class="rankings-header" :style="{top: `${ 50 - topOffset}px`}"> -->
          <div class="spacer"></div>
          <div class="name">turniri</div>
          <div class="wins">poeni</div>
          <div class="total-matches">mečevi</div>
          <div class="loses">teniseri</div>
          <div class="elo">početak - kraj</div>
          <div class="elo">opština</div>
        </div>
        <div v-if="leagues.length" class="ranking-entry" v-for="(league, index) in leagues" :style="{marginTop: index === 0 ? '25px' : '0'}" >
        <div class="rank">
            {{ index+1 }}
          </div>
          <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-ligu/${league.uri}`"><EditBtn/></Link>
          <div class="name"><Link prefetch="false" :href="`/${league.uri}`">{{league.name}}</Link></div>
          <div class="elo league-points" :class="{'unknown': league.points == 0}">{{utl.formatAsThousands(league.points)}}</div>
          <div class="total-matches">{{league.match_number}}</div>
          <div class="loses" :class="{'unknown': league.player_number == 0}">{{league.player_number}}</div>
          <div style="text-align: center; line-height: 1.6;" :class="{'inactive' : isInactive(league.date_end)}" class="wins smaller-font">{{formatDates(league.date_start, league.date_end)[0]}}<br>{{formatDates(league.date_start, league.date_end)[1]}}</div>
          <div style="text-align:center" class="wins smaller-font" :class="{'unknown': league.county == '?'}">{{league.county}}</div>
        </div>
      </div>
      <div v-if="leagues" id="mobile">
        <div class="ranking-entry" v-for="(league, index) in leagues">
          <div class="rank">
            {{ index + 1 }}
          </div>
          <div class="name" style="font-weight: bold; text-align: center;"><Link prefetch="false" :href="`/${league.uri}`">{{league.name}}</Link></div>
          <div :class="{'inactive' : isInactive(league.date_end)}" class="date">{{formatDate(league.date_start, league.date_end)}}</div>
          <div class="county" :class="{'unknown': league.county == '?'}">{{league.county}}</div>
          <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-ligu/${league.uri}`"><EditBtn/></Link>

        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Skeleton loading styles */
.skeleton-wrapper {
    pointer-events: none;
}

/* Skeleton Loading Styles */
.skeleton-item {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
}

.skeleton {
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    height: 16px;
    margin: 2px 0;
}

.skeleton-text {
    height: 16px;
}

.skeleton-text.small {
    height: 14px;
    width: 40%;
    margin: 0 auto;
}

.skeleton-text.medium {
    height: 16px;
    width: 60%;
    margin: 0 auto;
}

.ranking-entry.skeleton {
    opacity: 0.7;
    pointer-events: none;
}

.ranking-entry.skeleton .skeleton-item {
    color: transparent;
}

.ranking-entry.skeleton .rank {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ranking-entry.skeleton .name {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ranking-entry.skeleton .elo,
.ranking-entry.skeleton .wins,
.ranking-entry.skeleton .total-matches,
.ranking-entry.skeleton .loses {
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

/* Mobile skeleton adjustments */
@media (max-width: 768px) {
    .ranking-entry.skeleton .name,
    .ranking-entry.skeleton .date,
    .ranking-entry.skeleton .county {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 0;
    }

    .skeleton-text {
        height: 14px;
    }
}
</style>
