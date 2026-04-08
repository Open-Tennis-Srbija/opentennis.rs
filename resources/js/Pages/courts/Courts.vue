<script setup>
import { ref, onMounted, watch } from 'vue';
import utils from '../../utils';
import axios from 'axios';
import bus from 'vue3-eventbus';
import EditBtn from '@components/EditIcon.vue';
import Dropdown from '@components/Dropdown.vue';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const utl = utils;

const isClient = ref(false);

const courts = ref([]);
const isLoading = ref(true); // Add loading state

const sortKey = ref('matches_number');
const sortDir = ref('desc');

const toggleSort = (key) => {
    if (sortKey.value === key) {
        sortDir.value = sortDir.value === 'desc' ? 'asc' : 'desc';
    } else {
        sortKey.value = key;
        sortDir.value = 'desc';
    }
};

const sortOptions = [
    { id: 'matches_number_desc', name: 'mečevi ▼', key: 'matches_number', dir: 'desc' },
    { id: 'matches_number_asc', name: 'mečevi ▲', key: 'matches_number', dir: 'asc' },
    { id: 'name_asc', name: 'teren A-Ž', key: 'name', dir: 'asc' },
    { id: 'name_desc', name: 'teren Ž-A', key: 'name', dir: 'desc' },
    { id: 'player_number_desc', name: 'teniseri ▼', key: 'player_number', dir: 'desc' },
    { id: 'player_number_asc', name: 'teniseri ▲', key: 'player_number', dir: 'asc' },
    { id: 'county_asc', name: 'opština A-Ž', key: 'county', dir: 'asc' },
    { id: 'county_desc', name: 'opština Ž-A', key: 'county', dir: 'desc' },
];

const selectedSort = ref({ ...sortOptions[0] });

watch(selectedSort, (val) => {
    const option = sortOptions.find(o => o.id === val.id);
    if (option) {
        sortKey.value = option.key;
        sortDir.value = option.dir;
    }
}, { deep: true });

