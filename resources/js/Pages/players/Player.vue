<script setup>
import { usePage } from "@inertiajs/vue3";
import { onMounted, computed, reactive, ref, onBeforeUnmount } from "vue";
import utils from "../../utils";
import axios from 'axios';
import PlayerChart from "@components/PlayerChart.vue";
import EditIcon from "@components/EditIcon.vue";
import bus from 'vue3-eventbus';
import Matches from "@matches/Matches.vue";

const props = defineProps({ player_uri: String });
const player = ref({});
const isLoading = ref(true);

const page = usePage();
const isExpanded = reactive({
	wins: false,
	loses: false,
	not_played: false,
});

const categoryColors = {
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
onMounted(() => {
	axios.get(`/get-player/${props.player_uri}`).then((response) => {
	bus.emit('active', 'players')
	bus.emit('headTitle', 'teniser')
		player.value = response.data;
		console.log('Player data:', player.value);
		pageTitle.value = `${player.value.name} - Srpska Tenis Liga`;
		isLoading.value = false;
		bus.emit('loading', false)
	}).catch((error) => {
		console.error('Error fetching players:', error);
		isLoading.value = false;
		bus.emit('loading', false);
	});
});


const matchups = computed(() => {
	let data = {
		wins: [],
		loses: [],
		not_played: [],
	};

	if (!player.value.matchups) {
		return data;
	}
	
	let wins = Object.values(player.value.matchups.won_against);
	let loses = Object.values(player.value.matchups.lost_against);

	if (player.value.matchups.won_against) {
		if (wins.length <= 10 || isExpanded.wins) {
			data = { ...data, wins: player.value.matchups.won_against };
		} else {
			data = { ...data, wins: player.value.matchups.won_against.slice(0, 10) };
		}
	} else {
		data = { ...data, wins: [] };
	}

	if (player.value.matchups.lost_against) {
		if (loses.length <= 10 || isExpanded.loses) {
			data = { ...data, loses: player.value.matchups.lost_against };
		} else {
			data = { ...data, loses: player.value.matchups.lost_against.slice(0, 10) };
		}
	} else {
		data = { ...data, loses: [] };
	}

	if (player.value.matchups.not_played) {
		if (player.value.matchups.not_played.length <= 10 || isExpanded.not_played) {
			data = { ...data, not_played: player.value.matchups.not_played };
		} else {
			data = { ...data, not_played: player.value.matchups.not_played.slice(0, 10) };
		}
	} else {
		data = { ...data, not_played: [] };
	}
	return data;
});
const pageTitle = ref('Srpska Tenis Liga');

const points = computed(() => {
	if (!player.value.points) {
		return 0;
	}
	return utils.formatAsThousands(player.value.points);
});

const locations = computed(() => {
	if (!player.value.locations) {
		return {
			courts: [],
			locations: [],
			leagues: [],
		};
	}
	return {
		courts: player.value.locations.courts,
		locations: player.value.locations.counties,
		leagues: player.value.locations.leagues,
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

// Function to generate random widths for more realistic skeleton
const getRandomWidth = () => {
  return Math.floor(Math.random() * (80 - 50 + 1)) + 50; // Random between 50% and 80%
};

onBeforeUnmount(() => {
	bus.emit('clearActive');
});

</script>
<template>
 	<Head :title="pageTitle" />
	
	<!-- Skeleton Loading State -->
	<div v-if="isLoading" class="static-wrapper player mobile-mb-300 skeleton-wrapper">
		<!-- Rank skeleton -->
		<div class="rank skeleton-rank">
			<div class="skeleton skeleton-circle"></div>
		</div>
		
		<!-- Name skeleton -->
		<div class="skeleton-title">
			<div class="skeleton skeleton-text large"></div>
		</div>
		
		<!-- Location skeleton -->
		<div class="skeleton-subtitle">
			<div class="skeleton skeleton-text medium"></div>
		</div>
		
		<!-- Dashboard skeleton -->
		<div class="dashboard-wrapper">
			<!-- Statistics title -->
			<div class="skeleton-section-title">
				<div class="skeleton skeleton-text medium"></div>
			</div>
			
			<!-- Desktop stats (6 items) -->
			<div class="summary player six desktop">
				<div class="summary-item" v-for="i in 6" :key="i">
					<div class="skeleton skeleton-text small" style="margin-bottom: 8px;"></div>
					<div class="skeleton skeleton-text medium"></div>
				</div>
			</div>
			
			<!-- Mobile stats (5 items) -->
			<div class="summary player five mobile">
				<div class="summary-item" v-for="i in 6" :key="i">
					<div class="skeleton skeleton-text small" style="margin-bottom: 8px;"></div>
					<div class="skeleton skeleton-text medium"></div>
				</div>
			</div>
			
			<!-- Players title -->
			<div class="skeleton-section-title">
				<div class="skeleton skeleton-text small"></div>
			</div>
			
			<!-- Players section (3 columns) -->
			<div class="summary player three col">
				<div class="summary-item players" v-for="i in 3" :key="i">
					<div class="skeleton skeleton-text medium" style="margin-bottom: 10px;"></div>
					<div v-for="j in 5" :key="j" style="margin-bottom: 6px;">
						<div class="skeleton skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
					</div>
				</div>
			</div>
			
			<!-- Locations title -->
			<div class="skeleton-section-title big-margin">
				<div class="skeleton skeleton-text small"></div>
			</div>
			
			<!-- Locations section (3 columns) -->
			<div class="summary player three col">
				<div class="summary-item players" v-for="i in 3" :key="i">
					<div class="skeleton skeleton-text medium" style="margin-bottom: 10px;"></div>
					<div v-for="j in 4" :key="j" style="margin-bottom: 6px;">
						<div class="skeleton skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
					</div>
				</div>
			</div>
			
			<!-- Charts title -->
			<div class="skeleton-section-title big-margin">
				<div class="skeleton skeleton-text small"></div>
			</div>
			
			<!-- Chart skeleton -->
			<div class="chart-wrapper">
				<div class="skeleton skeleton-chart"></div>
			</div>
			
			<!-- Matches title -->
			<div class="skeleton-section-title no-border big-margin">
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
	<div v-else class="static-wrapper player mobile-mb-300">
		<Link prefetch="false"
			class="edit-btn desktop"
			v-if="$page.props.auth.user"
			:href="`/${player.uri}/izmeni`"
			><EditIcon
		/></Link>
			<Link prefetch="false"
				class="edit-btn mobile"
				v-if="$page.props.auth.user"
				:href="`/${player.uri}/izmeni`"
				><EditIcon
			/></Link>

			<div class="ranks">
				<div
					class="rank"
					:class="{
						first: player.rank == 1,
						second: player.rank == 2,
						third: player.rank == 3,
					}"
				>
					<p :class="{ 'align-left': player.rank > 9,'n40': player.rank >= 40 && player.rank < 50, [`strict-${player.rank}`]: true }">
						{{ player.rank }}
					</p>
				</div>
				<div class="category">
					<span class="diamond" :style="{ border: `1px solid ${categoryColors[player.category] || 'transparent'}` }"></span>
					<span class="number" :class="{[`category-${player.category}`]: true, 'category-unknown': player.category == '?'}">{{ player.category }}</span>
				</div>
			</div>


		<h1 v-if="player.name" class="blue" :class="{'fix-letters': containsGreek(player.name)}">
			{{ player.name.split(' ')[0]}} <br class="show-mobile"> {{  player.name.split(' ')[1] }}
		</h1>
		<p class="subtitle-spacer" v-if="!player.club && !player.location">
			&nbsp;
		</p>
		<p class="subtitle small-margin">
			{{ player.location }}
		</p>

		<div class="dashboard-wrapper">
			<h2 class="summary-title">Statistika</h2>
			<div class="summary player five desktop">
				<div class="summary-item">
					<h2>poeni</h2>
					<p>{{ points}}</p>
				</div>
				<div class="summary-item">
					<h2>mečevi</h2>
					<p>{{ player.total_matches }}</p>
				</div>
				<div class="summary-item">
					<h2>pobede</h2>
					<p>{{ player.wins_number }}</p>
				</div>
				<div class="summary-item">
					<h2>gubitci</h2>
					<p>{{ player.losses_number }}</p>
				</div>
				<div class="summary-item">
					<h2>% pobeda</h2>
					<p>{{ player.win_precentage }}%</p>
				</div>
				
			</div>
			<div class="summary player five mobile">
				<div class="summary-item half">
					<h2>poeni</h2>
					<p class="big">{{ points }}</p>
				</div>
				<div class="summary-item half">
					<h2>% pobeda</h2>
					<p class="big">{{ player.win_precentage }}%</p>
				</div>
				<div class="summary-item">
					<h2>mečevi</h2>
					<p class="big">{{ player.total_matches }}</p>
				</div>
				<div class="summary-item">
					<h2>pobede</h2>
					<p class="big">{{ player.wins_number }}</p>
				</div>
				<div class="summary-item">
					<h2>gubitci</h2>
					<p class="big">{{ player.losses_number }}</p>
				</div>
			</div>
			<h2 class="summary-title">Teniseri</h2>
			<div class="summary player two col">
				<div class="summary-item players">
					<h2 v-if="player.matchups">pobedio {{ Object.values(player.matchups.won_against).length }} tenisera</h2>
					<template v-if="matchups.wins.length > 0">
						<template v-for="player in matchups.wins">
							<p>
								<Link prefetch="false" :href="`/${player.uri}`">{{
									player.name
								}}</Link>
								({{ player.count }})
							</p>
						</template>
						<p
							v-if="Object.values(player.matchups.won_against).length > 10"
							class="show-more"
							@click="isExpanded.wins = !isExpanded.wins">
							{{ !isExpanded.wins ? 'vidi sve' : 'vidi manje' }}
						</p>
					</template>
					<template v-else>
						<h2 class="black">ovaj teniser nikada nije pobedio &#128577;</h2>
					</template>
				</div>
				<div class="summary-item players">
					<h2 v-if="player.matchups">izgubio od {{Object.values(player.matchups.lost_against).length}} tenisera</h2>
					<template v-if="matchups.loses.length > 0">
						<template v-for="player in matchups.loses">
							<p>
								<Link prefetch="false" :href="`/${player.uri}`">{{
									player.name
								}}</Link>
								({{ player.count }})
							</p>
						</template>
						<p
							v-if="Object.values(player.matchups.lost_against).length > 10"
							class="show-more"
							@click="isExpanded.loses = !isExpanded.loses">
							{{ !isExpanded.loses ? 'vidi sve' : 'vidi manje' }}
						</p>
					</template>
					<template v-else>
						<h2 class="black">ovaj teniser nikada nije izgubio &#128578;</h2>
					</template>
				</div>
			
			</div>
			<h2 class="summary-title big-margin">lokacije</h2>
			<div class="summary player three col">
				<div class="summary-item players">
					<h2>opštine</h2>
					<template v-for="location in locations.locations">
						<p>
							{{location.county}}
							({{ location.count }})
						</p>
					</template>
				</div>
				<div class="summary-item players">
						<h2>tereni</h2>
						<template v-for="court in locations.courts">
							<p style="text-align: center;">
								<template v-if="court.id > 1">
									<a  :href="`/tereni/${court.uri}`">
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
					<h2>lige i turniri</h2>
					<template v-if="locations.leagues.length > 0">
						<template v-for="league in locations.leagues">
							<p>
								<template v-if="league.uri != ''">
									<a :href="`/${league.uri}`">
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
						<h2 class="black">ovaj teniser nije učestvovao u ligama &#128577;</h2>
					</template>
				</div>
			</div>
			<h2 class="summary-title big-margin">Grafikoni</h2>
			<div class="chart-wrapper">
				<PlayerChart v-if="player.id" :player_id="player.id" />
			</div>
			<h2 class="summary-title no-border big-margin">mečevi</h2>
			<div class="player-matches">
				<Matches
					v-if="player.id"
					:isHome="false"
					:player_id="player.id"
					:loadMatches="true"
					:showMessage="{ matches: player.matches?.length == 0 }"
				/>
			</div>
		</div>
	</div>
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
  
  &.skeleton-chart {
    width: 100%;
    height: 300px;
    border-radius: 8px;
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
  }
  
  .skeleton-section-title {
    display: flex;
    justify-content: center;
    margin: 70px 0 30px 0;
    
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
    
    // Mobile stats sections
    .summary.player.six.desktop {
      display: none !important;
    }
    
    .summary.player.five.mobile {
      display: flex !important;
      flex-wrap: wrap;
      
      .summary-item {
        width: 33.3%;
      }
    }
  }
}
</style>
