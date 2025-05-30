<script setup>
import { usePage } from "@inertiajs/vue3";
import { onMounted, computed, reactive, onBeforeMount } from "vue";
import utils from "../utils";
import PlayerChart from "./components/PlayerChart.vue";
import EditIcon from "./components/EditIcon.vue";

const utl = utils;
const props = defineProps({ league: Object });
const page = usePage();
const isExpanded = reactive({
    players: false,
});
onBeforeMount(()=>{

    console.log(props.league)

})

onMounted(() => {
    page.props["title"] = "Lige & Turniri";
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
    if(props.league.players.length <= 10 || isExpanded.players){
            data =  props.league.players
    }
    else {
        data = props.league.players.slice(0, 10)
    }
    return data;

})

function containsGreek(text) {
  return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text);
}

</script>
<template>
    <div style="margin-bottom: -20px; padding-bottom: 0;" class="static-wrapper player">
        <h1 :class="{'fix-letters': containsGreek(props.league.name)}">
            {{ props.league.name }}
        </h1>
     
        <p class="subtitle">{{ props.league.county }}</p>
        <p class="subtitle-spacer" >
            &nbsp;
        </p>
        <p style="color: black" class="subtitle">
            {{formatDate(league.date_start, league.date_end)}} 
        </p>

        <div class="dashboard-wrapper">
            <h2 class="summary-title">Statistika</h2>
            <div class="summary player three">
                <div class="summary-item">
                    <h2>poeni</h2>
                    <p>{{ utils.formatAsThousands(props.league.points) }}</p>
                </div>
                <div class="summary-item">
                    <h2>teniseri</h2>
                    <p>{{ props.league.player_number }}</p>
                </div>
                <div class="summary-item">
                    <h2>svi mečevi</h2>
                    <p>{{ props.league.match_number }}</p>
                </div>
            </div>
            <h2 class="summary-title low-margin">teniseri</h2>
            <div class="summary player three col">
                <div class="summary-item players">
                </div>
                <div class="summary-item players">
                    <template v-if="props.league.players.length > 0">
                        <template v-for="player in players">
                            <p>
                                <Link prefetch="false" :href="`/${player.uri}`">{{
                                    player.name
                                }}</Link>
                            </p>
                        </template>
                        <p
                            v-if="Object.values(props.league.players).length > 10"
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
                    :matches="props.league.matches":showMessage="{ league: props.league.match_number == 0 }"
                />
            </div>
        </div>
    </div>
    <Head :title="`${props.league.name} -`" />
</template>
