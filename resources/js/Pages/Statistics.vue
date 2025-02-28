<script setup>
    import { onMounted } from 'vue';
    import utils from '../utils';
    import LeagueChart from './components/LeagueChart.vue';
    import { usePage } from '@inertiajs/vue3';

    const props = defineProps({data: Object})
    const page = usePage();
    onMounted(() => {
        page.props['title'] = 'statistika';
    });


</script>
<template>
    <Head :title="'Statistika -'"/>
    <div class="static-wrapper player">
        <div class="dashboard-wrapper">
        <h1 class="hide-mobile">Statistika</h1>
            <h2 class="summary-title">ukupno</h2>
            <div class="summary player three desktop">
                <div class="summary-item">
                    <h2>poeni</h2>
                    <p>{{ utils.formatAsThousands(props.data.totals.points) }}</p>
                </div>
                <div class="summary-item">
                    <h2>teniseri</h2>
                    <p>{{ props.data.totals.players }}</p>
                </div>
                <div class="summary-item">
                    <h2>mečevi</h2>
                    <p>{{ props.data.totals.matches }}</p>
                </div>
            </div>
       
            <h2 class="summary-title">teniseri</h2>
            <div class="summary player three desktop col">
                <div class="summary-item">
                    <h2>najviše mečeva</h2>
                    <p class="smaller"><Link :href="`/${props.data.players.total.uri}`">{{ props.data.players.total.name }}</Link></p>
                </div>
                <div class="summary-item">
                    <h2>najviše pobeda</h2>
                    <p class="smaller"><Link :href="`/${props.data.players.wins.uri}`">{{ props.data.players.wins.name }}</Link></p>
                </div>
                <div class="summary-item">
                    <h2>najviše gubitaka</h2>
                    <p class="smaller"><Link :href="`/${props.data.players.loses.uri}`">{{ props.data.players.loses.name }}</Link></p>
                </div>
            </div>
           
            <h2 class="summary-title">Grafikoni</h2>
            <LeagueChart />
        </div>
    </div>  
</template>