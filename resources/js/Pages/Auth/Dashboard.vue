<script setup>
const props = defineProps({ data: Object });
</script>
<template>
    <div class="static-wrapper dashboard">
        <h1>admin</h1>
        <div class="dashboard-wrapper">
            <div class="summary">
                <div class="summary-item">
                    <h2>Ukupno mečeva</h2>
                    <p>{{ props.data.stats.total_matches }}</p>
                </div>
                <div class="summary-item">
                    <h2>Ukupno tenisera</h2>
                    <p>{{ props.data.stats.total_players }}</p>
                </div>
                <div class="summary-item">
                    <h2>Najpopularnija lokacija</h2>
                    <p>{{ props.data.stats.popular_location }}</p>
                </div>
            </div>
            <div class="stats">
                <div class="stats-item">
                    <h2>Top 5 tenisera</h2>
                    <div class="player-wrapper">
                      <PlayerTable :players="props.data.players" />
                    </div>

                </div>
                <div class="stats-item">
                    <h2>Poslednjih 5 mečeva</h2>
                    <MatchTable :matches="props.data.matches" />
                </div>
            </div>
        </div>
    </div>
</template>
