<script setup>
import { ref, onMounted } from 'vue';
import utils from '../utils';
import axios from 'axios';
import bus from 'vue3-eventbus';
import EditBtn from './components/EditIcon.vue';
import { computed } from 'vue';

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
  <Head title="Tereni -" />
<div class="rankings-wrapper courts-list mobile-mb-300">
    <div id="desktop">
      <div class="rankings-header" :style="{top: `${ 137 - topOffset}px`}">
        <div class="spacer"></div>
        <div class="name">teren</div>
        <div class="spacer"></div>
        <div></div>
        <div class="elo">poeni</div>
        <div class="total-matches">mečevi</div>
        <div class="total-matches">teniseri</div>
        <div class="total-matches">opština</div>
      </div>
      <div class="ranking-entry" v-for="(court, index) in courts" :style="{marginTop: index === 0 ? '25px' : '0'}">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-teren/${court.id}`"><EditBtn/></Link>
        <div class="rank">
          {{ index+1 }}
        </div>
        <div class="name helvetica"><Link prefetch="false" :href="`/tereni/${court.uri}`">{{court.name}}</Link></div>
        <div class="spacer"></div>
        <div></div>
        <div class="elo">{{utl.formatAsThousands(court.points)}}</div>
        <div class="total-matches">{{court.matches_number}}</div>
        <div class="total-matches">{{court.player_number}}</div>
        <div class="total-matches smaller-font" style="text-align: center;">{{court.county}}</div>
      </div>
    </div>

    <div id="mobile">
      <div class="ranking-entry" v-for="(court, index) in courts">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-teren/${court.id}`"><EditBtn/></Link>
        <div class="rank">
          {{ index+1 }}
        </div>
        <div class="name helvetica text-align-center"><Link prefetch="false" :href="`/tereni/${court.uri}`">{{court.name}}</Link></div>
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