const sortedCourts = computed(() => {
    const compareByKey = (a, b, key, dir) => {
        let aVal = a[key];
        let bVal = b[key];
        if (key === 'name' || key === 'county') {
            aVal = (aVal || '').toLowerCase();
            bVal = (bVal || '').toLowerCase();
            return dir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        return dir === 'asc' ? aVal - bVal : bVal - aVal;
    };

    return [...courts.value].sort((a, b) => {
        // 1. Primary: current sort key
        let result = compareByKey(a, b, sortKey.value, sortDir.value);
        if (result !== 0) return result;

        // 2. matches_number desc (if not primary)
        if (sortKey.value !== 'matches_number') {
            result = compareByKey(a, b, 'matches_number', 'desc');
            if (result !== 0) return result;
        }

        // 3. player_number desc (if not primary)
        if (sortKey.value !== 'player_number') {
            result = compareByKey(a, b, 'player_number', 'desc');
            if (result !== 0) return result;
        }

        // 4. Alphabetically asc (if not primary)
        if (sortKey.value !== 'name') {
            result = compareByKey(a, b, 'name', 'asc');
        }

        return result;
    });
});

onMounted(() => {
  isClient.value = true;
  axios.get('/get-courts').then((response) => {
    courts.value = response.data;
    isLoading.value = false; // Set loading to false when data is loaded
    bus.emit('loading', false);
  }).catch((error) => {
    console.error('Error fetching courts:', error);
    isLoading.value = false; // Set loading to false on error as well
    bus.emit('loading', false);
  });
 bus.on('scroll', (top) => {
        handleScroll(top);
    });
});

const scrollPos = ref(0);

const handleScroll = (top) => {
  scrollPos.value = top;
}

const topOffset = computed(() => {
    if (scrollPos.value >= 70) {
        return 160;
    } else {
        return scrollPos.value * 2;
    }
});
// Function to generate random widths for more realistic skeleton
const getRandomWidth = () => {
    return Math.floor(Math.random() * (85 - 60 + 1)) + 60; // Random between 60% and 85%
};

const page = usePage();
const headerStats = computed(() => page.props.headerStats);

const courtsText = computed(() => {
   //check last digit of headerStats.totalCourts
   const lastDigit = headerStats.value.totalCourts % 10;
   if(headerStats.value.totalCourts === 0){
       return "Tereni";
   }
   else if (lastDigit === 1) {
       return utils.formatAsThousands(headerStats.value.totalCourts - 1) + " Teren";
   } else {
       return utils.formatAsThousands(headerStats.value.totalCourts - 1) + " Terena";
   }
});
</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Tereni -" />
  <h1 class="list-title players">{{ courtsText }}</h1>
<div class="rankings-wrapper courts-list mobile-mb-300">
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="skeleton-wrapper">
      <div id="desktop">
        <div class="rankings-header" :style="{ top: 200 - topOffset + 'px' }">
          <div class="name">teren</div>
          <div class="total-matches">mečevi</div>
          <div class="total-matches">teniseri</div>
          <div class="total-matches">opština</div>
        </div>
        <div v-for="n in 8" :key="`desktop-skeleton-${n}`" class="ranking-entry skeleton" :style="{marginTop: index === 0 ? 25 - topOffset/3 + 'px' : '0'}">
          <div class="name helvetica">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="total-matches">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="total-matches">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="total-matches smaller-font">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
        </div>
      </div>

      <div id="mobile">
        <!-- <div class="mobile-sort-filter">
          <Dropdown
            label="name"
            :options="sortOptions"
            v-model="selectedSort"
            :multiple="false"
            :searchable="false"
          />
        </div> -->
        <div v-for="n in 8" :key="`mobile-skeleton-${n}`" class="ranking-entry skeleton">
          <div class="name helvetica text-align-center">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="info two">
            <div class="info-wrapp">
              <div class="sup">mečevi</div>
              <div class="text">
                <div class="skeleton-item skeleton-text small"></div>
              </div>
            </div>
            <div class="info-wrapp">
              <div class="sup">teniseri</div>
              <div class="text">
                <div class="skeleton-item skeleton-text small"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actual Content -->
    <div v-else>
      <div id="desktop">
      <div class="rankings-header" :style="{ top: 200 - topOffset + 'px' }">
        <div class="name sortable" :class="{ active: sortKey === 'name', asc: sortKey === 'name' && sortDir === 'asc' }" @click="toggleSort('name')">teren</div>
        <div class="total-matches sortable" :class="{ active: sortKey === 'matches_number', asc: sortKey === 'matches_number' && sortDir === 'asc' }" @click="toggleSort('matches_number')">mečevi</div>
        <div class="total-matches sortable" :class="{ active: sortKey === 'player_number', asc: sortKey === 'player_number' && sortDir === 'asc' }" @click="toggleSort('player_number')">teniseri</div>
        <div class="total-matches sortable" :class="{ active: sortKey === 'county', asc: sortKey === 'county' && sortDir === 'asc' }" @click="toggleSort('county')">opština</div>
      </div>
      <div class="ranking-entry" v-for="(court, index) in sortedCourts" :style="{marginTop: index === 0 ? 25 - topOffset/3 + 'px' : '0'}">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-teren/${court.id}`"><EditBtn/></Link>
        <div class="name helvetica"><Link prefetch="false" :href="`/tereni/${court.uri}`">{{court.name}}</Link></div>
        <div class="total-matches">{{court.matches_number}}</div>
        <div class="total-matches">{{court.player_number}}</div>
        <div class="total-matches smaller-font" style="text-align: center;">{{court.county}}</div>
      </div>
    </div>

    <div id="mobile">
      <!-- <div class="mobile-sort-filter">
        <Dropdown
          label="name"
          :options="sortOptions"
          v-model="selectedSort"
          :multiple="false"
          :searchable="false"
        />
      </div> -->
      <div class="ranking-entry" v-for="(court, index) in sortedCourts">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-teren/${court.id}`"><EditBtn/></Link>
        <div class="name helvetica text-align-center"><Link prefetch="false" :href="`/tereni/${court.uri}`">{{court.name}}</Link></div>
        <div class="info two">
          <div class="info-wrapp">
            <div class="sup">mečevi</div>
            <div class="text">{{ court.matches_number }}</div>
          </div>
          <div class="info-wrapp">
            <div class="sup">teniseri</div>
            <div class="text">{{ utl.formatAsThousands(court.player_number) }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<style scoped>
/* Skeleton loading styles */
.skeleton-wrapper {
    pointer-events: none;
}

/* Skeleton Loading Styles */
.skeleton-item {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
}

.skeleton {
    background-size: 200% 100%;
    animation: loading 1.5s infinite;
    border-radius: 4px;
    height: 16px;
    margin: 2px 0;
}

.skeleton-text {
    height: 16px;
}

.skeleton-text.small {
    height: 14px;
    width: 40%;
    margin: 0 auto;
}

.skeleton-text.medium {
    height: 16px;
    width: 60%;
    margin: 0 auto;
}

.ranking-entry.skeleton {
    opacity: 0.7;
    pointer-events: none;
}

.ranking-entry.skeleton .skeleton-item {
    color: transparent;
}

.ranking-entry.skeleton .rank {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ranking-entry.skeleton .name {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ranking-entry.skeleton .elo,
.ranking-entry.skeleton .total-matches {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ranking-entry.skeleton .info .text {
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes loading {
    0% {
        background-position: 200% 0;
    }
    100% {
        background-position: -200% 0;
    }
}

.sortable {
    cursor: pointer;
    user-select: none;
    &::before {
        content: '▼';
        font-size: 10px;
        margin-right: 4px;
        visibility: hidden;
    }
    &::after {
        content: '▼';
        font-size: 10px;
        margin-left: 4px;
        visibility: hidden;
    }
    &.name::before {
        content: none;
    }
    &:hover {
        color: #00aeef;
    }
    &.active {
        color: #ec008c;
        &::after {
            visibility: visible;
            content: '▼';
        }
        &.asc::after {
            content: '▲';
        }
    }
}

/* Mobile skeleton adjustments */
@media (max-width: 1200px) {
    .ranking-entry.skeleton .name {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        padding: 4px 0;
    }

    .skeleton-text {
        height: 14px;
    }
}

/* .mobile-sort-filter {
    display: none;
    padding: 0 20px;
    max-width: 400px;
    margin: 20px auto 50px;

    & + .ranking-entry {
        border-top: 2px solid #e2e0e1;
    }
}

@media only screen and (max-width: 1200px) {
    .mobile-sort-filter {
        display: block;
    }
} */
</style>
