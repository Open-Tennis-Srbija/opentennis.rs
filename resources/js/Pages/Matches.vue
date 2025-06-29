<script setup>
import { computed, onMounted, onBeforeMount, ref } from "vue";
import EditIcon from "./components/EditIcon.vue";
import axios from "axios";
import bus from "vue3-eventbus";

const props = defineProps({
    loadMatches: Boolean || true,
    showMessage: Object,
    propMatches: Array,
});

const matches = ref(props.propMatches || []);

onMounted(() => {
    if (!props.loadMatches) {
        if (props.propMatches) {
            console.log("using prop matches", props.propMatches);
            matches.value = props.propMatches;
        }
        return;
    }
    console.log("loading matches");
    axios.get("/get-matches").then((res) => {
        matches.value = res.data;
        console.log("matches", matches.value);
        bus.emit("loading", false);
    });
});

const formatedMatchesDesktop = computed(() => {
    let formated = matches.value.map((match, index) => {
        return {
            ...match,
            day: getDateDay(match.date),
            month: getDateMonth(match.date),
            date: new Date(match.date).getDate(),
            year: new Date(match.date).getFullYear(),
        };
    });
    return formated;
});
const formatedMatchesMobile = computed(() => {
    let formated = matches.value.map((match, index) => {
        return {
            ...match,
            winner_first_name: match.winner_name.split(" ")[0],
            winner_last_name: match.winner_name.split(" ")[1],
            loser_first_name: match.loser_name.split(" ")[0],
            loser_last_name: match.loser_name.split(" ")[1],
            day: getDateDay(match.date),
            month: getDateMonth(match.date),
            year: new Date(match.date).getFullYear(),
            date: new Date(match.date).getDate(),
        };
    });
    return formated;
});

function getDateDay(date) {
    let days = ["ned", "pon", "uto", "sre", "čet", "pet", "sub"];
    let day = new Date(date).getDay();

    return days[day];
}

function getDateMonth(date) {
    let months = [
        "jan",
        "feb",
        "mar",
        "apr",
        "maj",
        "jun",
        "jul",
        "avg",
        "sep",
        "okt",
        "nov",
        "dec",
    ];
    let month = new Date(date).getMonth();

    return months[month];
}
</script>
<template>
    <Head v-if="props.loadMatches" title="Mečevi -" />
    <div class="matches-wrapper">
        <div id="desktop">
            <div class="matches-header">
                <div class="spacer number">#</div>
                <div class="winner">pobednik</div>
                <div class="loser">gubitnik</div>
                <div class="score">rezultat</div>
                <div class="date">datum</div>
                <div class="location">opština</div>
                <div class="location">teren</div>
                <div class="location">liga ili turnir</div>
            </div>
            <div v-if="props.showMessage">
                <p v-if="props.showMessage.wins" class="message">
                    Ovaj teniser nikada nije pobedio &#128577;
                </p>
                <p v-if="props.showMessage.league" class="message league">
                    ovaj turnir nema mečeve &#128577;
                </p>
                <p v-if="props.showMessage.loses" class="message">
                    Ovaj teniser nikada nije izgubio &#128578;
                </p>
            </div>
            <div
                class="match-entry"
                v-for="(match, index) in formatedMatchesDesktop"
                :key="index"
            >
                <Link
                    prefetch="false"
                    class="edit-btn"
                    v-if="$page.props.auth.user"
                    :href="`/izmeni/${match.number}`"
                >
                    <EditIcon />
                </Link>
                <div class="number">{{ match.number }}</div>
                <div class="winner">
                    <Link prefetch="false" :href="`/${match.winner_uri}`">{{
                        match.winner_name
                    }}</Link
                    ><br /><span class="points"
                        >+{{ match.winner_point_gain }}</span
                    >
                </div>
                <div class="loser">
                    <Link prefetch="false" :href="`/${match.loser_uri}`">{{
                        match.loser_name
                    }}</Link
                    ><br /><span class="points"
                        >+{{ match.loser_point_gain }}</span
                    >
                </div>
                <div class="score">
                    {{ match.set_score }}<br /><span class="gray">{{
                        match.game_score
                    }}</span>
                </div>
                <div class="date">
                    {{ match.day }} <br />{{ match.date }} {{ match.month }}
                    {{ match.year }}
                </div>
                <div class="location">{{ match.county }}</div>
                <div class="location">
                    <template v-if="match.court?.id == 1">
                        {{ match.court.name }}
                    </template>
                    <template v-else>
                        <a :href="`/teren/${match.court?.id}`">
                            {{ match.court?.name }}
                        </a>
                    </template>
                </div>
                <div class="location">
                    <template v-if="match.league?.uri == ''">
                        {{ match.league?.name }}
                    </template>
                    <template v-else>
                        <a :href="`/${match.league?.uri}`">
                            {{ match.league?.name }}
                        </a>
                    </template>
                </div>
            </div>
        </div>
        <div id="mobile">
            <div v-if="props.showMessage">
                <p v-if="props.showMessage.wins" class="message">
                    Ovaj teniser nikada nije pobedio &#128577;
                </p>
                <p v-if="props.showMessage.loses" class="message">
                    Ovaj teniser nikada nije izgubio &#128578;
                </p>
            </div>
            <div
                class="match-entry"
                v-for="(match, index) in formatedMatchesMobile"
                :key="index"
            >
                <Link
                    prefetch="false"
                    class="edit-btn"
                    v-if="$page.props.auth.user"
                    :href="`/izmeni/${match.number}`"
                >
                    <EditIcon />
                </Link>
                <div class="score">
                    {{ match.set_score }}
                    <br />
                    <span class="games">{{ match.game_score }}</span>
                </div>

                <div class="info">
                    <div class="info-wrapp">
                        <div class="text">
                            <Link
                                prefetch="false"
                                :href="`/${match.winner_uri}`"
                                >{{ match.winner_first_name }}<br />{{
                                    match.winner_last_name
                                }}</Link
                            ><span class="points"
                                >+{{ match.winner_point_gain }}</span
                            >
                        </div>
                    </div>

                    <div class="sep">:</div>

                    <div class="info-wrapp">
                        <div class="text">
                            <Link prefetch="false" :href="`/${match.loser_uri}`"
                                >{{ match.loser_first_name }}<br />{{
                                    match.loser_last_name
                                }}</Link
                            ><span class="points"
                                >+{{ match.loser_point_gain }}</span
                            >
                        </div>
                    </div>
                </div>

                <div class="location">
                    <span  v-if="match.league?.uri !== ''">
                        <a class="black" :href="`/${match.league?.uri}`">{{
                            match.league?.name
                        }}</a>
                    </span>
                    <br v-if="match.league?.uri !== ''" />
                    {{ match.number || matches.length - index }},
                    {{ match.day }} {{ match.date }} {{ match.month }}
                    {{ match.year }}
                    <br />
                    {{ match.county }}
                    <span v-if="match.court?.id >= 1">,
                        <a :href="`/teren/${match.court?.id}`">{{
                            match.court.name
                        }}</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
