<script setup>
import Dropdown from '@components/Dropdown.vue';
import { seasons, courtTypeTitles, priceTitles, courtCountOptions } from '@components/courtSeasons.js';

// Leto and Zima sections shared by the add and edit court forms
const props = defineProps({
    form: Object,
    disabled: Boolean,
});

const groupError = (group, season) => {
    const key = Object.keys(props.form.errors).find((k) => k.startsWith(`${group}.${season}.`));
    return key ? props.form.errors[key] : '';
};
</script>
<template>
  <div class="form-section" v-for="(seasonTitle, season) in seasons" :key="season">
    <h2>{{ seasonTitle }}</h2>
    <div class="form-row">
      <div class="form-group">
        <div class="field-group season-fields">
          <div v-for="(title, key) in courtTypeTitles[season]" :key="key" class="season-field">
            <label class="input-label">{{ title }}</label>
            <Dropdown
              :options="courtCountOptions"
              :type="'array'"
              :searchable="false"
              v-model="form.court_types[season][key]"
              :class="{'invalid': form.errors[`court_types.${season}.${key}`]}"
            />
          </div>
        </div>
        <p class="error-message">{{ groupError('court_types', season) }}</p>
      </div>
      <div class="form-group">
        <div class="field-group season-fields">
          <div v-for="(title, key) in priceTitles" :key="key" class="season-field">
            <label class="input-label">{{ title }}</label>
            <input v-model="form.prices[season][key]" :class="{'invalid': form.errors[`prices.${season}.${key}`]}" :disabled="disabled" type="number" min="0">
          </div>
        </div>
        <p class="error-message">{{ groupError('prices', season) }}</p>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.season-fields {
  width: 562px;
  max-width: 100%;

  .season-field {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .dropdown-wrapper {
      width: 100%;
    }
  }
}
</style>
