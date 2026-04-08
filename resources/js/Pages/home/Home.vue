<script setup>
import { ref, watch, onMounted, nextTick } from 'vue';
import { bus } from "vue3-eventbus";
import { usePage, router } from '@inertiajs/vue3';
import Dropdown from '@components/Dropdown.vue';

const props = defineProps({
    players: Array,
    tournaments: Array,
    courts: Array,
    leagues: Array,
});

const playerOptions = props.players.map((p, i) => ({ id: i, name: p.name, uri: p.uri }));
const tournamentOptions = props.tournaments.map((t, i) => ({ id: i, name: t.name, uri: t.uri }));
const courtOptions = props.courts.map((c, i) => ({ id: i, name: c.name, uri: c.uri }));
const leagueOptions = props.leagues.map((l, i) => ({ id: i, name: l.name, uri: l.uri }));

const selectedPlayer = ref('');
const selectedTournament = ref('');
const selectedCourt = ref('');
const selectedLeague = ref('');

onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});

watch(selectedPlayer, (val) => {
    if (val?.id !== undefined) {
        const p = playerOptions.find(p => p.id === val.id);
        if (p) router.visit(`/${p.uri}`);
    }
}, { deep: true });

watch(selectedTournament, (val) => {
    if (val?.id !== undefined) {
        const t = tournamentOptions.find(t => t.id === val.id);
        if (t) router.visit(`/${t.uri}`);
    }
}, { deep: true });

watch(selectedCourt, (val) => {
    if (val?.id !== undefined) {
        const c = courtOptions.find(c => c.id === val.id);
        if (c) router.visit(`/tereni/${c.uri}`);
    }
}, { deep: true });

watch(selectedLeague, (val) => {
    if (val?.id !== undefined) {
        const l = leagueOptions.find(l => l.id === val.id);
        if (l) router.visit(`/${l.uri}`);
    }
}, { deep: true });

const page = usePage();
</script>
<template>
  <Head>
    <title>{{ $page.props.seo?.title || 'Open Tennis Srbija' }}</title>
    <meta name="description" :content="$page.props.seo?.description || 'Open Tennis Srbija - dokumentacija srpskog tenisa'" />
    <meta name="keywords" :content="$page.props.seo?.keywords || ''" />
  </Head>

  <div class="home-page">
    <!-- Hero Section -->
    <div class="hero">
      <p class="hero-quote">
        Ako nešto ne možeš da izmeriš, ne možeš ni da ga unaprediš.<br />
        <span class="hero-author">Peter Drucker</span>
      </p>
      <p class="hero-description">
        Open tennis srbija je nezavisni volonterski projekat<br class="hide-mobile" />
        koji skuplja i organizuje podatke srpskog elitnog i rekreativnog tenisa
      </p>
      <p class="hero-description small">
        Svako može da doda tenisera i teren tako što dodaš meč<br class="hide-mobile" />
        (registracija nije potrebna)
      </p>
      <a href="/dodaj" class="hero-button">DODAJ MEČ</a>
    </div>

    <!-- Search Section -->
    <div class="search-section">
      <h2 class="section-title">nađi</h2>
      <div class="search-grid">
        <div class="search-item">
          <h3>Nađi tenisera</h3>
          <Dropdown
            label="name"
            :options="playerOptions"
            v-model="selectedPlayer"
            :multiple="false"
          />
        </div>
        <div class="search-item">
          <h3>Nađi turnir</h3>
          <Dropdown
            label="name"
            :options="tournamentOptions"
            v-model="selectedTournament"
            :multiple="false"
          />
        </div>
        <div class="search-item">
          <h3>Nađi teren</h3>
          <Dropdown
            label="name"
            :options="courtOptions"
            v-model="selectedCourt"
            :multiple="false"
          />
        </div>
        <div class="search-item">
          <h3>Nađi ligu</h3>
          <Dropdown
            label="name"
            :options="leagueOptions"
            v-model="selectedLeague"
            :multiple="false"
          />
        </div>
      </div>
    </div>

    <!-- Support Section -->
    <div class="support-section">
      <h2 class="section-title blue">Učestvuj</h2>
      <div class="support-grid">
        <div class="support-item">
          <h3>Predloži Izmenu</h3>
          <p>
            Pošalji link strane koji hoćeš da izmeniš<br />
            sa predlogom izmene na<br />
            <a href="mailto:volonteri@opentennis.rs">volonteri@opentennis.rs</a>
          </p>
        </div>
        <div class="support-item">
          <h3>Dodaj turnir ili ligu</h3>
          <p>
            Cilj nam je da imamo kompletan<br />
            kalendar turnira i liga.<br />
            <Link href="/dodaj-ligu">Pročitaj više ovde</Link>
          </p>
        </div>
        <div class="support-item">
          <h3>Postani volonter</h3>
          <p>
            Svako može da bude opentennis.rs volonter.<br />
            Volonteri dodaju i organizuju podatke preko weba.<br />
            Pošalji prijavu na<br />
            <a href="mailto:volonteri@opentennis.rs">volonteri@opentennis.rs</a>
          </p>
        </div>
        <div class="support-item">
          <h3>Skini podatke</h3>
          <p>
            Ako želiš da koristiš opentennis.rs podatke<br />
            u svom istraživanju ili projektu<br />
            pošalji kratak zahtev na<br />
            <a href="mailto:nikola@opentennis.rs">nikola@opentennis.rs</a>
          </p>
        </div>
      </div>
      <!-- <div class="support-bottom">
        <h3>open source</h3>
        <p>
          opentennis.rs je open source projekat<br />
         Poseti nas na <a href="https://github.com/bemapps/opentennis.rs" target="_blank">Github</a>.<br />
        </p>
      </div> -->
    </div>
  </div>
</template>



