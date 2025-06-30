<script setup>
import { usePage } from "@inertiajs/vue3";
import { onMounted, computed, reactive, onBeforeMount } from "vue";
import utils from "../utils";
import axios from "axios";
import bus from "vue3-eventbus";
import { ref } from "vue";
import EditIcon from "./components/EditIcon.vue";

const utl = utils;
const court = ref({});

const page = usePage();
const isExpanded = reactive({
    players: false,
    leagues: false,
});
const props = defineProps({
    court_id: String,
});
onMounted(() => {
    page.props["title"] = "Tereni";
    axios.get(`/get-court/${props.court_id}`).then((response) => {
        court.value = response.data;
        bus.emit("loading", false);
    }).catch((error) => {
        console.error("Error fetching court:", error);
    });
});
const points = computed(() => {
	if (!court.value.points) {
		return 0;
	}
	return utils.formatAsThousands(court.value.points);
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
    if(court.value.players.length <= 10 || isExpanded.players){
            data =  court.value.players
    }
    else {
        data = court.value.players.slice(0, 10)
    }
    return data;

})
const leagues = computed(()=>{
    let data = []
    if(court.value.leagues.length <= 10 || isExpanded.leagues){
            data =  court.value.leagues
    }
    else {
        data = court.value.leagues.slice(0, 10)
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
        <div
			class="rank">
			<p :class="{ 'align-left': court.position > 9,'n40': court.position >= 40 && court.position < 50 }">
				{{ court.position }}
			</p>
		</div>
        <h1 :class="{'fix-letters': containsGreek(court.name)}">
            {{ court.name }}<Link prefetch="false"
				class="edit-btn"
				v-if="$page.props.auth.user"
				:href="`/izmeni-teren/${props.court_id}`"
				><EditIcon
                class="league"
			/></Link>
        </h1>

        <p class="subtitle-spacer" v-if="!court.link">
			&nbsp;
		</p>
		<p class="subtitle">
            <a v-if="court.link" :href="court.link" target="_blank" rel="noopener noreferrer">
                link
            </a>
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
                    <p>{{ court.player_number }}</p>
                </div>
                <div class="summary-item">
                    <h2>mečevi</h2>
                    <p>{{ court.match_number }}</p>
                </div>
            </div>
            <h2 class="summary-title low-margin">lige & turniri</h2>
            <div class="summary player three col">
                <div class="summary-item players">
                </div>
                <div class="summary-item players">
                    <template v-if="court.leagues?.length > 0">
                        <template v-for="league in leagues">
                            <p>
                                <Link prefetch="false" :href="`/${league.uri}`">{{
                                    league.name
                                }}</Link>
                            </p>
                        </template>
                        <p
                            v-if="Object.values(court.leagues).length > 10"
                            class="show-more"
                            @click="isExpanded.leagues = !isExpanded.leagues">
                            {{ !isExpanded.leagues ? 'vidi sve' : 'vidi manje' }}
                        </p>
                    </template>
                    <template v-else>
                        <h2>na ovom terenu nema liga ili turnira &#128577;</h2>
                    </template>
                </div>
                <div class="summary-item players">
                </div>
            </div>
            <h2 class="summary-title low-margin">teniseri</h2>
            <div class="summary player three col">
                <div class="summary-item players">
                </div>
                <div class="summary-item players">
                    <template v-if="court.players?.length > 0">
                        <template v-for="player in players">
                            <p>
                                <Link prefetch="false" :href="`/${player.uri}`">{{
                                    player.name
                                }}</Link>
                            </p>
                        </template>
                        <p
                            v-if="Object.values(court.players).length > 10"
                            class="show-more"
                            @click="isExpanded.players = !isExpanded.players">
                            {{ !isExpanded.players ? 'vidi sve' : 'vidi manje' }}
                        </p>
                    </template>
                    <template v-else>
                        <h2>ovaj teren nema aktivnih igrača &#128577;</h2>
                    </template>
                </div>
                <div class="summary-item players">
                </div>
            </div>
            <h2 class="summary-title no-border low-margin">mečevi</h2>
            <div class="player-matches">
                <MatchTable
                v-if="court.matches"
                :propMatches="court.matches" :loadMatches="false" :showMessage="{ league: court.match_number == 0 }"
                />
            </div>
        </div>
    </div>
    <Head :title="`${court.name} -`" />
</template>
