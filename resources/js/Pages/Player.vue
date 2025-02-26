<script setup>
import { usePage } from '@inertiajs/vue3';
import { defineProps, onMounted } from 'vue';
import utils from '../utils';
const props = defineProps({ player: Object });
const page = usePage();

onMounted(() => {
    page.props['title'] = 'teniser';
});
</script>
<template>
    <div class="static-wrapper player">
        <div class="rank"
        :class="{'first': props.player.position==1, 'second': props.player.position == 2, 'third': props.player.position==3}"
        ><p>{{ player.position }}</p></div>
        <h1>{{props.player.name}}<Link class="edit-btn" v-if="$page.props.auth.user" :href="`/teniser/izmeni/${props.player.id}`">&#9998;</Link></h1>
        <p class="subtitle-spacer" v-if="!player.club && !player.location">&nbsp;</p>
        <p class="subtitle">{{ player.club }}{{ player.club ? ', ' : ' ' }}{{ player.location }}</p>
        
        <div class="dashboard-wrapper">
            <h2 class="summary-title">Statistika</h2>
            <div class="summary player five desktop">
                <div class="summary-item">
                    <h2>poeni</h2>
                    <p>{{ utils.formatAsThousands(props.player.stats.elo) }}</p>
                </div>
                <div class="summary-item">
                    <h2>svi mečevi</h2>
                    <p>{{ props.player.stats.total_matches }}</p>
                </div>
                <div class="summary-item">
                    <h2>pobede</h2>
                    <p>{{ props.player.stats.wins }}</p>
                </div>
                <div class="summary-item">
                    <h2>gubitci</h2>
                    <p>{{ props.player.stats.loses }}</p>
                </div>
                <div class="summary-item">
                    <h2>% pobeda</h2>
                    <p>{{ props.player.stats.win_precentage }}%</p>
                </div>
            </div>
            <div class="summary player five mobile">
                <div class="summary-item half">
                    <h2>poeni</h2>
                    <p>{{ utils.formatAsThousands(props.player.stats.elo) }}</p>
                </div>
                <div class="summary-item">
                    <h2>% pobeda</h2>
                    <p>{{ props.player.stats.win_precentage }}%</p>
                </div>
                <div class="summary-item">
                    <h2>svi mečevi</h2>
                    <p>{{ props.player.stats.total_matches }}</p>
                </div>
                <div class="summary-item">
                    <h2>pobede</h2>
                    <p>{{ props.player.stats.wins }}</p>
                </div>
                <div class="summary-item">
                    <h2>gubitci</h2>
                    <p>{{ props.player.stats.loses }}</p>
                </div>
            </div>
            <h2 class="summary-title no-border low-margin">pobede</h2>
            <div class="player-matches">
                <MatchTable :showMessage="{wins: props.player.wins == 0}" :matches="props.player.wins" />
            </div>
            <h2 class="summary-title no-border low-margin">gubitci</h2>
            <div class="player-matches">
                <MatchTable :showMessage="{loses: props.player.loses == 0}" :matches="props.player.loses" />
            </div>
        </div>
    </div>
    <Head :title="`${props.player.name} -`" />
</template>