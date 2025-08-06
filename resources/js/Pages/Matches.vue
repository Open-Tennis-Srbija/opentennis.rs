<script setup>
import { computed, onMounted, onBeforeMount, ref } from "vue";
import EditIcon from "./components/EditIcon.vue";
import axios from "axios";
import bus from "vue3-eventbus";

const props = defineProps({
    loadMatches: Boolean || true,
    showMessage: Object,
    propMatches: Array,
    court_id: [String, Number], // Add court_id prop
    league_id: [String, Number], // Add league_id prop
    player_id: [String, Number], // Add player_id prop
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
const currentPage = ref(1);
const isLoading = ref(false);
const hasMoreData = ref(true);
const totalMatches = ref(0);

// Computed property to determine loading context
const isCourtSpecific = computed(() => !!props.court_id);
const isLeagueSpecific = computed(() => !!props.league_id);
const isPlayerSpecific = computed(() => !!props.player_id);

onMounted(() => {
    if (!props.loadMatches) {
        if (props.propMatches) {
            console.log("using prop matches", props.propMatches);
            matches.value = props.propMatches;
            // For prop matches, disable infinite scroll
            hasMoreData.value = false;
        }
        return;
    }
    console.log("loading matches");
    
    // Load first page of matches
    loadInitialMatches();
    
    bus.on('scroll', (top) => {
        handleScroll(top);
    });
});

const loadInitialMatches = async () => {
    try {
        // Determine API endpoint based on court_id, league_id, or player_id props
        let apiUrl;
        if (props.court_id) {
            apiUrl = `/api/court/${props.court_id}/matches?page=1&per_page=100`;
        } else if (props.league_id) {
            apiUrl = `/api/league/${props.league_id}/matches?page=1&per_page=100`;
        } else if (props.player_id) {
            apiUrl = `/api/player/${props.player_id}/matches?page=1&per_page=100`;
        } else {
            apiUrl = "/api/matches?page=1&per_page=100";
        }
            
        const response = await axios.get(apiUrl);
        matches.value = response.data.data;
        currentPage.value = 1;
        totalMatches.value = response.data.total;
        hasMoreData.value = currentPage.value < response.data.last_page;
        
        console.log("matches", matches.value);
        console.log("total matches", totalMatches.value);
        console.log("context:", isCourtSpecific.value ? `court ${props.court_id}` : isLeagueSpecific.value ? `league ${props.league_id}` : isPlayerSpecific.value ? `player ${props.player_id}` : 'all matches');
        bus.emit("loading", false);
    } catch (error) {
        console.error('Error loading initial matches:', error);
        bus.emit("loading", false);
    }
};

const scrollPos = ref(0);

const handleScroll = (top) => {
  scrollPos.value = top;
  
  // Check if we're near the bottom and need to load more
  if (props.loadMatches && !isLoading.value && hasMoreData.value) {
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;

    console.log(scrollHeight, scrollPos.value, clientHeight);

    // Load more when we're 500px from the bottom
    if (scrollHeight - scrollPos.value - clientHeight < 500) {
      loadMoreMatches();
    }
  }
}

const loadMoreMatches = async () => {
  if (isLoading.value || !hasMoreData.value) return;
  
  isLoading.value = true;
  
  try {
    // Determine API endpoint based on court_id, league_id, or player_id props
    let apiUrl;
    if (props.court_id) {
        apiUrl = `/api/court/${props.court_id}/matches?page=${currentPage.value + 1}&per_page=100`;
    } else if (props.league_id) {
        apiUrl = `/api/league/${props.league_id}/matches?page=${currentPage.value + 1}&per_page=100`;
    } else if (props.player_id) {
        apiUrl = `/api/player/${props.player_id}/matches?page=${currentPage.value + 1}&per_page=100`;
    } else {
        apiUrl = `/api/matches?page=${currentPage.value + 1}&per_page=100`;
    }
        
    const response = await axios.get(apiUrl);
    const newMatches = response.data.data;
    
    if (newMatches.length > 0) {
      matches.value = [...matches.value, ...newMatches];
      currentPage.value++;
      totalMatches.value = response.data.total;
      
      // Check if we have more data
      hasMoreData.value = currentPage.value < response.data.last_page;
    } else {
      hasMoreData.value = false;
    }
  } catch (error) {
    console.error('Error loading more matches:', error);
  } finally {
    isLoading.value = false;
  }
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
            
            <!-- Loading skeleton for desktop -->
            <div v-if="isLoading && props.loadMatches" class="loading-skeletons">
                <div v-for="n in 5" :key="`desktop-skeleton-${n}`" class="match-entry skeleton">
                    <div class="number skeleton-item"></div>
                    <div class="winner">
                        <div class="players">
                            <div class="player-1">
                                <div class="skeleton-item skeleton-name"></div>
                                <div class="category-wrapp">
                                    <span class="skeleton-item skeleton-category"></span>
                                </div>
                                <div class="skeleton-item skeleton-points"></div>
                            </div>
                        </div>
                    </div>
                    <div class="loser">
                        <div class="players">
                            <div class="player-1">
                                <div class="skeleton-item skeleton-name"></div>
                                <div class="category-wrapp">
                                    <span class="skeleton-item skeleton-category"></span>
                                </div>
                                <div class="skeleton-item skeleton-points"></div>
                            </div>
                        </div>
                    </div>
                    <div class="score">
                        <div class="skeleton-item skeleton-score"></div>
                        <div class="skeleton-item skeleton-games"></div>
                    </div>
                    <div class="date smaller-font">
                        <div class="skeleton-item skeleton-date"></div>
                    </div>
                    <div class="location smaller-font">
                        <div class="skeleton-item skeleton-location"></div>
                    </div>
                    <div class="location smaller-font">
                        <div class="skeleton-item skeleton-location"></div>
                    </div>
                    <div class="location smaller-font">
                        <div class="skeleton-item skeleton-location"></div>
                    </div>
                </div>
            </div>
            
            <!-- No more data indicator for desktop -->
            <div v-if="!hasMoreData && matches.length > 0 && props.loadMatches" class="no-more-data">
                <p>Nema više mečeva</p>
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
            
            <!-- Loading skeleton for mobile -->
            <div v-if="isLoading && props.loadMatches" class="loading-skeletons">
                <div v-for="n in 5" :key="`mobile-skeleton-${n}`" class="match-entry skeleton">
                    <div class="score">
                        <div class="skeleton-item skeleton-score"></div>
                        <div class="skeleton-item skeleton-games"></div>
                    </div>
                    <div class="info">
                        <div class="info-wrapp">
                            <div class="text">
                                <div class="skeleton-item skeleton-name"></div>
                                <div class="category-wrapp">
                                    <span class="skeleton-item skeleton-category"></span>
                                </div>
                                <div class="skeleton-item skeleton-points"></div>
                            </div>
                        </div>
                        <div class="sep">:</div>
                        <div class="info-wrapp">
                            <div class="text">
                                <div class="skeleton-item skeleton-name"></div>
                                <div class="category-wrapp">
                                    <span class="skeleton-item skeleton-category"></span>
                                </div>
                                <div class="skeleton-item skeleton-points"></div>
                            </div>
                        </div>
                    </div>
                    <div class="location">
                        <div class="skeleton-item skeleton-location"></div>
                        <div class="skeleton-item skeleton-location"></div>
                        <div class="skeleton-item skeleton-location"></div>
                    </div>
                </div>
            </div>
            
            <!-- No more data indicator for mobile -->
            <div v-if="!hasMoreData && matches.length > 0 && props.loadMatches" class="no-more-data">
                <p>Nema više mečeva</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.loading-indicator {
    text-align: center;
    padding: 20px;
    color: #666;
    font-style: italic;
}

.no-more-data {
    text-align: center;
    margin-top: 30px;
    padding: 20px;
    padding-bottom: 0;;
    color: black;
    text-transform: lowercase;
    font-size: 14px;
}

/* Skeleton Loading Styles */
.skeleton-item {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.match-entry.skeleton {
    opacity: 0.7;
    pointer-events: none;
}

.match-entry.skeleton .skeleton-item {
    color: transparent;
}

/* Desktop skeleton dimensions */
#desktop .skeleton-name {
    height: 16px;
    width: 120px;
    margin-bottom: 4px;
}

#desktop .skeleton-category {
    height: 12px;
    width: 20px;
    display: inline-block;
    margin-left: 4px;
}

#desktop .skeleton-points {
    height: 12px;
    width: 40px;
    margin-top: 4px;
}

#desktop .skeleton-score {
    height: 16px;
    width: 60px;
    margin-bottom: 4px;
}

