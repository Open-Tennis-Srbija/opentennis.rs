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
  axios.get('/get-leagues').then((response) => {
    leagues.value = response.data;
    bus.emit('loading', false);
  }).catch((error) => {
    console.error('Error fetching leagues:', error);
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
</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Lige & Turniri -" />
  <div class="rankings-wrapper leagues mobile-mb-300">
    <div id="desktop">
      <div class="rankings-header" style="top: 90px;">
      <!-- <div class="rankings-header" :style="{top: `${ 50 - topOffset}px`}"> -->
        <div class="spacer"></div>
        <div class="name">lige i turniri</div>
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
</template>
