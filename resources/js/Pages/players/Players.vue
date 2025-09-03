<script setup>
import { ref, onMounted, watch } from 'vue';
import utils from '../../utils';
import EditBtn from '@components/EditIcon.vue';
import axios from 'axios';
import { bus } from "vue3-eventbus";
import { computed } from 'vue';

const players = ref([]);
const utl = utils;
const categoryColorsAll = {
  1: '#8dc73f',
  2: '#38b64b',
  3: '#00a99c',
  4: '#01aef0',
  5: '#0072bb',
  6: '#92278f',
  7: '#eb008b',
  8: '#ee1d23',
  9: '#f36621',
  10: '#f7941d',
  '?': '#a1a1a1',
}

const scrollPos = ref(0);

onMounted(() => {
    axios.get('/get-players').then((response) => {
        players.value = response.data;
       bus.emit('loading',false)
    }).catch((error) => {
        console.error('Error fetching players:', error);
    });
     window.addEventListener('pageshow', () => {
        bus.emit('loading', false);
    });

    bus.on('scroll', (top) => {
        handleScroll(top);
    });

});
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
  <Head title="Teniseri -" />
  <div class="rankings-wrapper mobile-mb-300">
    <div id="desktop">
      <div class="rankings-header"  style="top: 50px">
        <div class="spacer"></div>
        <div class="name">teniser</div>
        <div class="spacer"></div>
        <div class="place">kategorija</div>
        <div class="elo">poeni</div>
        <div class="total-matches">mečevi</div>
        <div class="wins">pobede</div>
        <div class="loses">gubitci</div>
        <div class="win-precent">% pobeda</div>
      </div>
      <div class="ranking-entry" v-for="(player, index) in players" :style="{marginTop: index === 0 ? '25px' : '0'}">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/${player.uri}/izmeni/`"><EditBtn/></Link>
        <div class="rank"
        :class="{'first': player.rank == 1, 'second': player.rank == 2, 'third': player.rank ==3, 'align-left': player.rank > 9}">
          {{ player.rank}}
        </div>
        <div class="name helvetica"><Link class="blue" prefetch="false" :href="`/${player.uri}`">{{player.name}}</Link></div>
        <div class="spacer"></div>
        <div class="place"><span class="diamond" :style="{border: `1px solid ${categoryColorsAll[player.category] || 'transparent'}` }"></span><span class="number" :class="{'category-unknown': player.category == '?', [`category-${player.category}`]: player.category != '?'}">{{player.category}}</span></div>
        <div class="elo">{{utl.formatAsThousands(player.points)}}</div>
        <div class="total-matches">{{player.total_matches}}</div>
        <div class="wins">{{player.wins}}</div>
        <div class="loses">{{player.loses}}</div>
        <div class="win-precent">{{player.win_precentage}}%</div>
      </div>
    </div>

    <div id="mobile">
      <div class="ranking-entry" v-for="(player, index) in players">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/${player.uri}/izmeni/`"><EditBtn/></Link>
        <div class="rank"
                    :class="{'first': player.rank ==1, 'second': player.rank == 2, 'third': player.rank ==3, 'align-left': player.rank > 9}">
          {{ player.rank }}
        </div>
        <div class="name helvetica"><Link class="blue" prefetch="false" :href="`/${player.uri}`">{{player.name}}</Link></div>
        <div class="info">
          <div class="info-wrapp">
            <div class="sup">poeni</div>
            <div class="text">{{ utl.formatAsThousands(player.points) }}</div>
          </div>
          <div class="info-wrapp">
            <div class="sup">% pobede</div>
            <div class="text">{{player.win_precentage}}%</div>
          </div>
          <div class="info-wrapp">
            <div class="sup">mečevi (p,g)</div>
            <div class="text">{{ player.total_matches }} ({{ player.wins }},{{ player.loses }})</div>
          </div>
        </div>
        <div class="place"><span class="diamond" :style="{border: `1px solid ${categoryColorsAll[player.category] || 'transparent'}` }"></span><span class="number" :class="{'unknown': player.category == '?'}">{{player.category}}</span></div>
      </div>
    </div>
  </div>
</template>
