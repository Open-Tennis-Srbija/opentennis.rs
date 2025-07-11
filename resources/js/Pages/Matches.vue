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
    bus.on('scroll', (top) => {
        handleScroll(top);
    });
});

const scrollPos = ref(0);

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
const formatedMatchesDesktop = computed(() => {
    let formated = matches.value.map((match, index) => {
        return {
            ...match,
            day: getDateDay(match.date),
            month: getDateMonth(match.date),
            date: new Date(match.date).getDate(),
            year: new Date(match.date).getFullYear() === new Date().getFullYear() ? null : new Date(match.date).getFullYear(),
        };
    });
    return formated;
});
const formatedMatchesMobile = computed(() => {
    let formated = matches.value.map((match, index) => {
        return {
            ...match,
            winner1_first_name: match.winner1_name.split(" ")[0],
            winner1_last_name: match.winner1_name.split(" ")[1],
            winner2_first_name: match.winner2_name ? match.winner2_name.split(" ")[0] : null,
            winner2_last_name: match.winner2_name ? match.winner2_name.split(" ")[1] : null,
            loser1_first_name: match.loser1_name.split(" ")[0],
            loser1_last_name: match.loser1_name.split(" ")[1],
            loser2_first_name: match.loser2_name ? match.loser2_name.split(" ")[0] : null,
            loser2_last_name: match.loser2_name ? match.loser2_name.split(" ")[1] : null,
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
    <div class="matches-wrapper" :class="{'home': props.loadMatches, 'mobile-mb-300': props.loadMatches}">
        <div id="desktop">
            <div class="matches-header" :class="{'home': props.loadMatches}" :style="{top: `${ 85 - topOffset}px`}">
                <div class="spacer number"></div>
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
            <div class="match-entry" v-for="(match, index) in formatedMatchesDesktop" :key="index">
                <Link :class="{child: !props.loadMatches}" prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni/${match.number}`">
                <EditIcon />
                </Link>
                <div class="number">{{ match.number }}</div>
                <div class="winner">
                    <div class="players">
                        <div class="player-1" :class="{ 'mt-10': match.winner2_name }">
                            <Link prefetch="false" :href="`/${match.winner1_uri}`">{{
                                match.winner1_name
                            }}</Link>
                            <div class="category-wrapp">
                                <span class="diamond"
                                    :style="{ border: `1px solid ${categoryColorsAll[match.winner1_category] || 'transparent'}` }"></span><span
                                    class="category"
                                    :class="{ 'category-unknown': match.winner1_category == '?',[`category-${match.winner1_category}`]: match.winner1_category  }">{{ match.winner1_category }}</span>

                            </div> <br /><span class="points">+{{ match.winner2_name ?
                                Math.round(match.winner_point_gain / 2) : match.winner_point_gain }}</span>
                        </div>
                        <div v-if="match.winner2_name" class="player-2">
                            <Link prefetch="false" :href="`/${match.winner2_uri}`">{{
                                match.winner2_name
                            }}</Link>
                            <div class="category-wrapp">
                                <span class="diamond"
                                    :style="{ border: `1px solid ${categoryColorsAll[match.winner2_category] || 'transparent'}` }"></span><span
                                    class="category"
                                    :class="{ 'category-unknown': match.winner2_category == '?',[`category-${match.winner2_category}`]: match.winner2_category }">{{ match.winner2_category }}</span>

                            </div>
                            <br /><span class="points">+{{ Math.round(match.winner_point_gain / 2) }}</span>
                        </div>
                    </div>
                </div>
                <div class="loser">
                    <div class="players">
                        <div class="player-1" :class="{ 'mt-10': match.loser2_name }">
                            <Link prefetch="false" :href="`/${match.loser1_uri}`">{{
                                match.loser1_name
                            }}</Link>
                            <div class="category-wrapp">
                                <span class="diamond"
                                    :style="{ border: `1px solid ${categoryColorsAll[match.loser1_category] || 'transparent'}` }"></span><span
                                    class="category"
                                    :class="{ 'category-unknown': match.loser1_category == '?',[`category-${match.loser1_category}`]: match.loser1_category }">{{ match.loser1_category }}</span>

                            </div>

                            <br /> <span class="points">+{{ match.loser2_name ? Math.round(match.loser_point_gain / 2) :
                                match.loser_point_gain }}</span>
                        </div>
                        <div v-if="match.loser2_name" class="player-2">
                            <Link prefetch="false" :href="`/${match.loser2_uri}`">{{
                                match.loser2_name
                            }}</Link>
                            <div class="category-wrapp">
                                <span class="diamond"
                                    :style="{ border: `1px solid ${categoryColorsAll[match.loser2_category] || 'transparent'}` }"></span><span
                                    class="category"
                                    :class="{ 'category-unknown': match.loser2_category == '?',[`category-${match.loser2_category}`]: match.loser2_category }">{{ match.loser2_category }}</span>

                            </div>
                            <br /><span class="points">+{{ Math.round(match.loser_point_gain / 2) }}</span>
                        </div>
                    </div>
                </div>
                <div class="score">
                    {{ match.set_score }}<br /><span class="gray">{{
                        match.game_score
                        }}</span>
                </div>
                <div class="date smaller-font">
                    {{ match.day }} {{ match.date }} {{ match.month }}
                    {{ match.year }}
                </div>
                <div class="location smaller-font">{{ match.county }}</div>
                <div class="location smaller-font">
                    <template v-if="match.court?.id == 1">
                        {{ match.court.name }}
                    </template>
                    <template v-else>
                        <a :href="`/tereni/${match.court?.uri}`">
                            {{ match.court?.name }}
                        </a>
                    </template>
                </div>
                <div class="location smaller-font">
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
            <div class="match-entry" v-for="(match, index) in formatedMatchesMobile" :key="index">
                <Link :class="{child: !props.loadMatches}" prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni/${match.number}`">
                <EditIcon />
                </Link>
                <div class="score">
                    {{ match.set_score }}
                    <br v-if="match.game_score && match.game_score !== ''" />
                    <span class="games">{{ match.game_score }}</span>
                </div>

                <div class="info">
                    <div class="info-wrapp">
                        <div class="text">
                            <Link prefetch="false" :href="`/${match.winner1_uri}`">{{ match.winner1_first_name
                            }}<br />{{
                                match.winner1_last_name
                            }}
                            </Link>
                            
                            <div class="category-wrapp">
                                <span class="diamond"
                                    :style="{ border: `1px solid ${categoryColorsAll[match.winner1_category] || 'transparent'}` }"></span><span
                                    class="category"
                                    :class="{ 'category-unknown': match.winner1_category == '?' ,[`category-${match.winner1_category}`]: match.winner1_category }">{{ match.winner1_category }}</span>

                            </div>
                            <span class="points">+{{ match.winner2_first_name ? Math.round(match.winner_point_gain / 2) : match.winner_point_gain }}</span>
                        </div>

                        <div class="text" style="margin-top: 20px;"  v-if="match.winner2_name">
                            <Link prefetch="false" :href="`/${match.winner2_uri}`">{{ match.winner2_first_name
                            }}<br />{{
                                match.winner2_last_name
                            }}

</Link>
<div class="category-wrapp">
    <span class="diamond"
        :style="{ border: `1px solid ${categoryColorsAll[match.winner2_category] || 'transparent'}` }"></span><span
        class="category"
        :class="{ 'category-unknown': match.winner2_category == '?' ,[`category-${match.winner2_category}`]: match.winner2_category }">{{ match.winner2_category }}</span>

</div>
                            <span class="points">+{{ Math.round(match.winner_point_gain / 2) }}</span>

                        </div>
                    </div>

                    <div class="sep">:</div>

                    <div class="info-wrapp">
                        <div class="text">
                            <Link prefetch="false" :href="`/${match.loser1_uri}`">{{ match.loser1_first_name }}<br />{{
                                match.loser1_last_name
                            }}
                            
                          
                        </Link>
                          <div class="category-wrapp">
                                <span class="diamond"
                                    :style="{ border: `1px solid ${categoryColorsAll[match.loser1_category] || 'transparent'}` }"></span><span
                                    class="category"
                                    :class="{ 'category-unknown': match.loser1_category == '?' ,[`category-${match.loser1_category}`]: match.loser1_category }">{{ match.loser1_category }}</span>

                            </div>
                        <span class="points">+{{ match.loser2_first_name ? Math.round(match.loser_point_gain / 2) : match.loser_point_gain }}</span>
                        </div>

                        <div class="text" v-if="match.loser2_name" style="margin-top: 20px;">
                            <Link prefetch="false" :href="`/${match.loser2_uri}`">{{ match.loser2_first_name }}<br />{{
                                match.loser2_last_name
                            }}</Link>
                              <div class="category-wrapp">
                                <span class="diamond"
                                    :style="{ border: `1px solid ${categoryColorsAll[match.loser2_category] || 'transparent'}` }"></span><span
                                    class="category"
                                    :class="{ 'category-unknown': match.loser2_category == '?' ,[`category-${match.loser2_category}`]: match.loser2_category }">{{ match.loser2_category }}</span>

                            </div>
                            <span class="points">+{{ Math.round(match.loser_point_gain / 2) }}</span>
                        </div>
                    </div>
                </div>

                <div class="location">
                    <span v-if="match.league?.uri !== ''">
                        <a class="black" :href="`/${match.league?.uri}`">{{
                            match.league?.name
                            }}</a>
                    </span>
                    <br />
                    {{ match.number || matches.length - index }},
                    {{ match.day }} {{ match.date }} {{ match.month }}
                    {{ match.year }}
                    <br />
                    {{ match.county }}
                    <span v-if="match.court?.id > 1">,
                        <a :href="`/tereni/${match.court?.uri}`">{{
                            match.court.name
                            }}</a>
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>
