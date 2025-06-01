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
  <div class="rankings-wrapper leagues">
    <div id="desktop">
      <div class="rankings-header">
        <div class="name">ime</div>
      </div>
      <div v-if="courts.length" class="ranking-entry" v-for="(court, index) in courts">
        <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-teren/${court.id}`"><EditBtn/></Link>
        <div class="name">{{court.name}}</div>
        <div class="spacer"></div>
      </div>
    </div>
    <div v-if="courts" id="mobile">
      <div class="ranking-entry" v-for="(court, index) in courts">
        <div class="name" style="font-weight: bold;">{{court.name}}</div>
      </div>
    </div>
  </div>
</template>
