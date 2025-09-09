<script setup>
import { usePage } from "@inertiajs/vue3";
import { onMounted, computed, reactive, onBeforeMount, onBeforeUnmount } from "vue";
import utils from "../../utils";
import axios from "axios";
import bus from "vue3-eventbus";
import { ref } from "vue";
import EditIcon from "@components/EditIcon.vue";
import Matches from "@matches/Matches.vue";

const utl = utils;
const league = ref({});
const isLoading = ref(true);

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
      if(league.value.type == 'league')
        bus.emit('active', 'leagues')
      else
        bus.emit('active', 'tournaments')

        
        isLoading.value = false;
        bus.emit("loading", false);
    }).catch((error) => {
        console.error("Error fetching league:", error);
        isLoading.value = false;
        bus.emit("loading", false);
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
    if (!league.value.players) return [];
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

// Function to generate random widths for more realistic skeleton
const getRandomWidth = () => {
  return Math.floor(Math.random() * (80 - 50 + 1)) + 50; // Random between 50% and 80%
};

onBeforeUnmount(() => {
    bus.emit('clearActive');
});
</script>
<template>
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="static-wrapper player league mobile-mb-300 skeleton-wrapper">
        <!-- Rank skeleton -->
        <div class="rank skeleton-rank">
            <div class="skeleton skeleton-circle"></div>
        </div>
        
        <!-- Title skeleton -->
        <div class="skeleton-title">
            <div class="skeleton skeleton-text large"></div>
        </div>
        
        <!-- Subtitle skeletons -->
        <div class="skeleton-subtitle">
            <div class="skeleton skeleton-text medium"></div>
        </div>
        <div class="skeleton-subtitle smaller-margin">
            <div class="skeleton skeleton-text small"></div>
        </div>
        
        <!-- Add button skeleton -->
        <div class="skeleton-button">
            <div class="skeleton skeleton-button-shape"></div>
        </div>
        
        <!-- Dashboard skeleton -->
        <div class="dashboard-wrapper">
            <!-- Statistics title -->
            <div class="skeleton-section-title">
                <div class="skeleton skeleton-text medium"></div>
            </div>
            
            <!-- Statistics summary -->
            <div class="summary player three">
                <div class="summary-item" v-for="i in 3" :key="i">
                    <div class="skeleton skeleton-text small" style="margin-bottom: 8px;"></div>
                    <div class="skeleton skeleton-text medium"></div>
                </div>
            </div>
            
            <!-- Players title -->
            <div class="skeleton-section-title low-margin">
                <div class="skeleton skeleton-text small"></div>
            </div>
            
            <!-- Players section -->
            <div class="summary player three col">
                <div class="summary-item players"></div>
                <div class="summary-item players">
                    <div v-for="i in 6" :key="i" style="margin-bottom: 8px;">
                        <div class="skeleton skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
                    </div>
                </div>
                <div class="summary-item players"></div>
            </div>
            
            <!-- Matches title -->
            <div class="skeleton-section-title no-border big-margin mobile-mb-0">
                <div class="skeleton skeleton-text small"></div>
            </div>
            
            <!-- Matches skeleton -->
            <div class="player-matches">
                <div class="skeleton-matches">
                    <div v-for="i in 3" :key="i" class="skeleton-match-item">
                        <div class="skeleton-match-content">
                            <div class="skeleton skeleton-text small" style="margin-bottom: 8px;"></div>
                            <div class="skeleton-match-players">
                                <div class="skeleton skeleton-text medium"></div>
                                <div class="skeleton skeleton-text tiny"></div>
                                <div class="skeleton skeleton-text medium"></div>
                            </div>
                            <div class="skeleton skeleton-text small" style="margin-top: 8px;"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Actual Content -->
    <div v-else style="margin-bottom: -20px; padding-bottom: 0;" class="static-wrapper player league mobile-mb-300">
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
			<p :class="{ 'align-left': league.rank > 9,'n40': league.rank >= 40 && league.rank < 50, [`strict-${league.rank}`]: true }">
				{{ league.rank }}
			</p>
		</div>
        <h1 class="red" :class="{'fix-letters': containsGreek(league.name)}">
            {{ league.name }}        </h1>

        <p class="subtitle small-margin">{{ league.county }}{{ league.court && league.court.id > 1 ? ',' : '' }} <a class="court-link" v-if="league.court && league.court.id > 1" :href="`/tereni/${league.court.uri}`">{{ league.court.name }}</a></p>
        <p v-if="league.date_start || league.date_end" :style="{color: isInactive(league.date_end) ? '#949494' : 'black'}" class="subtitle smaller-margin league-margin">
            {{formatDate(league.date_start, league.date_end)}} 
        </p>

        <a class="add-button league" :href="`/dodaj?league=${league.id}&court=${league.court?.id}`">
            Dodaj meč
        </a>
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
                        <h2 class="black">ovaj turnir nema aktivnih igrača &#128577;</h2>
                    </template>
                </div>
                <div class="summary-item players">
                </div>
            </div>
            <h2 class="summary-title no-border big-margin mobile-mb-0">mečevi</h2>
            <div class="player-matches">
                <Matches
                :isHome="false"
                v-if="league.id"   
                :league_id="league.id" :loadMatches="true" :showMessage="{ league: league.match_number == 0 }"
                />
            </div>
        </div>
    </div>
    <Head v-if="league && league.name" :title="`${league.name} -`" />
</template>

<style lang="scss" scoped>
// Skeleton base animation
@keyframes skeleton-loading {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}

// Base skeleton styles
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: skeleton-loading 1.5s infinite;
  border-radius: 4px;
  
  &.skeleton-circle {
    border-radius: 50%;
    width: 100px;
    height: 100px;
  }
  
  &.skeleton-text {
    height: 16px;
    
    &.tiny {
      width: 20px;
      height: 14px;
    }
    
    &.small {
      width: 80px;
      height: 18px;
    }
    
    &.medium {
      width: 150px;
      height: 20px;
    }
    
    &.large {
      width: 300px;
      height: 40px;
    }
  }
  
  &.skeleton-button-shape {
    width: 120px;
    height: 50px;
    border-radius: 4px;
  }
}

// Skeleton wrapper positioning
.skeleton-wrapper {
  .skeleton-rank {
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: -20px;
  }
  
  .skeleton-title {
    display: flex;
    justify-content: center;
    margin: 20px 0 10px 0;
  }
  
  .skeleton-subtitle {
    display: flex;
    justify-content: center;
    margin-bottom: 8px;
    
    &.smaller-margin {
      margin-bottom: 12px;
    }
  }
  
  .skeleton-button {
    display: flex;
    justify-content: center;
    margin: 20px 0;
  }
  
  .skeleton-section-title {
    display: flex;
    justify-content: center;
    margin: 70px 0 30px 0;
    
    &.low-margin {
      margin: 70px 0 15px 0;
    }
    
    &.big-margin {
      margin: 110px 0 20px 0;
    }
  }
}

// Skeleton matches styles
.skeleton-matches {
  margin-top: 20px;
  
  .skeleton-match-item {
    margin-bottom: 16px;
    padding: 16px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    background: #fff;
    
    .skeleton-match-content {
      display: flex;
      flex-direction: column;
      gap: 8px;
      
      .skeleton-match-players {
        display: flex;
        align-items: center;
        gap: 16px;
        justify-content: center;
        
        .skeleton:first-child,
        .skeleton:last-child {
          flex: 1;
          max-width: 120px;
        }
        
        .skeleton:nth-child(2) {
          flex: 0;
        }
      }
    }
  }
}

// Mobile responsiveness for skeleton
@media only screen and (max-width: 1200px) {
  .skeleton-wrapper {
    padding-inline: 0;
    margin-top: 90px;
    
    .skeleton-title {
      padding-inline: 20px;
      margin-top: 30px;
    }
    
    .skeleton-subtitle {
      padding-inline: 20px;
    }
    
    .skeleton-button {
      margin-top: 26px;
    }
    
    .skeleton-section-title {
      padding-inline: 20px;
    }
    
    // Mobile skeleton matches
    .skeleton-matches {
      .skeleton-match-item {
        .skeleton-match-content {
          .skeleton-match-players {
            flex-direction: column;
            gap: 8px;
            
            .skeleton:first-child,
            .skeleton:last-child {
              align-self: flex-start;
            }
          }
        }
      }
    }
    
    // Mobile players section
    .summary.player.three.col {
      grid-template-columns: 100%;
      gap: 30px;
      
      .summary-item.players {
        padding-inline: 20px;
      }
    }
  }
}
</style>