<script setup>
import { ref, onMounted } from 'vue';
import utils from '../utils';
import EditBtn from './components/EditIcon.vue';
const utl = utils;

const props = defineProps({
  players: Array,
});

const isCLient = ref(false);

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
  '?': 'transparent',
}

const categoryColors = {
  1: '#e9ecf1',
  2: '#d0dae3',
  3: '#bac7d7',
  4: '#a4b4cb',
  5: '#8da1ba',
  6: '#748fad',
  7: '#5e7ca0',
  8: '#486992',
  9: '#315585',
  10: '#194477',
  '?': 'transparent',
}

const categoryColorsRed = {
  1: '#f9ebeb',
  2: '#f4d7d9',
  3: '#efc3c4',
  4: '#e7afb2',
  5: '#e29a9e',
  6: '#dc878c',
  7: '#d87377',
  8: '#d16066',
  9: '#cc4b4f',
  10: '#c6373d',
  '?': 'transparent',
}

onMounted(() => {
  isCLient.value = true;
});

</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Teniseri -" />
  <div class="rankings-wrapper">
    <div id="desktop">
      <div class="rankings-header">
        <div class="spacer"></div>
        <div class="name">teniser</div>
        <div class="spacer"></div>
        <div class="elo">poeni</div>
        <div class="total-matches">svi mečevi</div>
        <div class="wins">pobede</div>
        <div class="loses">gubitci</div>
        <div class="win-precent">% pobeda</div>
        <div class="place">kategorija</div>
      </div>
      <div class="ranking-entry" v-for="(player, index) in players">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/teniser/izmeni/${player.id}`"><EditBtn/></Link>
        <div class="rank"
        :class="{'first': index==0, 'second': index == 1, 'third': index==2, 'align-left': index+1 > 9}">
          {{ index+1}}
        </div>
        <div class="name"><Link prefetch="false" :href="`/${player.uri}`">{{player.name}}</Link></div>
        <div class="spacer"></div>
        <div class="elo">{{utl.formatAsThousands(player.stats.elo)}}</div>
        <div class="total-matches">{{player.stats.total_matches}}</div>
        <div class="wins">{{player.stats.wins}}</div>
        <div class="loses">{{player.stats.loses}}</div>
        <div class="win-precent">{{player.stats.win_precentage}}%</div>
        <!-- <div class="place"><span class="diamond" :style="`background: linear-gradient(-90deg,${categoryColorsAll[player.category]} 0%, rgba(255, 255, 255, 1) 10% 30%, ${categoryColorsAll[player.category]} 100%);`"></span><span class="number" :class="{'unknown': player.category == '?'}">{{player.category}}</span></div> -->
        <div class="place"><span class="diamond" :style="`border: 1px solid ${categoryColorsAll[player.category]};`"></span><span class="number" :class="{'unknown': player.category == '?'}">{{player.category}}</span></div>
      </div>
    </div>

    <div id="mobile">
      <div class="ranking-entry" v-for="(player, index) in players">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/teniser/izmeni/${player.id}`"><EditBtn/></Link>
        <div class="rank"
        :class="{'first': index==0, 'second': index == 1, 'third': index==2, 'align-left': index+1 > 9}">
          {{ index+1}}
        </div>
        <div class="name"><Link prefetch="false" :href="`/${player.uri}`">{{player.name}}</Link></div>
        <div class="info">
          <div class="info-wrapp">
            <div class="sup">poeni</div>
            <div class="text">{{ utl.formatAsThousands(player.stats.elo) }}</div>
          </div>
          <div class="info-wrapp">
            <div class="sup">% pobede</div>
            <div class="text">{{player.stats.win_precentage}}%</div>
          </div>
          <div class="info-wrapp">
            <div class="sup">mečevi (p,g)</div>
            <div class="text">{{ player.stats.total_matches }} ({{ player.stats.wins }},{{ player.stats.loses }})</div>
          </div>
        </div>
        <div class="place"><span class="diamond" :style="{border: `1px solid ${categoryColorsAll[player.category] || 'transparent'}` }"></span><span class="number" :class="{'white': player.category > 5, 'unknown': player.category == '?'}">{{player.category}}</span></div>
      </div>
    </div>
  </div>
</template>
