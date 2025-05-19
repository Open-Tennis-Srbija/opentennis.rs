<script setup>
import { usePage } from "@inertiajs/vue3";
import { onMounted, computed, reactive } from "vue";
import utils from "../utils";
import PlayerChart from "./components/PlayerChart.vue";
import EditIcon from "./components/EditIcon.vue";

const props = defineProps({ player: Object });
const page = usePage();
const isExpanded = reactive({
    wins: false,
    loses: false,
    not_played: false,
});

onMounted(() => {
    page.props["title"] = "teniser";
    console.log(props.player.data)
});

const matchups = computed(() => {
    let data = {};

    let wins = Object.values(props.player.data.matchups.wins);
    let loses = Object.values(props.player.data.matchups.loses);

    if (props.player.data.matchups.wins) {
        if (wins.length <= 10 || isExpanded.wins) {
            data = { ...data, wins: props.player.data.matchups.wins };
        } else {
            data = { ...data, wins: props.player.data.matchups.wins.slice(0, 10) };
        }
    } else {
        data = { ...data, wins: [] };
    }

    if (props.player.data.matchups.loses) {
        if (loses.length <= 10 || isExpanded.loses) {
            data = { ...data, loses: props.player.data.matchups.loses };
        } else {
            data = { ...data, loses: props.player.data.matchups.loses.slice(0, 10) };
        }
    } else {
        data = { ...data, loses: [] };
    }

    if (props.player.data.matchups.notPlayedWith) {
        if(props.player.data.matchups.notPlayedWith.length <= 10 || isExpanded.not_played){
            data = {...data, not_played: props.player.data.matchups.notPlayedWith}
        }
        else {
            data = {...data ,not_played: props.player.data.matchups.notPlayedWith.slice(0, 10)}
        }
    } else {
        data = {...data, not_played: []}
    }
    return data
});

const locations = computed(()=>{
    return {
        courts: props.player.data.locations.courts,
        locations: props.player.data.locations.locations,
        leagues: props.player.data.locations.leagues,
    };
});
const getInteractionText = (number) =>{
    if(number == 1 || (number>20 && number%10 == 1)){
        return "teniserom";
    }
    else return "tenisera";
}

function containsGreek(text) {
  return /[\u0370-\u03FF\u1F00-\u1FFF]/.test(text);
}

