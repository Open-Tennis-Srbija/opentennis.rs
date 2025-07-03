<script setup>
import { usePage } from "@inertiajs/vue3";
import { onMounted, computed, reactive, onBeforeMount } from "vue";
import utils from "../utils";
import axios from "axios";
import bus from "vue3-eventbus";
import { ref } from "vue";
import EditIcon from "./components/EditIcon.vue";

const utl = utils;
const league = ref({});

const page = usePage();
const isExpanded = reactive({
    players: false,
});
const props = defineProps({
    league_uri: String,
});
onMounted(() => {
    page.props["title"] = "Lige & Turniri";
    axios.get(`/get-league/${props.league_uri}`).then((response) => {
        league.value = response.data;
        bus.emit("loading", false);
    }).catch((error) => {
        console.error("Error fetching league:", error);
    });
});
const points = computed(() => {
	if (!league.value.points) {
		return 0;
	}
	return utils.formatAsThousands(league.value.points);
});



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

const players = computed(()=>{
    let data = []
    if(league.value.players.length <= 10 || isExpanded.players){
            data =  league.value.players
    }
    else {
        data = league.value.players.slice(0, 10)
    }
    return data;

})

const isInactive = (date_end) => {
  const end = new Date(date_end);
  const now = new Date();
  return end < now.setHours(0,0,0,0);
};

function containsGreek(text) {
  return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text);
}

</script>
<template>
    <div style="margin-bottom: -20px; padding-bottom: 0;" class="static-wrapper player league">
        <Link prefetch="false"
				class="edit-btn"
				v-if="$page.props.auth.user"
				:href="`/izmeni-ligu/${league.uri}`"
				><EditIcon
                class="league"
			/></Link>
            <div
                class="rank"
            >
			<p :class="{ 'align-left': league.rank > 9,'n40': league.rank >= 40 && league.rank < 50 }">
				{{ league.rank }}
			</p>
		</div>
        <h1 class="red" :class="{'fix-letters': containsGreek(league.name)}">
            {{ league.name }}        </h1>

        <p class="subtitle">{{ league.county }}</p>
        <p class="subtitle-spacer" >
            &nbsp;
        </p>
        <p :style="{color: isInactive(league.date_end) ? '#949494' : 'black'}" class="subtitle">
            {{formatDate(league.date_start, league.date_end)}} 
        </p>

        <div class="dashboard-wrapper">
            <h2 class="summary-title">Statistika</h2>
            <div class="summary player three">
                <div class="summary-item">
                    <h2>poeni</h2>
                    <p>{{ points }}</p>
                </div>
                <div class="summary-item">
                    <h2>teniseri</h2>
                    <p>{{ league.player_number }}</p>
                </div>
                <div class="summary-item">
                    <h2>mečevi</h2>
                    <p>{{ league.match_number }}</p>
                </div>
            </div>
            <h2 class="summary-title low-margin">teniseri</h2>
            <div class="summary player three col">
                <div class="summary-item players">
                </div>
                <div class="summary-item players">
                    <template v-if="league.players?.length > 0">
                        <template v-for="player in players">
                            <p>
                                <Link prefetch="false" :href="`/${player.uri}`">{{
                                    player.name
                                }}</Link>
                            </p>
                        </template>
                        <p
                            v-if="Object.values(league.players).length > 10"
                            class="show-more"
                            @click="isExpanded.players = !isExpanded.players">
                            {{ !isExpanded.players ? 'vidi sve' : 'vidi manje' }}
                        </p>
                    </template>
                    <template v-else>
                        <h2>ovaj turnir nema aktivnih igrača &#128577;</h2>
                    </template>
                </div>
                <div class="summary-item players">
                </div>
            </div>
            <h2 class="summary-title no-border low-margin">mečevi</h2>
            <div class="player-matches">
                <MatchTable
                v-if="league.matches"   
                :propMatches="league.matches" :loadMatches="false" :showMessage="{ league: league.match_number == 0 }"
                />
            </div>
        </div>
    </div>
    <Head v-if="league && league.name" :title="`${league.name} -`" />
</template>
