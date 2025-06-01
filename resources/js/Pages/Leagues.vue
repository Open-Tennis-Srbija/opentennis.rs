<script setup>
import { ref, onMounted } from 'vue';
import utils from '../utils';
import axios from 'axios';
import bus from 'vue3-eventbus';
import EditBtn from './components/EditIcon.vue';

const utl = utils;

const isClient = ref(false);

const leagues = ref([]);

const formatDate = ((start, end) =>{

    let raw_start = new Date(start);
    let raw_end = new Date(end);

    if(raw_start.getFullYear() == raw_end.getFullYear()){
      if(raw_start.getMonth() == raw_end.getMonth()){
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
});

</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Lige & Turniri -" />
  <div class="rankings-wrapper leagues">
    <div id="desktop">
      <div class="rankings-header">
        <div class="name">ime</div>
        <div class="elo">datum početak - datum kraj</div>
        <div class="elo">opština</div>
        <div class="total-matches">svi mečevi</div>
        <div class="wins">poeni</div>
        <div class="loses">teniseri</div>
      </div>
      <div v-if="leagues.length" class="ranking-entry" v-for="(league, index) in leagues">
        <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-ligu/${league.uri}`"><EditBtn/></Link>
        <div class="name"><Link prefetch="false" :href="`/${league.uri}`">{{league.name}}</Link></div>
        <div :class="{'inactive' : isInactive(league.date_end)}" class="wins">{{formatDate(league.date_start, league.date_end)}}</div>
        <div style="text-align:center" class="wins" :class="{'unknown': league.county == '?'}">{{league.county}}</div>
        <div class="total-matches">{{league.match_number}}</div>
        <div class="wins" :class="{'unknown': league.points == 0}">{{league.points}}</div>
        <div class="loses" :class="{'unknown': league.player_number == 0}">{{league.player_number}}</div>
      </div>
    </div>
    <div v-if="leagues" id="mobile">
        <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-ligu/${league.uri}`"><EditBtn/></Link>
      <div class="ranking-entry" v-for="(league, index) in leagues">
        <div class="name" style="font-weight: bold;"><Link prefetch="false" :href="`/${league.uri}`">{{league.name}}</Link></div>
        <div :class="{'inactive' : isInactive(league.date_end)}" class="date">{{formatDate(league.date_start, league.date_end)}}</div>
        <div class="county" :class="{'unknown': league.county == '?'}">{{league.county}}</div>

      </div>
    </div>
  </div>
</template>
