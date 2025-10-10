<script setup>
import {onBeforeMount, reactive, watch} from 'vue';
import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'
import AddSingle from '@matches/AddSingle.vue';
import AddDouble from '@matches/AddDouble.vue';
import { ref } from 'vue';

const props = defineProps({players: Array,courts: Array, leagues: Array});

const formState = reactive({
    submitted: false,
    success: false,
    shouldReset: false,
});
const court_id = ref(null)
const league_id = ref(null)

const matchUri = ref('');

const handleSuccess = () => {
    formState.success = true;
};
const handleCreated = (uri) => {
    matchUri.value = uri;
};
const selectedForm = reactive({
    type: 'single',
});
onBeforeMount(() => {
    const url = new URL(window.location);
    const obj = Object.fromEntries(url.searchParams.entries());
    if (obj.court) {
        court_id.value = obj.court;
    }
    if (obj.league) {
        league_id.value = obj.league;
    }
    console.log('Court ID:', court_id.value);
    console.log('League ID:', league_id.value);
});
</script>
<template>
  <Head title="Dodaj meč -" />
  <div class="static-wrapper">
    <div v-if="!formState.success" class="form-select">
      <h1 class="add" :class="{'active': selectedForm.type === 'single'}" @click="selectedForm.type = 'single'"><span class='mobile-hide'>dodaj</span> singl</h1>
      <h1 class="add" :class="{'active': selectedForm.type === 'double'}" @click="selectedForm.type = 'double'"><span class='mobile-hide'>dodaj</span> dubl</h1>
    </div>
    <h1 id="success" :class="{'show': formState.success}">Meč je uspešno dodat</h1>
    <div id="success-links" :class="{'show': formState.success}">
      <Link prefetch="false" class="red" :href="`/mec/${matchUri}`">vidi dodat meč</Link>
      <p class="add" @click.prevent="formState.success = false">dodaj još jedan meč</p>
      <Link prefetch="false" :href="'/mecevi'">vidi mečeve</Link>
      <Link prefetch="false" :href="'/'">vidi tenisere</Link>
    </div>
    <div v-if="!formState.success">
      <AddSingle :matchUri="matchUri" :court_id="court_id" :league_id="league_id" @matchCreated="handleCreated" @success="handleSuccess" v-if="selectedForm.type === 'single'" :players="props.players" :courts="props.courts" :leagues="props.leagues" />
      <AddDouble :matchUri="matchUri" :court_id="court_id" :league_id="league_id" @matchCreated="handleCreated" @success="handleSuccess" v-if="selectedForm.type === 'double'" :players="props.players" :courts="props.courts" :leagues="props.leagues" />
    </div>
  </div>
</template>
