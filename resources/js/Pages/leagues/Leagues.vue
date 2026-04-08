<script setup>
import { ref, onMounted, watch } from 'vue';
import utils from '../../utils';
import axios from 'axios';
import bus from 'vue3-eventbus';
import EditBtn from '@components/EditIcon.vue';
import Dropdown from '@components/Dropdown.vue';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const utl = utils;

const isClient = ref(false);

const leagues = ref([]);
const isLoading = ref(true); // Add loading state

const sortKey = ref('match_number');
const sortDir = ref('desc');

const toggleSort = (key) => {
    if (sortKey.value === key) {
        sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc';
    } else {
        sortKey.value = key;
        sortDir.value = 'desc';
    }
};

const sortOptions = [
    { id: 'match_number_desc', name: 'mečevi ▼', key: 'match_number', dir: 'desc' },
    { id: 'match_number_asc', name: 'mečevi ▲', key: 'match_number', dir: 'asc' },
    { id: 'name_asc', name: 'liga A-Ž', key: 'name', dir: 'asc' },
    { id: 'name_desc', name: 'liga Ž-A', key: 'name', dir: 'desc' },
    { id: 'date_start_desc', name: 'datum ▼', key: 'date_start', dir: 'desc' },
    { id: 'date_start_asc', name: 'datum ▲', key: 'date_start', dir: 'asc' },
    { id: 'player_number_desc', name: 'teniseri ▼', key: 'player_number', dir: 'desc' },
    { id: 'player_number_asc', name: 'teniseri ▲', key: 'player_number', dir: 'asc' },
    { id: 'county_asc', name: 'opština A-Ž', key: 'county', dir: 'asc' },
    { id: 'county_desc', name: 'opština Ž-A', key: 'county', dir: 'desc' },
];

const selectedSort = ref({ ...sortOptions[0] });

watch(selectedSort, (val) => {
    const option = sortOptions.find(o => o.id === val.id);
    if (option) {
        sortKey.value = option.key;
        sortDir.value = option.dir;
    }
}, { deep: true });

