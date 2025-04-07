<script setup>
import { usePage } from "@inertiajs/vue3";
import { onMounted, computed } from "vue";
import utils from "../utils";
import PlayerChart from "./components/PlayerChart.vue";
import EditIcon from "./components/EditIcon.vue";

const props = defineProps({ player: Object });
const page = usePage();

onMounted(() => {
    page.props["title"] = "teniser";
});

const matchups = computed(() => {
    return {
        wins: Object.values(props.player.data.matchups.wins),
        loses: Object.values(props.player.data.matchups.loses),
        not_played: props.player.data.matchups.notPlayedWith,
    };
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
        <h1>
            {{ props.player.data.name
            }}<Link prefetch="false"
                class="edit-btn"
                v-if="$page.props.auth.user"
                :href="`/teniser/izmeni/${props.player.data.id}`"
                ><EditIcon
            /></Link>
        </h1>
        <p class="subtitle-spacer" v-if="!player.club && !player.location">
            &nbsp;
        </p>
        <p class="subtitle">
            {{ player.club }}{{ player.club ? ", " : " " }}{{ player.location }}
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
                        <h2>pobedio {{ matchups.wins.length }} tenisera</h2>
                        <template v-for="player in matchups.wins">
                            <p>
                                <Link prefetch="false" :href="`/${player.uri}`">{{
                                    player.name
                                }}</Link>
                                ({{ player.number }})
                            </p>
                        </template>
                    </template>
                    <template v-else>
                        <h2>ovaj teniser nikada nije pobedio &#128577;</h2>
                    </template>
                </div>
                <div class="summary-item players">
                    <template v-if="matchups.loses.length > 0">
                        <h2>izgubio od {{matchups.loses.length}} tenisera</h2>
                        <template v-for="player in matchups.loses">
                            <p>
                                <Link prefetch="false" :href="`/${player.uri}`">{{
                                    player.name
                                }}</Link>
                                ({{ player.number }})
                            </p>
                        </template>
                    </template>
                    <template v-else>
                        <h2>ovaj teniser nikada nije izgubio &#128578;</h2>
                    </template>
                </div>
                <div class="summary-item players">
                    <template v-if="matchups.not_played.length > 0">
                        <h2>nije igrao sa {{matchups.not_played.length}} {{getInteractionText(matchups.not_played.length)}}</h2>
                        <template v-for="player in matchups.not_played">
                            <p>
                                <Link prefetch="false" :href="`/${player.uri}`">{{
                                    player.name
                                }}</Link>
                            </p>
                        </template>
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
