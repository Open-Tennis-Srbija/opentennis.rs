<script setup>
import utils from '../utils';

const utl = utils;


const props = defineProps({
  players: Array,
});

</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Rang lista -" />
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
        <div class="place">mesto</div>
      </div>
      <div class="ranking-entry" v-for="(player, index) in players">
        <Link class="edit-btn" v-if="$page.props.auth.user" :href="`/teniser/izmeni/${player.id}`">&#9998;</Link>
        <div class="rank" 
        :class="{'first': index==0, 'second': index == 1, 'third': index==2, 'align-left': index+1 > 9}">
          {{ index+1}}
        </div>
        <div class="name"><Link :href="`/${player.uri}`">{{player.name}}</Link></div>
        <div class="spacer"></div>
        <div class="elo">{{utl.formatAsThousands(player.stats.elo)}}</div>
        <div class="total-matches">{{player.stats.total_matches}}</div>
        <div class="wins">{{player.stats.wins}}</div>
        <div class="loses">{{player.stats.loses}}</div>
        <div class="win-precent">{{player.stats.win_precentage}}%</div>
        <div class="place">{{player.location}}</div>
      </div>
    </div>

    <div id="mobile">
      <div class="ranking-entry" v-for="(player, index) in players">
        <Link class="edit-btn" v-if="$page.props.auth.user" :href="`/teniser/izmeni/${player.id}`">&#9998;</Link>
        <div class="rank" 
        :class="{'first': index==0, 'second': index == 1, 'third': index==2, 'align-left': index+1 > 9}">
          {{ index+1}}
        </div>
        <div class="name"><Link :href="`/${player.uri}`">{{player.name}}</Link></div>
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
        <div class="place">{{player.location}}</div>
      </div>
    </div>
  </div>
</template>