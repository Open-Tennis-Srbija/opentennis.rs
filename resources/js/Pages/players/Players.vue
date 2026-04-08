<script setup>
import { ref, onMounted, watch } from 'vue';
import utils from '../../utils';
import EditBtn from '@components/EditIcon.vue';
import Dropdown from '@components/Dropdown.vue';
import axios from 'axios';
import { bus } from "vue3-eventbus";
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const players = ref([]);
const isLoading = ref(true); // Add loading state
const utl = utils;

const sortKey = ref('total_matches');
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
    { id: 'total_matches_desc', name: 'mečevi ▼', key: 'total_matches', dir: 'desc' },
    { id: 'total_matches_asc', name: 'mečevi ▲', key: 'total_matches', dir: 'asc' },
    { id: 'name_asc', name: 'teniser A-Ž', key: 'name', dir: 'asc' },
    { id: 'name_desc', name: 'teniser Ž-A', key: 'name', dir: 'desc' },
    { id: 'category_desc', name: 'kategorija ▼', key: 'category', dir: 'desc' },
    { id: 'category_asc', name: 'kategorija ▲', key: 'category', dir: 'asc' },
    { id: 'wins_desc', name: 'pobede ▼', key: 'wins', dir: 'desc' },
    { id: 'wins_asc', name: 'pobede ▲', key: 'wins', dir: 'asc' },
    { id: 'loses_desc', name: 'gubitci ▼', key: 'loses', dir: 'desc' },
    { id: 'loses_asc', name: 'gubitci ▲', key: 'loses', dir: 'asc' },
    { id: 'win_precentage_desc', name: '% pobeda ▼', key: 'win_precentage', dir: 'desc' },
    { id: 'win_precentage_asc', name: '% pobeda ▲', key: 'win_precentage', dir: 'asc' },
];

const selectedSort = ref({ ...sortOptions[0] });

watch(selectedSort, (val) => {
    const option = sortOptions.find(o => o.id === val.id);
    if (option) {
        sortKey.value = option.key;
        sortDir.value = option.dir;
    }
}, { deep: true });

const sortedPlayers = computed(() => {
    return [...players.value].sort((a, b) => {
        let aVal = a[sortKey.value];
        let bVal = b[sortKey.value];
        if (sortKey.value === 'name') {
            aVal = (aVal || '').toLowerCase();
            bVal = (bVal || '').toLowerCase();
            return sortDir.value === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
        }
        if (sortKey.value === 'category') {
            const aNum = (aVal === '?' || aVal === '' || aVal == null) ? 0 : Number(aVal);
            const bNum = (bVal === '?' || bVal === '' || bVal == null) ? 0 : Number(bVal);
            return sortDir.value === 'asc' ? aNum - bNum : bNum - aNum;
        }
        return sortDir.value === 'asc' ? aVal - bVal : bVal - aVal;
    });
});

const categoryColorsAll = {
  1: '#8dc73f',
  2: '#38b64b',
  3: '#00a99c',
  4: '#01aef0',
  5: '#0072bb',
  6: '#92278f',
  7: '#eb008b',
  8: '#ee1d23',
  9: '#f36621',
  10: '#f7941d',
  '?': '#a1a1a1',
}

const scrollPos = ref(0);

onMounted(() => {
    axios.get('/get-players').then((response) => {
        players.value = response.data;
        isLoading.value = false; // Set loading to false when data is loaded
        bus.emit('loading',false)
    }).catch((error) => {
        console.error('Error fetching players:', error);
        isLoading.value = false; // Set loading to false on error as well
        bus.emit('loading', false);
    });
     window.addEventListener('pageshow', () => {
        bus.emit('loading', false);
    });

    bus.on('scroll', (top) => {
        handleScroll(top);
    });

});
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

const hasSpecialChars = (name) => {
    return /[^\u0000-\u024F\u1E00-\u1EFF]/.test(name);
};

const playersText = computed(() => {
   //check last digit of headerStats.totalMatches
   const lastDigit = headerStats.value.totalPlayers % 10;
   if(headerStats.value.totalPlayers === 0){
       return "Teniseri";
   }
   else if (lastDigit === 1) {
       return utils.formatAsThousands(headerStats.value.totalPlayers) + " Teniser";
   } else {
       return utils.formatAsThousands(headerStats.value.totalPlayers) + " Tenisera";
   }
});

