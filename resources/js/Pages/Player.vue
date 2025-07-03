<script setup>
import { usePage } from "@inertiajs/vue3";
import { onMounted, computed, reactive, ref } from "vue";
import utils from "../utils";
import axios from 'axios';
import PlayerChart from "./components/PlayerChart.vue";
import EditIcon from "./components/EditIcon.vue";
import bus from 'vue3-eventbus';

const props = defineProps({ player_uri: String });
const player = ref({});

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
  '?': 'transparent',
  '?': 'transparent',
}
onMounted(() => {
	axios.get(`/get-player/${props.player_uri}`).then((response) => {
	bus.emit('headTitle', 'teniser')
		player.value = response.data;
		console.log('Player data:', player.value);
		pageTitle.value = `${player.value.name} - Srpska Tenis Liga`;
		bus.emit('loading', false)
	}).catch((error) => {
		console.error('Error fetching players:', error);
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

</script>
<template>
 	<Head :title="pageTitle" />
	<div style="margin-bottom: -20px; padding-bottom: 0;" class="static-wrapper player">
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
		<div
			class="rank"
			:class="{
				first: player.rank == 1,
				second: player.rank == 2,
				third: player.rank == 3,
			}"
		>
			<p :class="{ 'align-left': player.rank > 9,'n40': player.rank >= 40 && player.rank < 50 }">
				{{ player.rank }}
			</p>
		</div>
		<h1 v-if="player.name" class="blue" :class="{'fix-letters': containsGreek(player.name)}">
			{{ player.name.split(' ')[0]}} <br class="show-mobile"> {{  player.name.split(' ')[1] }}
		</h1>
		<p class="subtitle-spacer" v-if="!player.club && !player.location">
			&nbsp;
		</p>
		<p class="subtitle">
			{{ player.location }}
		</p>

		<div class="dashboard-wrapper">
			<h2 class="summary-title">Statistika</h2>
			<div class="summary player six desktop">
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
				<div class="summary-item">
					<h2 style="margin-top: -10px;">kategorija</h2>
					<p class="category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[player.category] || 'transparent'}` }"></span>
						<span class="number" :class="{[`category-${player.category}`]: true, 'unknown': player.category == '?'}">{{ player.category }}</span>
					</p>
				</div>
			</div>
			<div class="summary player five mobile">
				<div class="summary-item half">
					<h2>poeni</h2>
					<p>{{ points }}</p>
				</div>
				<div class="summary-item">
					<h2>% pobeda</h2>
					<p>{{ player.win_precentage }}%</p>
				</div>
				<div class="summary-item">
					<h2 style="margin-top: -4px;">kategorija</h2>
					<p class="category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[player.category] || 'transparent'}` }"></span>
						<span class="number" :class="{[`category-${player.category}`]: true, 'fix': player.category == 7, 'unknown': player.category == '?'}">{{ player.category }}</span>
					</p>
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
			</div>
			<h2 class="summary-title">Teniseri</h2>
			<div class="summary player three col">
				<div class="summary-item players">
					<template v-if="matchups.wins.length > 0">
						<h2>pobedio {{ Object.values(player.matchups.won_against).length }} tenisera</h2>
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
						<h2>ovaj teniser nikada nije pobedio &#128577;</h2>
					</template>
				</div>
				<div class="summary-item players">
					<template v-if="matchups.loses.length > 0">
						<h2>izgubio od {{Object.values(player.matchups.lost_against).length}} tenisera</h2>
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
						<h2>ovaj teniser nikada nije izgubio &#128578;</h2>
					</template>
				</div>
				<div class="summary-item players">
					<template v-if="matchups.not_played.length > 0">
						<h2>nije igrao sa {{player.matchups.not_played.length}} {{getInteractionText(matchups.not_played.length)}}</h2>
						<template v-for="player in matchups.not_played">
							<p>
								<Link prefetch="false" :href="`/${player.uri}`">{{
									player.name
								}}</Link>
							</p>
						</template>
						<p
							v-if="player.matchups.not_played.length > 10"
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
							<p>
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
					<template v-if="locations.leagues.length > 0">
						<h2>lige i turniri</h2>
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
						<h2>ovaj teniser nije učestvovao u ligama &#128577;</h2>
					</template>
				</div>
			</div>
			<h2 class="summary-title">Grafikoni</h2>
			<div class="chart-wrapper">
				<PlayerChart v-if="player.id" :player_id="player.id" />
			</div>
			<h2 class="summary-title no-border low-margin">pobede</h2>
			<div class="player-matches">
				<MatchTable
					v-if="player.wins"
					:showMessage="{ wins: player.wins_number == 0 }"
					:propMatches="player.wins"
					:loadMatches="false"
				/>
			</div>
			<h2 class="summary-title no-border low-margin">gubitci</h2>
			<div class="player-matches mobile-mb-200">
				<MatchTable
					v-if="player.losses"
					:showMessage="{ loses: player.losses_number == 0 }"
					:propMatches="player.losses"
					:loadMatches="false"
				/>
			</div>
		</div>
	</div>
</template>
