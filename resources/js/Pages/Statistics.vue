<script setup>
    import { onMounted, computed } from 'vue';
    import utils from '../utils';
    import LeagueChart from './components/LeagueChart.vue';
    import { usePage } from '@inertiajs/vue3';

    const props = defineProps({data: Object})
    const page = usePage();
    onMounted(() => {
        page.props['title'] = 'statistika';
    });

    const locations = computed(() => {
        return {
            courts: props.data.stats.locations.courts,
            locations: props.data.stats.locations.locations,
            leagues: props.data.stats.locations.leagues,
        };
    });

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
                    <p>{{ utils.formatAsThousands(props.data.stats.totals.points) }}</p>
                </div>
                <div class="summary-item">
                    <h2>teniseri</h2>
                    <p>{{ props.data.stats.totals.players }}</p>
                </div>
                <div class="summary-item">
                    <h2>mečevi</h2>
                    <p>{{ props.data.stats.totals.matches }}</p>
                </div>
            </div>

            <h2 class="summary-title">teniseri</h2>
            <div class="summary player three desktop col">
                <div class="summary-item">
                    <h2 class="mb-10">najviše mečeva</h2>
                    <p class="smaller f20" v-for="player in props.data.stats.players.total">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link> ({{ player.count }})
                    </p>
                </div>
                <div class="summary-item">
                    <h2 class="mb-10">najviše pobeda</h2>
                    <p class="smaller f20" v-for="player in props.data.stats.players.wins">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link> ({{ player.count }})
                    </p>
                </div>
                <div class="summary-item">
                    <h2 class="mb-10">najviše gubitaka</h2>
                    <p class="smaller f20" v-for="player in props.data.stats.players.loses">
                        <Link prefetch="false" :href="`/${player.uri}`">
                            {{ player.name }}
                        </Link>  ({{ player.count }})
                    </p>
                </div>
            </div>
            <h2 class="summary-title big-margin">lokacije</h2>
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
                        <template v-if="court.link != ''">
                            <a target="'_blank'" :href="court.link">
                                {{ court.name }}
                            </a>
                        </template>
                        <template v-else>
                            {{ court.name }}
                        </template>
                        ({{ court.count }})</p>
                </div>
                <div class="summary-item">
                    <template v-if="locations.leagues.length == 0">
                        <h2 class="mb-10">nema liga ili turnira</h2>
                    </template>
                    <template v-else>
                        <h2 class="mb-10">najaktivnije lige</h2>
                        <p class="smaller f20" v-for="league in locations.leagues">
                            <template v-if="league.uri != ''">
                                <a target="'_blank'" :href="`/${league.uri}`">
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
            <LeagueChart :data="props.data.charts" />
        </div>
    </div>
</template>
