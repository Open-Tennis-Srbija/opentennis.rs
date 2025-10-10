<script setup>
    import { onMounted, computed } from 'vue';
    import utils from '../../utils';
    import LeagueChart from '@components/LeagueChart.vue';
    import { usePage } from '@inertiajs/vue3';
    import axios from 'axios';
    import bus from 'vue3-eventbus';
import { ref } from 'vue';

    const page = usePage();

    const data = ref({});
    const isLoading = ref(true);
    onMounted(() => {
        page.props['title'] = 'statistika';
        axios.get('/get-statistics').then((response) => {
            data.value = response.data;
            isLoading.value = false;
            bus.emit('loading', false);
        }).catch((error) => {
            console.error('Error fetching statistics:', error);
            isLoading.value = false;
            bus.emit('loading', false);
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
    '?': '#a1a1a1',
    }

    // Function to generate random widths for more realistic skeleton
    const getRandomWidth = () => {
        return Math.floor(Math.random() * (80 - 50 + 1)) + 50; // Random between 50% and 80%
    };
</script>
<template>
    <Head :title="'Statistika -'"/>
    
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" style="padding-bottom:0;margin-bottom:60px" class="static-wrapper player mobile-mb-300 skeleton-wrapper">
        <div class="dashboard-wrapper">
            <!-- Main title skeleton -->
            <h1 class="statistics">Statistika</h1>

            
            <!-- Totals section -->
            <div class="skeleton-section-title">
                <div class="skeleton skeleton-text medium"></div>
            </div>
            <div class="summary player three desktop">
                <div class="summary-item" v-for="i in 3" :key="i">
                    <div class="skeleton skeleton-text small" style="margin-bottom: 8px;"></div>
                    <div class="skeleton skeleton-text medium"></div>
                </div>
            </div>

            <!-- Players section -->
            <div class="skeleton-section-title">
                <div class="skeleton skeleton-text medium"></div>
            </div>
            <div class="summary player three desktop col">
                <div class="summary-item" v-for="i in 3" :key="i">
                    <div class="skeleton skeleton-text medium" style="margin-bottom: 10px;"></div>
                    <div v-for="j in 4" :key="j" style="margin-bottom: 6px;">
                        <div class="skeleton skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
                    </div>
                </div>
            </div>
            
            <!-- Categories section -->
            <div class="skeleton-section-title big-margin">
                <div class="skeleton skeleton-text large"></div>
            </div>
            <div class="summary player five col">
                <div class="summary-item flex" v-for="i in 11" :key="i" :class="{ 'full': i === 11 }">
                    <div class="skeleton-category">
                        <div class="skeleton skeleton-circle-small"></div>
                    </div>
                    <div v-for="j in 3" :key="j" style="margin-bottom: 6px;">
                        <div class="skeleton skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
                    </div>
                </div>
            </div>

            <!-- Locations section -->
            <div class="skeleton-section-title big-margin">
                <div class="skeleton skeleton-text large"></div>
            </div>
            <div class="summary player three desktop col">
                <div class="summary-item" v-for="i in 3" :key="i">
                    <div class="skeleton skeleton-text medium" style="margin-bottom: 10px;"></div>
                    <div v-for="j in 5" :key="j" style="margin-bottom: 6px;">
                        <div class="skeleton skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
                    </div>
                </div>
            </div>

            <!-- Charts section -->
            <div class="skeleton-section-title big-margin">
                <div class="skeleton skeleton-text medium"></div>
            </div>
            <div class="skeleton-chart-container">
                <div class="skeleton skeleton-chart"></div>
            </div>
        </div>
    </div>

    <!-- Actual Content -->
    <div v-else style="padding-bottom:0;margin-bottom:60px" class="static-wrapper player mobile-mb-300">
        <div class="dashboard-wrapper">
        <h1 class="statistics">Statistika</h1>
            <h2 class="summary-title">ukupno</h2>
            <div class="summary player three desktop">
                <div class="summary-item">
                    <h2>poeni</h2>
                    <p>{{ points }}</p>
                </div>
                <div class="summary-item">
                    <h2>teniseri</h2>
                    <p>{{ utils.formatAsThousands(data.totals?.players) }}</p>
                </div>
                <div class="summary-item">
                    <h2>mečevi</h2>
                    <p>{{ utils.formatAsThousands(data.totals?.matches) }}</p>
                </div>
            </div>

            <h2 class="summary-title">teniseri</h2>
            <div class="summary player three desktop col">
                <div class="summary-item">
                    <h2 class="mb-10">najviše mečeva</h2>
                    <p class="smaller f20" v-for="player in data.players?.total">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a> ({{ utils.formatAsThousands(player.count) }})
                    </p>
                </div>
                <div class="summary-item">
                    <h2 class="mb-10">najviše pobeda</h2>
                    <p class="smaller f20" v-for="player in data.players?.wins">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a> ({{ utils.formatAsThousands(player.count) }})
                    </p>
                </div>
                <div class="summary-item">
                    <h2 class="mb-10">najviše gubitaka</h2>
                    <p class="smaller f20" v-for="player in data.players?.loses">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a>  ({{ utils.formatAsThousands(player.count) }})
                    </p>
                </div>
            </div>
            
            <h2 class="summary-title big-margin">najaktivniji po<br class="show-mobile"> kategorijama</h2>
            <div class="summary player five col">
                <div class="summary-item flex">
                    <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[1] || 'transparent'}` }">
                            <span class="number category-1">1</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[1]">
                       <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a> 
                    </p>
                    <p v-if="data.categories?.[1]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex" :class="{'smaller-top-margin': data.categories?.[1]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[2] || 'transparent'}` }">
                            <span class="number category-2">2</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[2]">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a> 
                    </p>
                    <p v-if="data.categories?.[2]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex" :class="{'smaller-top-margin': data.categories?.[2]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[3] || 'transparent'}` }">
                            <span class="number category-3">3</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[3]">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a>
                    </p>
                    <p v-if="data.categories?.[3]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex" :class="{'smaller-top-margin': data.categories?.[3]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[4] || 'transparent'}` }">
                            <span class="number category-4">4</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[4]">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a>
                    </p>
                    <p v-if="data.categories?.[4]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex" :class="{'smaller-top-margin': data.categories?.[4]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[5] || 'transparent'}` }">
                            <span class="number category-5">5</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[5]">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a>
                    </p>
                    <p v-if="data.categories?.[5]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex" :class="{'smaller-top-margin': data.categories?.[5]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[6] || 'transparent'}` }">
                            <span class="number category-6">6</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[6]">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a>
                    </p>
                    <p v-if="data.categories?.[6]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex" :class="{'smaller-top-margin': data.categories?.[6]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[7] || 'transparent'}` }">
                            <span class="number category-7">7</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[7]">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a> 
                    </p>
                    <p v-if="data.categories?.[7]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex" :class="{'smaller-top-margin': data.categories?.[7]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[8] || 'transparent'}` }">
                            <span class="number category-8">8</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[8]">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a>
                    </p>
                    <p v-if="data.categories?.[8]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex" :class="{'smaller-top-margin': data.categories?.[8]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[9] || 'transparent'}` }">
                            <span class="number category-9">9</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-for="player in data.categories?.[9]">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a> 
                    </p>
                    <p v-if="data.categories?.[9]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item flex" :class="{'smaller-top-margin': data.categories?.[9]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors[10] || 'transparent'}` }">
                            <span class="number category-10">10</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-if="data.categories?.[10]?.length > 0" v-for="player in data.categories?.[10]">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a> 
                    </p>
                    <p v-if="data.categories?.[10]?.length == 0" class="no-players">
                        nema nikoga još &#128578;  
                    </p>
                </div>
                <div class="summary-item full flex" :class="{'smaller-top-margin': data.categories?.[10]?.length == 0}">
                     <h2 class="mb-10 category">
						<span class="diamond" :style="{ border: `1px solid ${categoryColors['?'] || 'transparent'}` }">
                            <span class="number category-unknown">?</span>
                        </span>
                    </h2>
                    <p class="smaller f20" v-if="data.categories?.['?']?.length > 0" v-for="player in data.categories?.['?']">
                        <a prefetch="false" target="_blank" :href="`/${player.uri}`">
                            {{ player.name }}
                        </a> 
                    </p>
                    <p v-if="data.categories?.['?']?.length == 0" class="no-players">
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
                        ({{ utils.formatAsThousands(location.count) }})
                    </p>
                </div>
                <div class="summary-item">
                    <h2 class="mb-10">najkorišćeniji tereni</h2>
                    <p class="smaller f20" v-for="court in locations.courts">
                        <template v-if="court.id > 1">
                            <a target="_blank" :href="`/tereni/${court.uri}`">
                                {{ court.name }}
                            </a>
                        </template>
                        <template v-else>
                            {{ court.name }}
                        </template>
                        ({{ utils.formatAsThousands(court.count) }})</p>
                </div>
                <div class="summary-item">
                    <template v-if="locations.leagues?.length == 0">
                        <h2 class="mb-10">nema liga ili turnira</h2>
                    </template>
                    <template v-else>
                        <h2 class="mb-10">najaktivnije lige i turniri</h2>
                        <p class="smaller f20" style="text-align: center;" v-for="league in locations.leagues">
                            <template v-if="league.uri != ''">
                                <a target="_blank" :href="`/${league.uri}`">
                                    {{ league.name }}
                                </a>
                            </template>
                            <template v-else>
                                {{ league.name }}
                            </template>
                            ({{ utils.formatAsThousands(league.count) }})</p>
                    </template>
                </div>
            </div>

            <h2 class="summary-title big-margin">Grafikoni</h2>
            <LeagueChart />
        </div>
    </div>
</template>

<style scoped>
/* Skeleton loading styles only - no typography changes */
.skeleton-wrapper {
    pointer-events: none;
}

.skeleton {
    background: linear-gradient(
        90deg,
        rgba(190, 190, 190, 0.2) 0%,
        rgba(129, 129, 129, 0.24) 50%,
        rgba(190, 190, 190, 0.2) 100%
    );
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite linear;
    border-radius: 4px;
    height: 16px;
    margin: 2px 0;
}

.skeleton-text {
    height: 16px;
}

.skeleton-text.small {
    height: 14px;
    width: 60%;
    margin: 0 auto;
}

.skeleton-text.medium {
    height: 18px;
    width: 80%;
    margin: 0 auto;
}

.skeleton-text.large {
    height: 24px;
    width: 70%;
    margin: 0 auto;
}

.skeleton-main-title {
    text-align: center;
    margin-bottom: 80px;
    padding-bottom: 10px;
    border-bottom: 5px solid rgba(190, 190, 190, 0.2);
}

.skeleton-main-title .skeleton {
    height: 40px;
    width: 200px;
    margin: 0 auto;
}

.skeleton-section-title {
    text-align: center;
    margin: 40px 20px 10px;
    padding-bottom: 5px;
    border-bottom: 1px solid rgba(190, 190, 190, 0.2);
}

.skeleton-section-title.big-margin {
    margin-top: 120px;
}

.skeleton-circle-small {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    transform: rotate(45deg);
    margin-right: 10px;
    flex-shrink: 0;
}

.skeleton-category {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;
}

.skeleton-chart-container {
    padding: 20px;
    text-align: center;
}

.skeleton-chart {
    height: 400px;
    width: 100%;
    border-radius: 8px;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }
    100% {
        background-position: 200% 0;
    }
}

/* Mobile responsive skeleton adjustments */
@media (max-width: 768px) {
    .skeleton-main-title .skeleton {
        height: 30px;
        width: 150px;
    }

    .skeleton-section-title {
        margin: 30px 10px 10px;
    }

    .skeleton-section-title.big-margin {
        margin-top: 80px;
    }

    .skeleton-chart {
        height: 300px;
    }
}
</style>