<script setup>
import { ref, onMounted, watch } from 'vue';
import utils from '../../utils';
import EditBtn from '@components/EditIcon.vue';
import axios from 'axios';
import { bus } from "vue3-eventbus";
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';

const players = ref([]);
const isLoading = ref(true); // Add loading state
const utl = utils;

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
        <div class="rankings-header"  :style="{ top: 240 - topOffset + 'px' }">
          <div class="spacer"></div>
          <div class="place">kategorija</div>
          <div class="name">teniser</div>
          <div class="elo">poeni</div>
          <div class="total-matches">mečevi</div>
          <div class="wins">pobede</div>
          <div class="loses">gubitci</div>
          <div class="win-precent">% pobeda</div>
        </div>
        <div v-for="n in 10" :key="`desktop-skeleton-${n}`" class="ranking-entry skeleton" :style="{marginTop: index === 0 ? 25 - topOffset/3 + 'px' : '0'}">
          <div class="rank">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="name helvetica">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="spacer"></div>
          <div class="place">
            <span class="skeleton-item skeleton-circle"></span>
            <span class="skeleton-item skeleton-category"></span>
          </div>
          <div class="elo">
            <div class="skeleton-item skeleton-text medium"></div>
          </div>
          <div class="total-matches">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="wins">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="loses">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="win-precent">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
        </div>
      </div>

      <div id="mobile">
        <div v-for="n in 10" :key="`mobile-skeleton-${n}`" class="ranking-entry skeleton">
          <div class="rank">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="name helvetica">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="info">
            <div class="info-wrapp">
              <div class="sup">poeni</div>
              <div class="text">
                <div class="skeleton-item skeleton-text medium"></div>
              </div>
            </div>
            <div class="info-wrapp">
              <div class="sup">% pobede</div>
              <div class="text">
                <div class="skeleton-item skeleton-text small"></div>
              </div>
            </div>
            <div class="info-wrapp">
              <div class="sup">mečevi (p,g)</div>
              <div class="text">
                <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
              </div>
            </div>
          </div>
          <div class="place">
            <span class="skeleton-item skeleton-circle"></span>
            <span class="skeleton-item skeleton-category"></span>
          </div>
        </div>
      </div>
    </div>

    <!-- Actual Content -->
    <div v-else>
      <div id="desktop">
        <div class="rankings-header" :style="{ top: 240 - topOffset + 'px' }">
          <div class="place">rang</div>
          <div class="place">kategorija</div>
          <div class="name">teniser</div>
          <div class="elo">poeni</div>
          <div class="total-matches">mečevi</div>
          <div class="wins">pobede</div>
          <div class="loses">gubitci</div>
          <div class="win-precent">% pobeda</div>
        </div>
        <div class="ranking-entry" v-for="(player, index) in players" :style="{marginTop: index === 0 ? 25 - topOffset/3 + 'px' : '0'}">
                  <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/${player.uri}/izmeni/`"><EditBtn/></Link>
                  <div style="place-self: center;;" class="rank"
                  :class="{'first': player.rank == 1, 'second': player.rank == 2, 'third': player.rank ==3, 'align-left': player.rank > 9}">
                  {{ player.rank}}
                </div>
          <div class="place"
          ><span class="diamond" :style="{border: `1px solid ${categoryColorsAll[player.category] || 'transparent'}` }">
            <span class="number" :class="{'category-unknown': player.category == '?', [`category-${player.category}`]: player.category != '?'}">{{player.category}}</span>
          </span>
          </div>
          <div class="name helvetica"><Link class="blue" prefetch="false" :href="`/${player.uri}`">{{player.name}}</Link></div>
          <div class="elo">{{utl.formatAsThousands(player.points)}}</div>
          <div class="total-matches">{{player.total_matches}}</div>
          <div class="wins">{{player.wins}}</div>
          <div class="loses">{{player.loses}}</div>
          <div class="win-precent">{{player.win_precentage}}%</div>
        </div>
      </div>

      <div id="mobile">
        <div class="ranking-entry" v-for="(player, index) in players">
                  <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/${player.uri}/izmeni/`"><EditBtn/></Link>
          <div class="ranks">
            <div class="rank"
                        :class="{'first': player.rank ==1, 'second': player.rank == 2, 'third': player.rank ==3, 'align-left': player.rank > 9}">
              {{ player.rank }}
            </div>
            <div class="place">
              <span class="diamond" :style="{border: `1px solid ${categoryColorsAll[player.category] || 'transparent'}` }">
                <span class="number" :class="{'unknown': player.category == '?'}">{{player.category}}</span>
              </span>
            </div>
          </div>
          <div class="name helvetica"><Link class="blue" prefetch="false" :href="`/${player.uri}`">{{player.name}}</Link></div>
          <div class="info">
            <div class="info-wrapp">
              <div class="sup">poeni</div>
              <div class="text">{{ utl.formatAsThousands(player.points) }}</div>
            </div>
            <div class="info-wrapp">
              <div class="sup">% pobede</div>
              <div class="text">{{player.win_precentage}}%</div>
            </div>
            <div class="info-wrapp">
              <div class="sup">mečevi (p,g)</div>
              <div class="text">{{ player.total_matches }} ({{ player.wins }},{{ player.loses }})</div>
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

.skeleton-circle {
    width: 15px;
    height: 15px;
    border-radius: 2px;
    transform: rotate(45deg);
    margin-right: 6px;
    display: inline-block;
}

.skeleton-category {
    width: 20px;
    height: 14px;
    display: inline-block;
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
@media (max-width: 768px) {
    .ranking-entry.skeleton .name {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 4px 0;
    }

    .skeleton-text {
        height: 14px;
    }

    .skeleton-circle {
        width: 12px;
        height: 12px;
    }

    .skeleton-category {
        width: 16px;
        height: 12px;
    }
}
</style>
