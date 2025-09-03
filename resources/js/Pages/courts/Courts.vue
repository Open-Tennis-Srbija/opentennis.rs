<script setup>
import { ref, onMounted } from 'vue';
import utils from '../../utils';
import axios from 'axios';
import bus from 'vue3-eventbus';
import EditBtn from '@components/EditIcon.vue';
import { computed } from 'vue';

const utl = utils;

const isClient = ref(false);

const courts = ref([]);
const isLoading = ref(true); // Add loading state

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
    if (scrollPos.value >= 50) {
        return 95;
    } else {
        return scrollPos.value * 2;
    }
});

// Function to generate random widths for more realistic skeleton
const getRandomWidth = () => {
    return Math.floor(Math.random() * (85 - 60 + 1)) + 60; // Random between 60% and 85%
};
</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Tereni -" />
<div class="rankings-wrapper courts-list mobile-mb-300">
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="skeleton-wrapper">
      <div id="desktop">
        <div class="rankings-header" style="top: 90px;">
          <div class="spacer"></div>
          <div class="name">teren</div>
          <div class="spacer"></div>
          <div></div>
          <div class="elo">poeni</div>
          <div class="total-matches">mečevi</div>
          <div class="total-matches">teniseri</div>
          <div class="total-matches">opština</div>
        </div>
        <div v-for="n in 8" :key="`desktop-skeleton-${n}`" class="ranking-entry skeleton" :style="{marginTop: n === 1 ? '25px' : '0'}">
          <div class="rank">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="name helvetica">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="spacer"></div>
          <div></div>
          <div class="elo">
            <div class="skeleton-item skeleton-text medium"></div>
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
        <div v-for="n in 8" :key="`mobile-skeleton-${n}`" class="ranking-entry skeleton">
          <div class="rank">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="name helvetica text-align-center">
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
      <div class="rankings-header" style="top: 90px;">
        <div class="spacer"></div>
        <div class="name">teren</div>
        <div class="spacer"></div>
        <div></div>
        <div class="elo">poeni</div>
        <div class="total-matches">mečevi</div>
        <div class="total-matches">teniseri</div>
        <div class="total-matches">opština</div>
      </div>
      <div class="ranking-entry" v-for="(court, index) in courts" :style="{marginTop: index === 0 ? '25px' : '0'}">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-teren/${court.id}`"><EditBtn/></Link>
        <div class="rank">
          {{ index+1 }}
        </div>
        <div class="name helvetica"><Link prefetch="false" :href="`/tereni/${court.uri}`">{{court.name}}</Link></div>
        <div class="spacer"></div>
        <div></div>
        <div class="elo">{{utl.formatAsThousands(court.points)}}</div>
        <div class="total-matches">{{court.matches_number}}</div>
        <div class="total-matches">{{court.player_number}}</div>
        <div class="total-matches smaller-font" style="text-align: center;">{{court.county}}</div>
      </div>
    </div>

    <div id="mobile">
      <div class="ranking-entry" v-for="(court, index) in courts">
                <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-teren/${court.id}`"><EditBtn/></Link>
        <div class="rank">
          {{ index+1 }}
        </div>
        <div class="name helvetica text-align-center"><Link prefetch="false" :href="`/tereni/${court.uri}`">{{court.name}}</Link></div>
        <div class="info">
          <div class="info-wrapp">
            <div class="sup">poeni</div>
            <div class="text">{{ utl.formatAsThousands(court.points) }}</div>
          </div>
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
}
</style>