</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Teniseri -" />
  <h1 class="list-title players">{{playersText}}</h1>
  <div class="rankings-wrapper mobile-mb-300">
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="skeleton-wrapper">
      <div id="desktop">
        <div class="rankings-header"  :style="{ top: 200 - topOffset + 'px' }">
          <div class="name">teniser</div>
          <div class="place">kategorija</div>
          <div class="total-matches">mečevi</div>
          <div class="wins">pobede</div>
          <div class="loses">gubitci</div>
          <div class="win-precent">% pobeda</div>
        </div>
        <div v-for="n in 10" :key="`desktop-skeleton-${n}`" class="ranking-entry skeleton" :style="{marginTop: n === 1 ? 25 - topOffset/3 + 'px' : '0'}">
          <div class="name helvetica">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="place">
            <span class="skeleton-item skeleton-square"></span>
          </div>
          <div class="total-matches">
            <div class="skeleton-item" style="height: 14px; width: 40px;"></div>
          </div>
          <div class="wins">
            <div class="skeleton-item" style="height: 14px; width: 40px;"></div>
          </div>
          <div class="loses">
            <div class="skeleton-item" style="height: 14px; width: 40px;"></div>
          </div>
          <div class="win-precent">
            <div class="skeleton-item" style="height: 14px; width: 40px;"></div>
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
        <div v-for="n in 10" :key="`mobile-skeleton-${n}`" class="ranking-entry skeleton">
          <div class="name helvetica">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="place">
            <span class="skeleton-item skeleton-square"></span>
          </div>
          <div class="info" style="grid-template-columns: 1fr;">
            <div class="info-wrapp" style="gap: 0;">
              <div class="sup">mečevi (%, p, g)</div>
              <div class="text">
                <div class="skeleton-item skeleton-text medium"></div>
              </div>
              <div class="sub">
                <div class="skeleton-item" style="height: 12px; width: 80px; margin: 0 auto;"></div>
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
          <div class="name sortable" :class="{ active: sortKey === 'name', asc: sortKey === 'name' && sortDir === 'asc' }" @click="toggleSort('name')">teniser</div>
          <div class="place sortable" :class="{ active: sortKey === 'category', asc: sortKey === 'category' && sortDir === 'asc' }" @click="toggleSort('category')">kategorija</div>
          <div class="total-matches sortable" :class="{ active: sortKey === 'total_matches', asc: sortKey === 'total_matches' && sortDir === 'asc' }" @click="toggleSort('total_matches')">mečevi</div>
          <div class="wins sortable" :class="{ active: sortKey === 'wins', asc: sortKey === 'wins' && sortDir === 'asc' }" @click="toggleSort('wins')">pobede</div>
          <div class="loses sortable" :class="{ active: sortKey === 'loses', asc: sortKey === 'loses' && sortDir === 'asc' }" @click="toggleSort('loses')">gubitci</div>
          <div class="win-precent sortable" :class="{ active: sortKey === 'win_precentage', asc: sortKey === 'win_precentage' && sortDir === 'asc' }" @click="toggleSort('win_precentage')">% pobeda</div>
        </div>
        <div class="ranking-entry" v-for="(player, index) in sortedPlayers" :style="{marginTop: index === 0 ? 25 - topOffset/3 + 'px' : '0'}">
                  <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/${player.uri}/izmeni/`"><EditBtn/></Link>
          <div class="name helvetica" :class="{ 'no-uppercase': hasSpecialChars(player.name) }"><Link target="_blank" class="blue" prefetch="false" :href="`/${player.uri}`">{{player.name}}</Link></div>
          <div class="place"
          ><span class="diamond" :style="{border: `1px solid ${categoryColorsAll[player.category] || 'transparent'}` }">
            <span class="number" :class="{'category-unknown': player.category == '?', [`category-${player.category}`]: player.category != '?'}">{{player.category}}</span>
          </span>
          </div>
          <div class="total-matches">{{player.total_matches}}</div>
          <div class="wins">{{player.wins}}</div>
          <div class="loses">{{player.loses}}</div>
          <div class="win-precent">{{player.win_precentage}}%</div>
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
        <div class="ranking-entry" v-for="(player, index) in sortedPlayers">
                  <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/${player.uri}/izmeni/`"><EditBtn/></Link>
          <div class="name helvetica" :class="{ 'no-uppercase': hasSpecialChars(player.name) }"><Link class="blue" prefetch="false" :href="`/${player.uri}`">{{player.name}}</Link></div>
          <div class="place">
            <span class="diamond" :style="{border: `1px solid ${categoryColorsAll[player.category] || 'transparent'}` }">
              <span class="number" :class="{'unknown': player.category == '?'}">{{player.category}}</span>
            </span>
          </div>
          <div class="info" style="grid-template-columns: 1fr;">
            <div class="info-wrapp" style="gap: 0;">
              <div class="sup">mečevi (%, p, g)</div>
              <div class="text" style="margin-top: 7px; margin-bottom: 5px;">{{ player.total_matches }}</div>
              <div class="sub">{{ player.win_precentage }} %, {{ player.wins }}, {{ player.loses }}</div>
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
    height: 20px;
    width: 60%;
    margin: 0 auto;
}

.skeleton-square {
    width: 52px;
    height: 52px;
    display: inline-block;
    border-radius: 0;
}

.ranking-entry.skeleton {
    opacity: 0.7;
    pointer-events: none;
}

.ranking-entry.skeleton .skeleton-item {
    color: transparent;
}

.ranking-entry.skeleton .name {
    display: flex;
    justify-content: flex-start;
    align-items: center;
}

.ranking-entry.skeleton .total-matches,
.ranking-entry.skeleton .wins,
.ranking-entry.skeleton .loses,
.ranking-entry.skeleton .win-precent {
    display: flex;
    justify-content: center;
    align-items: center;
}

.ranking-entry.skeleton .place {
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

    .skeleton-square {
        width: 63px;
        height: 63px;
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
