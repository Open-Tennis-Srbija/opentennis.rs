<script setup>
import { ref, onMounted } from 'vue';
import utils from '../utils';
import axios from 'axios';
import bus from 'vue3-eventbus';
import EditBtn from './components/EditIcon.vue';

const utl = utils;

const isClient = ref(false);

const courts = ref([]);

onMounted(() => {
  isClient.value = true;
  axios.get('/get-courts').then((response) => {
    courts.value = response.data;
    bus.emit('loading', false);

  }).catch((error) => {
    console.error('Error fetching courts:', error);
  });
});

</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Tereni -" />
<div class="rankings-wrapper">
    <div id="desktop">
      <div class="rankings-header">
        <div class="spacer"></div>
        <div class="name">ime</div>
        <div class="spacer"></div>
        <div></div>
        <div></div>
        <div></div>
        <div class="elo">poeni</div>
        <div class="total-matches">mečevi</div>
        <div class="total-matches">teniseri</div>
      </div>
      <div class="ranking-entry" v-for="(court, index) in courts">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-teren/${court.id}`"><EditBtn/></Link>
        <div class="rank"
        :class="{'first': index+1 == 1, 'second': index+1 == 2, 'third': index+1 == 3, 'align-left': index+1 > 3}">
          {{ index+1 }}
        </div>
        <div class="name"><Link prefetch="false" :href="`/teren/${court.id}`">{{court.name}}</Link></div>
        <div class="spacer"></div>
        <div></div>
        <div></div>
        <div></div>
        <div class="elo">{{utl.formatAsThousands(court.points)}}</div>
        <div class="total-matches">{{court.matches_number}}</div>
        <div class="total-matches">{{court.player_number}}</div>
      </div>
    </div>

    <div id="mobile">
      <div class="ranking-entry" v-for="(court, index) in courts">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-teren/${court.id}`"><EditBtn/></Link>
        <div class="rank"
                    :class="{'first': index+1 ==1, 'second': index+1 == 2, 'third': index+1 ==3, 'align-left': index+1 > 3}">
          {{ index+1 }}
        </div>
        <div class="name"><Link prefetch="false" :href="`/teren/${court.id}`">{{court.name}}</Link></div>
        <div class="info">
          <div class="info-wrapp">
            <div class="sup">poeni</div>
            <div class="text">{{ utl.formatAsThousands(court.points) }}</div>
          </div>
          <div class="info-wrapp">
            <div class="sup">mečevi</div>
            <div class="text">{{ court.matches_number }}</div>
          </div>
          <div class="info-wrapp">
            <div class="sup">teniseri</div>
            <div class="text">{{ utl.formatAsThousands(court.player_number) }}</div>
          </div>
      </div>
    </div>
  </div>
</div>
</template>