</script>
<template>
    <div style="margin-bottom: -20px; padding-bottom: 0;" class="static-wrapper player">
        <div
            class="rank"
            :class="{
                first: props.player.data.position == 1,
                second: props.player.data.position == 2,
                third: props.player.data.position == 3,
            }"
        >
            <p :class="{ 'align-left': props.player.data.position > 9 }">
                {{ props.player.data.position }}
            </p>
        </div>
        <h1 :class="{'fix-letters': containsGreek(props.player.data.name)}">
            {{ props.player.data.name
            }}<Link prefetch="false"
                class="edit-btn"
                v-if="$page.props.auth.user"
                :href="`/teniser/izmeni/${props.player.data.id}`"
                ><EditIcon
            /></Link>
        </h1>
        <p class="subtitle-spacer" v-if="!props.player.data.club && !props.player.data.location">
            &nbsp;
        </p>
        <p class="subtitle">
            {{ props.player.data.club }}{{ props.player.data.club ? ", " : " " }}{{ props.player.data.location }}
        </p>

        <div class="dashboard-wrapper">
            <h2 class="summary-title">Statistika</h2>
            <div class="summary player five desktop">
                <div class="summary-item">
                    <h2>poeni</h2>
                    <p>{{ utils.formatAsThousands(props.player.data.stats.elo) }}</p>
                </div>
                <div class="summary-item">
                    <h2>svi mečevi</h2>
                    <p>{{ props.player.data.stats.total_matches }}</p>
                </div>
                <div class="summary-item">
                    <h2>pobede</h2>
                    <p>{{ props.player.data.stats.wins }}</p>
                </div>
                <div class="summary-item">
                    <h2>gubitci</h2>
                    <p>{{ props.player.data.stats.loses }}</p>
                </div>
                <div class="summary-item">
                    <h2>% pobeda</h2>
                    <p>{{ props.player.data.stats.win_precentage }}%</p>
                </div>
            </div>
            <div class="summary player five mobile">
                <div class="summary-item half">
                    <h2>poeni</h2>
                    <p>{{ utils.formatAsThousands(props.player.data.stats.elo) }}</p>
                </div>
                <div class="summary-item">
                    <h2>% pobeda</h2>
                    <p>{{ props.player.data.stats.win_precentage }}%</p>
                </div>
                <div class="summary-item">
                    <h2>svi mečevi</h2>
                    <p>{{ props.player.data.stats.total_matches }}</p>
                </div>
                <div class="summary-item">
                    <h2>pobede</h2>
                    <p>{{ props.player.data.stats.wins }}</p>
                </div>
                <div class="summary-item">
                    <h2>gubitci</h2>
                    <p>{{ props.player.data.stats.loses }}</p>
                </div>
            </div>
            <h2 class="summary-title">Teniseri</h2>
            <div class="summary player three col">
                <div class="summary-item players">
                    <template v-if="matchups.wins.length > 0">
                        <h2>pobedio {{ Object.values(props.player.data.matchups.wins).length }} tenisera</h2>
                        <template v-for="player in matchups.wins">
                            <p>
                                <Link prefetch="false" :href="`/${player.uri}`">{{
                                    player.name
                                }}</Link>
                                ({{ player.number }})
                            </p>
                        </template>
                        <p
                            v-if="Object.values(props.player.data.matchups.wins).length > 10"
                            class="show-more"
                            @click="isExpanded.wins = !isExpanded.wins">
                            {{ !isExpanded.wins ? 'vidi sve' : 'vidi manje' }}
                        </p>
                    </template>
                    <template v-else>
                        <h2>ovaj teniser nikada nije pobedio &#128577;</h2>
                    </template>
                </div>
                <div class="summary-item players">
                    <template v-if="matchups.loses.length > 0">
                        <h2>izgubio od {{Object.values(props.player.data.matchups.loses).length}} tenisera</h2>
                        <template v-for="player in matchups.loses">
                            <p>
                                <Link prefetch="false" :href="`/${player.uri}`">{{
                                    player.name
                                }}</Link>
                                ({{ player.number }})
                            </p>
                        </template>
                        <p
                            v-if="Object.values(props.player.data.matchups.loses).length > 10"
                            class="show-more"
                            @click="isExpanded.loses = !isExpanded.loses">
                            {{ !isExpanded.loses ? 'vidi sve' : 'vidi manje' }}
                        </p>
                    </template>
                    <template v-else>
                        <h2>ovaj teniser nikada nije izgubio &#128578;</h2>
                    </template>
                </div>
                <div class="summary-item players">
                    <template v-if="matchups.not_played.length > 0">
                        <h2>nije igrao sa {{props.player.data.matchups.notPlayedWith.length}} {{getInteractionText(matchups.not_played.length)}}</h2>
                        <template v-for="player in matchups.not_played">
                            <p>
                                <Link prefetch="false" :href="`/${player.uri}`">{{
                                    player.name
                                }}</Link>
                            </p>
                        </template>
                        <p
                            v-if="props.player.data.matchups.notPlayedWith.length > 10"
                            class="show-more"
                            @click="isExpanded.not_played = !isExpanded.not_played">
                            {{ !isExpanded.not_played ? 'vidi sve' : 'vidi manje' }}
                        </p>
                    </template>
                    <template v-else>
                        <h2>ovaj teniser je igrao sa svima &#128578;</h2>
                    </template>
                </div>
            </div>
            <h2 class="summary-title">lokacije</h2>
            <div class="summary player three col">
                <div class="summary-item players">
                    <h2>najaktivnije opštine</h2>
                    <template v-for="location in locations.locations">
                        <p>
                            {{location.name}}
                            ({{ location.count }})
                        </p>
                    </template>
                </div>
                <div class="summary-item players">
                        <h2>najkorišćeniji tereni</h2>
                        <template v-for="court in locations.courts">
                            <p>
                                <template v-if="court.link != ''">
                                    <a target="'_blank'" :href="court.link">
                                        {{ court.name }}
                                    </a>
                                </template>
                                <template v-else>
                                    {{ court.name }}
                                </template>
                                ({{ court.count}})
                            </p>
                        </template>
                </div>
                <div class="summary-item players">
                    <template v-if="locations.leagues.length > 0">
                        <h2>najaktivnije lige</h2>
                        <template v-for="league in locations.leagues">
                            <p>
                                <template v-if="league.link != ''">
                                    <a target="'_blank'" :href="league.link">
                                        {{ league.name }}
                                    </a>
                                </template>
                                <template v-else>
                                    {{ league.name }}
                                </template>
                                ({{ league.count }})
                            </p>
                        </template>
                    </template>
                    <template v-else>
                        <h2>ovaj teniser nije učestvovao u ligama &#128577;</h2>
                    </template>
                </div>
            </div>
            <h2 class="summary-title">Grafikoni</h2>
            <div class="chart-wrapper">
                <PlayerChart :data="props.player.charts" :player_id="props.player.data.id" />
            </div>
            <h2 class="summary-title no-border low-margin">pobede</h2>
            <div class="player-matches">
                <MatchTable
                    :showMessage="{ wins: props.player.data.wins == 0 }"
                    :matches="props.player.data.wins"
                />
            </div>
            <h2 class="summary-title no-border low-margin">gubitci</h2>
            <div class="player-matches">
                <MatchTable
                    :showMessage="{ loses: props.player.data.loses == 0 }"
                    :matches="props.player.data.loses"
                />
            </div>
        </div>
    </div>
    <Head :title="`${props.player.data.name} -`" />
</template>