#desktop .skeleton-games {
    height: 12px;
    width: 80px;
}

#desktop .skeleton-date {
    height: 14px;
    width: 100px;
}

#desktop .skeleton-location {
    height: 14px;
    width: 90px;
}

#desktop .number.skeleton-item {
    height: 20px;
    width: 40px;
}

/* Mobile skeleton dimensions */
#mobile .skeleton-name {
    height: 14px;
    width: 80px;
    margin-bottom: 4px;
}

#mobile .skeleton-category {
    height: 10px;
    width: 16px;
    display: inline-block;
    margin-left: 2px;
}

#mobile .skeleton-points {
    height: 10px;
    width: 30px;
    margin-top: 2px;
}

#mobile .skeleton-score {
    height: 18px;
    width: 50px;
    margin-bottom: 4px;
}

#mobile .skeleton-games {
    height: 12px;
    width: 60px;
}

#mobile .skeleton-location {
    height: 12px;
    width: 100px;
    margin-bottom: 2px;
}

/* Ensure skeleton items maintain layout structure */
.skeleton .category-wrapp {
    display: flex;
    align-items: center;
    margin: 4px 0;
}

.skeleton .players {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.skeleton .info {
    display: flex;
    align-items: center;
    gap: 10px;
}

.skeleton .info-wrapp {
    flex: 1;
}

.skeleton .sep {
    font-size: 20px;
    color: #ccc;
}

.loading-skeletons {
    opacity: 0.8;
}
</style>
