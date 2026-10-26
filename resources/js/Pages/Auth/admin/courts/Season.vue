<script setup>
import {useForm, usePage} from '@inertiajs/vue3'
import {onMounted, reactive} from 'vue';
import bus from 'vue3-eventbus';
import { seasons } from '@components/courtSeasons.js';

const props = defineProps({
    season: String,
});

const page = usePage();

onMounted(() => {
    page.props['title'] = `Promeni sezonu`;
    bus.emit('loading', false);
});

const form = useForm({
    season: props.season,
});

const formState = reactive({
    success: false,
});

const submit = () =>{
    formState.success = false;

    form.post(`/sezona`,{
        preserveScroll: true,
        onSuccess: () => {
            formState.success = true;
        },
        // The layout shows the loader on every visit and the page stays mounted after
        // the redirect back here, so onMounted won't hide it again
        onFinish: () => {
            bus.emit('loading', false);
        },
    });
}
</script>
<template>
  <Head title="Promeni sezonu -" />
  <div class="static-wrapper static">
    <h1 id="title">promeni sezonu</h1>
    <form id="form" @submit.prevent="submit">
      <div class="form-section">
        <div class="form-row">
          <div class="form-group season-group">
            <!-- The square is a span, the shared form styles would resize a visible input; the radio stays for keyboard use -->
            <div class="season-options" role="radiogroup" aria-label="Trenutna sezona">
              <label v-for="(title, key) in seasons" :key="key" class="season-option" :class="{ selected: form.season === key }">
                <input type="radio" name="season" :value="key" v-model="form.season" :disabled="form.processing">
                <span class="square"></span>
                {{ title }}
              </label>
            </div>
            <p class="error-message">{{ form.errors.season }}</p>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-row">
          <button id="submit" :disabled="form.processing">
            <span id="add-btn">sačuvaj</span>
          </button>
        </div>
      </div>
      <p v-if="formState.success" class="saved">Sezona je sačuvana.</p>
    </form>
  </div>
</template>
<style lang="scss" scoped>
// Nested under .form-group to win over the shared form styles for labels and inputs
.season-group {
  width: 100%;
  align-items: center;
}

.form-group .season-options {
  display: flex;
  justify-content: center;
  gap: 60px;
  height: 50px;
  align-items: center;

  .season-option {
    position: relative;
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: 20px;
    cursor: pointer;
    user-select: none;

    .square {
      width: 40px;
      height: 40px;
      border: 1px solid black;
    }

    &:hover .square {
      border-color: #00aeef;
    }

    &.selected .square {
      background-color: #00aeef;
      border-color: #00aeef;
    }

    input {
      position: absolute;
      inset: 0;
      opacity: 0;
      margin: 0;
      pointer-events: none;
    }
  }
}

.saved {
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}
</style>
