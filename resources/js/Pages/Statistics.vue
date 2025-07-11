<script setup>
    import { onMounted, computed } from 'vue';
    import utils from '../utils';
    import LeagueChart from './components/LeagueChart.vue';
    import { usePage } from '@inertiajs/vue3';
    import axios from 'axios';
    import bus from 'vue3-eventbus';
import { ref } from 'vue';

    const page = usePage();

    const data = ref({});
    onMounted(() => {
        page.props['title'] = 'statistika';
        axios.get('/get-statistics').then((response) => {
            data.value = response.data;
            bus.emit('loading', false);
        }).catch((error) => {
            console.error('Error fetching statistics:', error);
        });
    });

    const locations = computed(() => {
        return {
            courts: data.value.locations?.courts,
            locations: data.value.locations?.locations,
            leagues: data.value.locations?.leagues,
        };
    });
    const points = computed(() => {
        if(!data.value || !data.value.totals) {
            return 0;
        }
        else
        return utils.formatAsThousands(data.value.totals.points);
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
    }
</script>
<template>
    <Head :title="'Statistika -'"/>
    <div style="padding-bottom:0;margin-bottom:60px" class="static-wrapper player">
        <div class="dashboard-wrapper">
        <h1 class="hide-mobile">Statistika</h1>
            <h2 class="summary-title">ukupno</h2>
            <div class="summary player three desktop">
                <div class="summary-item">
                    <h2>poeni</h2>
                    <p>{{ points }}</p>
                </div>
                <div class="summary-item">
                    <h2>teniseri</h2>
                    <p>{{ data.totals?.players }}</p>
                </div>
                <div class="summary-item">
                    <h2>mečevi</h2>
                    <p>{{ data.totals?.matches }}</p>
                </div>
            </div>

            <h2 class="summary-title">teniseri</h2>
            <div class="summary player three desktop col">
                <div class="summary-item">
                    <h2 class="mb-10">najviše mečeva</h2>
                    <p class="smaller f20" v-for="player in data.players?.total">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link> ({{ player.count }})
                    </p>
                </div>
                <div class="summary-item">
                    <h2 class="mb-10">najviše pobeda</h2>
                    <p class="smaller f20" v-for="player in data.players?.wins">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link> ({{ player.count }})
                    </p>
                </div>
                <div class="summary-item">
                    <h2 class="mb-10">najviše gubitaka</h2>
                    <p class="smaller f20" v-for="player in data.players?.loses">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link>  ({{ player.count }})
                    </p>
                </div>
            </div>
            
            <h2 class="summary-title">najbolji po kategorijama</h2>
            <div class="summary player five col">
                <div class="summary-item flex">
                    <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[1] || 'transparent'}` }"></span>
						<span class="number category-1">1</span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[1]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link> 
                    </p>
                    <p v-if="data.categories?.[1]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[2] || 'transparent'}` }"></span>
						<span class="number category-2">2</span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[2]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link> 
                    </p>
                    <p v-if="data.categories?.[2]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[3] || 'transparent'}` }"></span>
						<span class="number category-3">3</span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[3]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link>
                    </p>
                    <p v-if="data.categories?.[3]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[4] || 'transparent'}` }"></span>
						<span class="number category-4">4</span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[4]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link>
                    </p>
                    <p v-if="data.categories?.[4]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[5] || 'transparent'}` }"></span>
						<span class="number category-5">5</span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[5]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link>
                    </p>
                    <p v-if="data.categories?.[5]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[6] || 'transparent'}` }"></span>
						<span class="number category-6">6</span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[6]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link>
                    </p>
                    <p v-if="data.categories?.[6]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[7] || 'transparent'}` }"></span>
						<span class="number category-7">7</span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[7]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link> 
                    </p>
                    <p v-if="data.categories?.[7]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[8] || 'transparent'}` }"></span>
						<span class="number category-8">8</span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[8]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link>
                    </p>
                    <p v-if="data.categories?.[8]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[9] || 'transparent'}` }"></span>
						<span class="number category-9">9</span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[9]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link> 
                    </p>
                    <p v-if="data.categories?.[9]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[10] || 'transparent'}` }"></span>
						<span class="number category-10">10</span>
                    </h2>
                    <p class="smaller f20" v-if="data.categories?.[10]?.length > 0" v-for="player in data.categories?.[10]">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link> 
                    </p>
                    <p v-if="data.categories?.[10]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
            </div>
            <h2 class="summary-title big-margin">lokacije, lige i turniri</h2>
            <div class="summary player three desktop col">
                <div class="summary-item">
                    <h2 class="mb-10">najaktivnije opštine</h2>
                    <p class="smaller f20" v-for="location in locations.locations">
                        {{ location.name }}
                        ({{ location.count }})
                    </p>
                </div>
                <div class="summary-item">
                    <h2 class="mb-10">najkorišćeniji tereni</h2>
                    <p class="smaller f20" v-for="court in locations.courts">
                        <template v-if="court.id > 1">
                            <a  :href="`/tereni/${court.uri}`">
                                {{ court.name }}
                            </a>
                        </template>
                        <template v-else>
                            {{ court.name }}
                        </template>
                        ({{ court.count }})</p>
                </div>
                <div class="summary-item">
                    <template v-if="locations.leagues?.length == 0">
                        <h2 class="mb-10">nema liga ili turnira</h2>
                    </template>
                    <template v-else>
                        <h2 class="mb-10">najaktivnije lige i turniri</h2>
                        <p class="smaller f20" style="text-align: center;" v-for="league in locations.leagues">
                            <template v-if="league.uri != ''">
                                <a :href="`/${league.uri}`">
                                    {{ league.name }}
                                </a>
                            </template>
                            <template v-else>
                                {{ league.name }}
                            </template>
                            ({{ league.count }})</p>
                    </template>
                </div>
            </div>

            <h2 class="summary-title big-margin">Grafikoni</h2>
            <LeagueChart />
        </div>
    </div>
</template>