const sortedLeagues = computed(() => {
    const compareByKey = (a, b, key, dir) => {
        let aVal = a[key];
        let bVal = b[key];
        if (key === 'name' || key === 'county') {
            aVal = (aVal || '').toLowerCase();
            bVal = (bVal || '').toLowerCase();
            return dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        if (key === 'date_start') {
            aVal = new Date(aVal || 0).getTime();
            bVal = new Date(bVal || 0).getTime();
        }
        return dir === 'asc' ? aVal - bVal : bVal - aVal;
    };

    return [...leagues.value].sort((a, b) => {
        // 1. Primary: current sort key
        let result = compareByKey(a, b, sortKey.value, sortDir.value);
        if (result !== 0) return result;

        // 2. match_number desc (if not primary)
        if (sortKey.value !== 'match_number') {
            result = compareByKey(a, b, 'match_number', 'desc');
            if (result !== 0) return result;
        }

        // 3. player_number desc (if not primary)
        if (sortKey.value !== 'player_number') {
            result = compareByKey(a, b, 'player_number', 'desc');
            if (result !== 0) return result;
        }

        // 4. Alphabetically asc (if not primary)
        if (sortKey.value !== 'name') {
            result = compareByKey(a, b, 'name', 'asc');
        }

        return result;
    });
});

const formatDate = ((start, end) =>{

    let raw_start = new Date(start);
    let raw_end = new Date(end);

    if(raw_start.getFullYear() == raw_end.getFullYear()){
      if(raw_start.getMonth() == raw_end.getMonth()){
        if(raw_start.getFullYear() ==  new Date().getFullYear()) 
          if(raw_start.getDate() == raw_end.getDate())
            return `${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)}`
          else
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
          if(raw_start.getDate() == raw_end.getDate())
            return [`${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)}`, `${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)}`]
          else
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

const areSameDate = (start, end) => {
    const raw_start = new Date(start);
    const raw_end = new Date(end);
    return raw_start.getDate() === raw_end.getDate() &&
           raw_start.getMonth() === raw_end.getMonth() &&
           raw_start.getFullYear() === raw_end.getFullYear();
}

onMounted(() => {
  isClient.value = true;
  axios.get('/get-leagues').then((response) => {
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
    if (scrollPos.value >= 70) {
        return 160;
    } else {
        return scrollPos.value * 2;
    }
});

// Function to generate random widths for more realistic skeleton
const getRandomWidth = () => {
    return Math.floor(Math.random() * (85 - 60 + 1)) + 60; // Random between 60% and 85%
};

const page = usePage();
const headerStats = computed(() => page.props.headerStats);

const leaguesText = computed(() => {
   //check last digit of headerStats.totalLeagues
   const lastDigit = headerStats.value.totalLeagues % 10;
   if(headerStats.value.totalLeagues === 0){
       return "Lige";
   }
   else if (lastDigit === 1) {
       return utils.formatAsThousands(headerStats.value.totalLeagues - 1) + " Liga";
   }
 else if (lastDigit === 2 || headerStats.value.totalLeagues === 3) {
       return utils.formatAsThousands(headerStats.value.totalLeagues - 1) + " lige";
   }
   else {
       return utils.formatAsThousands(headerStats.value.totalLeagues - 1) + " Liga";
   }
});
</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Lige -" />
  <h1 class="list-title">{{ leaguesText }}</h1>
  <div class="rankings-wrapper leagues mobile-mb-300">
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="skeleton-wrapper">
      <div id="desktop">
        <div class="rankings-header" :style="{ top: 200 - topOffset + 'px' }">
          <div class="name">lige</div>
          <div class="date-range">početak - kraj</div>
          <div class="total-matches">mečevi</div>
          <div class="loses">teniseri</div>
          <div class="county-col">opština</div>
        </div>
        <div v-for="n in 8" :key="`desktop-skeleton-${n}`" class="ranking-entry skeleton" :style="{marginTop: index === 0 ? 25 - topOffset/3 + 'px' : '0'}">
          <div class="name">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="date-range smaller-font">
            <div class="skeleton-item skeleton-text" style="margin-bottom: 4px; width: 70%;"></div>
            <div class="skeleton-item skeleton-text" style="width: 80%;"></div>
          </div>
          <div class="total-matches">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="loses">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="county-col smaller-font">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
        </div>
      </div>
      <div id="mobile">
        <!-- <div class="mobile-sort-filter">
          <Dropdown
            label="name"
            :options="sortOptions"
            v-model="selectedSort"
            :multiple="false"
            :searchable="false"
          />
        </div> -->
        <div v-for="n in 8" :key="`mobile-skeleton-${n}`" class="ranking-entry skeleton">
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
        <div class="rankings-header" :style="{ top: 200 - topOffset + 'px' }">
          <div class="name sortable" :class="{ active: sortKey === 'name', asc: sortKey === 'name' && sortDir === 'asc' }" @click="toggleSort('name')">lige</div>
          <div class="date-range sortable" :class="{ active: sortKey === 'date_start', asc: sortKey === 'date_start' && sortDir === 'asc' }" @click="toggleSort('date_start')">početak - kraj</div>
          <div class="total-matches sortable" :class="{ active: sortKey === 'match_number', asc: sortKey === 'match_number' && sortDir === 'asc' }" @click="toggleSort('match_number')">mečevi</div>
          <div class="loses sortable" :class="{ active: sortKey === 'player_number', asc: sortKey === 'player_number' && sortDir === 'asc' }" @click="toggleSort('player_number')">teniseri</div>
          <div class="county-col sortable" :class="{ active: sortKey === 'county', asc: sortKey === 'county' && sortDir === 'asc' }" @click="toggleSort('county')">opština</div>
        </div>
        <div v-if="sortedLeagues.length" class="ranking-entry" v-for="(league, index) in sortedLeagues" :style="{marginTop: index === 0 ? 25 - topOffset/3 + 'px' : '0'}" >
          <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-ligu/${league.uri}`"><EditBtn/></Link>
          <div class="name"><Link prefetch="false" :href="`/${league.uri}`">{{league.name}}</Link></div>
          <div style="text-align: center; line-height: 1.6;" :class="{'inactive' : isInactive(league.date_end)}" class="date-range smaller-font">{{formatDates(league.date_start, league.date_end)[0]}}<template v-if="!areSameDate(league.date_start, league.date_end)"><br>{{formatDates(league.date_start, league.date_end)[1]}}</template></div>
          <div class="total-matches">{{league.match_number}}</div>
          <div class="loses" :class="{'unknown': league.player_number == 0}">{{league.player_number}}</div>
          <div style="text-align:center" class="county-col smaller-font" :class="{'unknown': league.county == '?'}">{{league.county}}</div>
        </div>
      </div>
      <div v-if="sortedLeagues" id="mobile">
        <!-- <div class="mobile-sort-filter">
          <Dropdown
            label="name"
            :options="sortOptions"
            v-model="selectedSort"
            :multiple="false"
            :searchable="false"
          />
        </div> -->
        <div class="ranking-entry" v-for="(league, index) in sortedLeagues">
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

.sortable {
    cursor: pointer;
    user-select: none;
    &::before {
        content: '▼';
        font-size: 10px;
        margin-right: 4px;
        visibility: hidden;
    }
    &::after {
        content: '▼';
        font-size: 10px;
        margin-left: 4px;
        visibility: hidden;
    }
    &.name::before {
        content: none;
    }
    &:hover {
        color: #00aeef;
    }
    &.active {
        color: #ec008c;
        &::after {
            visibility: visible;
            content: '▼';
        }
        &.asc::after {
            content: '▲';
        }
    }
}

/* Mobile skeleton adjustments */
@media (max-width: 1200px) {
    .ranking-entry.skeleton .name,
    .ranking-entry.skeleton .date,
    .ranking-entry.skeleton .county {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 4px 0;
    }

    .skeleton-text {
        height: 14px;
    }
}

/* .mobile-sort-filter {
    display: none;
    padding: 0 20px;
    max-width: 400px;
    margin: 20px auto 50px;

    & + .ranking-entry {
        border-top: 2px solid #e2e0e1;
    }
}

@media only screen and (max-width: 1200px) {
    .mobile-sort-filter {
        display: block;
    }
} */
</style>
