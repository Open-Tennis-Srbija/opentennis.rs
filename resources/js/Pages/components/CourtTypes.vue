<script setup>
import { computed } from "vue";

const props = defineProps({
    title: String,
    titleClass: String,
    // Number of courts per type, e.g. { hard: 2, gravel: 3 }
    counts: Object,
    // The court page wants room under the module; on statistics the next title's margin is enough
    spaceBelow: { type: Boolean, default: true },
});

// Forms for 1, 2-4 and 5+ courts, e.g. 1 šljaka, 3 šljake, 5 šljaka
const courtTypeTitles = {
    hard: ["otvoren beton", "otvorena betona", "otvorenih betona"],
    gravel: ["šljaka", "šljake", "šljaka"],
    hard_indoor: ["zatvoren beton", "zatvorena betona", "zatvorenih betona"],
    gravel_indoor: ["zatvorena šljaka", "zatvorene šljake", "zatvorenih šljaka"],
};

const pluralForm = (count) => {
    if (count % 10 === 1 && count % 100 !== 11) return 0;
    if ([2, 3, 4].includes(count % 10) && ![12, 13, 14].includes(count % 100)) return 1;
    return 2;
};

// Types without courts are left out, none at all hides the module
const courtTypes = computed(() => {
    const raw = props.counts || {};

    return Object.entries(courtTypeTitles)
        .filter(([key]) => raw[key] > 0)
        .map(([key, titles]) => ({ key, title: titles[pluralForm(raw[key])], count: raw[key] }));
});
</script>
<template>
    <template v-if="courtTypes.length > 0">
        <h2 class="summary-title" :class="titleClass">{{ title }}</h2>
        <!-- Columns follow how many types there are: one is full width, two split 50/50 -->
        <div class="summary player court-types" :class="{ 'no-space-below': !spaceBelow }" :style="{ gridTemplateColumns: `repeat(${courtTypes.length}, 1fr)` }">
            <div class="summary-item" v-for="type in courtTypes" :key="type.key">
                <img :src="`/courts/court_${type.key}.png`" :alt="type.title">
                <p class="big">{{ type.count }}</p>
                <h2>{{ type.title }}</h2>
            </div>
        </div>
    </template>
</template>
<style lang="scss" scoped>
.summary.player.court-types {
  display: grid;
  // Images start at their edge, text has room above its letters
  padding-top: 6px;
  padding-bottom: 40px;

  @media only screen and (max-width: 1200px) {
    padding-bottom: 9px;
  }

  &.no-space-below {
    padding-bottom: 5px;
  }

  .summary-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    img {
      width: 64px;
      height: 100px;
      margin-bottom: 15px;
    }

    .big {
      margin-bottom: 0;
    }
  }
}
</style>
