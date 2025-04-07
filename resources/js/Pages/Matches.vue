<script setup>
import { computed, onMounted, onBeforeMount } from 'vue';
import EditIcon from './components/EditIcon.vue';

const props = defineProps({
  matches: Array,
  showMessage: Object,
});

onBeforeMount(() => {
  console.log(props.matches);
});

const formatedMatchesDesktop = computed(() => {
  let formated = props.matches.map((match, index) => {
    return {
      ...match,
      day: getDateDay(match.date),
      date: Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Europe/Belgrade' // Equivalent to GMT+1 (adjust based on daylight saving time)
    }).format(new Date(match.date)),
    };
  });
  return formated;
});
onMounted(()=>{
  console.log(props.matches);
})
const formatedMatchesMobile = computed(() => {
  let formated = props.matches.map((match, index) => {
    return {
      ...match,
      winner_first_name: match.winner.split(' ')[0],
      winner_last_name: match.winner.split(' ')[1],
      loser_first_name: match.loser.split(' ')[0],
      loser_last_name: match.loser.split(' ')[1],
      day: getDateDay(match.date),
      date: Intl.DateTimeFormat('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'Europe/Belgrade' // Equivalent to GMT+1 (adjust based on daylight saving time)
    }).format(new Date(match.date)),
    };
  });
  return formated;
});

function getDateDay(date){
  let days = ['ned','pon', 'uto', 'sre', 'čet', 'pet', 'sub'];
  let day = new Date(date).getDay();

  return days[day]
}

</script>
<template>
  <Head title="Mečevi -" />
  <div class="matches-wrapper">
    <div id="desktop">
      <div class="matches-header">
        <div class="spacer number">#</div>
        <div class="winner">pobednik</div>
        <div class="loser">gubitnik</div>
        <div class="spacer"></div>
        <div class="score">rezultat</div>
        <div class="date">datum</div>
        <div class="location">opština</div>
        <div class="location">teren</div>
      </div>
      <div v-if="props.showMessage">
        <p v-if="props.showMessage.wins"class="message">Ovaj teniser nikada nije pobedio &#128577;</p>
        <p v-if="props.showMessage.loses" class="message">Ovaj teniser nikada nije izgubio &#128578;</p>
      </div>
      <div class="match-entry" v-for="(match, index) in formatedMatchesDesktop" :key="index">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni/${match.id}`"><EditIcon/></Link>
        <div class="number">{{ match.number || matches.length - index }}</div>
        <div class="winner"><Link prefetch="false" :href="`/${match.winner_uri}`">{{ match.winner }}</Link><br><span class="points">+{{ match.winner_points }}</span></div>
        <div class="loser"><Link prefetch="false" :href="`/${match.loser_uri}`">{{ match.loser }}</Link><br><span class="points">+{{ match.loser_points }}</span></div>
        <div class="spacer"></div>
        <div class="score">{{ match.set_score }}<br><span class="gray">{{ match.game_score }}</span></div>
        <div class="date">{{match.day}} <br/> {{ match.date }}</div>
        <div class="location">{{ match.location }}</div>
        <div class="location">
            <template v-if="match.court.link == ''">
                    {{ match.court.name }}
            </template>
            <template v-else>
                <a target="_blank" :href="match.court.link">
                    {{ match.court.name }}
                </a>
            </template>
        </div>
      </div>
    </div>
    <div id="mobile">
      <div v-if="props.showMessage">
        <p v-if="props.showMessage.wins"class="message">Ovaj teniser nikada nije pobedio &#128577;</p>
        <p v-if="props.showMessage.loses" class="message">Ovaj teniser nikada nije izgubio &#128578;</p>
      </div>
      <div class="match-entry" v-for="(match, index) in formatedMatchesMobile" :key="index">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni/${match.id}`"><EditIcon/></Link>
        <div class="score">
          {{ match.set_score }}
          <br />
          <span class="games">{{ match.game_score }}</span>
        </div>

        <div class="info">
          <div class="info-wrapp">
            <div class="text"><Link prefetch="false" :href="`/${match.winner_uri}`">{{ match.winner_first_name }}<br>{{ match.winner_last_name }}</Link><br><span class="points">+{{ match.winner_points }}</span></div>
          </div>

          <div class="sep">:</div>

          <div class="info-wrapp">
            <div class="text"><Link prefetch="false" :href="`/${match.loser_uri}`">{{ match.loser_first_name }}<br>{{ match.loser_last_name }}</Link><br><span class="points">+{{ match.loser_points }}</span></div>
          </div>
        </div>

        <div class="location">
          #{{ match.number || matches.length - index }}, {{ match.day }} {{ match.date }}
         <br>
        <template v-if="match.court.id == 1">
          {{ match.location }}
        </template>
        <template v-else>
                        {{ match.location }}, <a v-if="match.court.link !== ''" target="_blank" :href="match.court.link">{{ match.court.name }}</a> <span v-else>{{ match.court.name }}</span>
        </template>
        </div>
      </div>
    </div>
  </div>
</template>
