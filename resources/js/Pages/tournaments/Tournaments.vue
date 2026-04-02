<script setup>
import { ref, onMounted, watch, nextTick } from 'vue';
import utils from '../../utils';
import axios from 'axios';
import bus from 'vue3-eventbus';
import EditBtn from '@components/EditIcon.vue';
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { CalendarView } from 'vue-simple-calendar';
import Dropdown from '@components/Dropdown.vue';
import regionsData from '../../assets/regions_serbia.json';
import 'vue-simple-calendar/dist/vue-simple-calendar.css';
import 'vue-simple-calendar/dist/css/default.css';

const utl = utils;

const isClient = ref(false);

const leagues = ref([]);
const allLeagues = ref([]); // Store all leagues for filtering
const series = ref(null);
const selectedSeries = ref([{ id: null, name: 'Sve serije' }]); // Initialize as array with "Sve serije"
const counties = ref(null);
const selectedCounties = ref([{ id: null, name: 'Sve opštine' }]);
const isLoading = ref(true); // Add loading state
const currentDate = ref(new Date()); // For calendar navigation
const selectedMonth = ref({ id: '', name: '', month: 0, year: 0 }); // Initialize with empty object

// Serbian Latin day names
const serbianDayNamesShort = ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'];
const serbianDayNames = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'];
const serbianMonthNames = [
    'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
];

// Generate month options for dropdown
const monthOptions = computed(() => {
  const options = [];
  const currentYear = new Date().getFullYear();
  
  for (let year = currentYear - 1; year <= currentYear + 2; year++) {
    for (let month = 0; month < 12; month++) {
      const monthName = serbianMonthNames[month];
      options.push({
        id: `${year}-${month}`,
        name: `${monthName.toLowerCase()} ${year}`,
        month: month,
        year: year
      });
    }
  }
  return options;
});

const currentView = ref('calendar'); // Default to calendar view

const formatDate = ((start, end) =>{

    let raw_start = new Date(start);
    let raw_end = new Date(end);

    if(raw_start.getFullYear() == raw_end.getFullYear()){
      if(raw_start.getMonth() == raw_end.getMonth()){
        if(raw_start.getFullYear() ==  new Date().getFullYear()) 
          if(raw_start.getDate() == raw_end.getDate())
            return `${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)}`
          else
          return `${utl.getDateDay(start)} ${raw_start.getDate()} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(start)}`
        else
          return `${utl.getDateDay(start)} ${raw_start.getDate()} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(start)} ${raw_end.getFullYear()}`
      }
      else{
        return `${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)} - ${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)} ${raw_end.getFullYear()}`
      }
    }
    else{
      return `${utl.formatDate(start)} - ${utl.formatDate(end)}`
    }
})

const formatDates =((start,end)=>{

    let raw_start = new Date(start);
    let raw_end = new Date(end);

    if(raw_start.getFullYear() == raw_end.getFullYear()){
        if(raw_start.getFullYear() ==  new Date().getFullYear()) 
          if(raw_start.getDate() == raw_end.getDate())
            return [`${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)}`, `${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)}`]
          else
          return [`${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)}`, `${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)}`]
        else
          return [`${utl.getDateDay(start)} ${raw_start.getDate()} ${utl.getDateMonth(start)}`, `${utl.getDateDay(end)} ${raw_end.getDate()} ${utl.getDateMonth(end)} ${raw_end.getFullYear()}`]
    }
    else{
      return [`${utl.formatDate(start)}`, `${utl.formatDate(end)}`]
    }


})
const isInactive = (date_end) => {
  const end = new Date(date_end);
  const now = new Date();
  return end < now.setHours(0,0,0,0);
};



onMounted(() => {
  isClient.value = true;
  bus.emit('clearActive');
  
  // Initialize selectedMonth with current date
  const now = new Date();
  updateSelectedMonth(now);
  
  // Load tournaments
  axios.get('/get-tournaments').then((response) => {
    allLeagues.value = response.data;
    leagues.value = response.data;
    buildCountyOptions();
    isLoading.value = false;
    bus.emit('loading', false);
  }).catch((error) => {
    console.error('Error fetching tournaments:', error);
    isLoading.value = false;
    bus.emit('loading', false);
  });
  
  // Build county options from regions JSON
  const buildCountyOptions = () => {
    counties.value = [
      { id: null, name: 'Sve opštine' },
      { id: null, name: 'dropdown-spacer' },
      ...regionsData.data.map(r => r === 'dropdown-spacer' ? { id: null, name: 'dropdown-spacer' } : { id: r, name: r })
    ];
  };

  // Load series
  axios.get('/api/tournament-series').then((response) => {
    console.log(response.data);
    const allSeriesData = [
      { id: null, name: 'Sve serije' },
      { id: null, name: 'dropdown-spacer' },
      ...response.data,
      { id: null, name: 'dropdown-spacer' },
      { id: 'nezavisni', name: 'Nezavisni' }
    ];
    series.value = allSeriesData;
    
    // Set initial selection to "Sve serije"
    selectedSeries.value = [{ id: null, name: 'Sve serije' }];
  }).catch((error) => {
    console.error('Error fetching series:', error);
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
        return 225;
    } else {
        return scrollPos.value * 2;
    }
});

// Function to generate random widths for more realistic skeleton
const getRandomWidth = () => {
    return Math.floor(Math.random() * (85 - 60 + 1)) + 60; // Random between 60% and 85%
};
const areSameDate = (start, end) => {
    const raw_start = new Date(start);
    const raw_end = new Date(end);
    return raw_start.getDate() === raw_end.getDate() &&
           raw_start.getMonth() === raw_end.getMonth() &&
           raw_start.getFullYear() === raw_end.getFullYear();
}

// Calendar event handlers
const handleEventClick = (calendarItem) => {
    if (calendarItem.url) {
        window.open(calendarItem.url, '_blank');
    }
};

const handleDateClick = (date) => {
    console.log('Date clicked:', date);
};

// Calendar navigation
const goToPreviousMonth = () => {
    const newDate = new Date(currentDate.value);
    newDate.setMonth(newDate.getMonth() - 1);
    currentDate.value = newDate;
    updateSelectedMonth(newDate);
};

const goToNextMonth = () => {
    const newDate = new Date(currentDate.value);
    newDate.setMonth(newDate.getMonth() + 1);
    currentDate.value = newDate;
    updateSelectedMonth(newDate);
};

const goToToday = () => {
    currentDate.value = new Date();
    updateSelectedMonth(new Date());
};

const updateSelectedMonth = (date) => {
  const monthId = `${date.getFullYear()}-${date.getMonth()}`;
  const monthOption = monthOptions.value.find(option => option.id === monthId);
  if (monthOption) {
    // Update properties instead of replacing the object
    selectedMonth.value.id = monthOption.id;
    selectedMonth.value.name = monthOption.name;
    selectedMonth.value.month = monthOption.month;
    selectedMonth.value.year = monthOption.year;
  }
};

// Watch for month selection changes
watch(selectedMonth, (newMonth) => {
  if (newMonth && typeof newMonth === 'object' && newMonth.month !== undefined && newMonth.year !== undefined && newMonth.id && newMonth.id !== 'temp') {
    const newDate = new Date(newMonth.year, newMonth.month, 1);
    currentDate.value = newDate;
  }
}, { deep: true });

// Also watch the ID specifically for more reliable updates
watch(() => selectedMonth.value.id, (newId) => {
  if (newId && newId !== 'temp') {
    const option = monthOptions.value.find(opt => opt.id === newId);
    if (option) {
      const newDate = new Date(option.year, option.month, 1);
      currentDate.value = newDate;
    }
  }
});

// Method to handle month dropdown changes
const onMonthChange = () => {
  if (selectedMonth.value && selectedMonth.value.id && selectedMonth.value.id !== 'temp') {
    const option = monthOptions.value.find(opt => opt.id === selectedMonth.value.id);
    if (option) {
      const newDate = new Date(option.year, option.month, 1);
      currentDate.value = newDate;
    }
  }
};

const getCurrentMonthYear = () => {
    const month = serbianMonthNames[currentDate.value.getMonth()];
    const year = currentDate.value.getFullYear();
    return `${month} ${year}`;
};

// Debug function to see mapped events
const getMappedEvents = () => {
    const mapped = leagues.value.map(league => {
        const textColor = isColorDark(league.color) ? '#ffffff' : '#000000';
        return {
            id: league.uri,
            title: league.name,
            startDate: league.date_start,
            endDate: league.date_end,
            url: `/${league.uri}`,
            classes: ['tournament-event'],
            style: `background-color: ${league.color}; color: ${textColor}; padding-top:11px;`
        };
    });
    console.log('Mapped events:', mapped);
    console.log('Raw leagues:', leagues.value);
    return mapped;
};

// Function to determine if a color is dark enough to require white text
const isColorDark = (hexColor) => {
    if (!hexColor) return false;
    
    // Remove # if present
    const hex = hexColor.replace('#', '');
    
    // Convert hex to RGB
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);  
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate relative luminance using WCAG formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
    
    // Return true if color is dark (luminance < 0.5)
    return luminance < 0.5;
};

const page = usePage();

const headerStats = computed(() => page.props.headerStats);

// Filter leagues based on selected series and counties
const filteredLeagues = computed(() => {
  let result = allLeagues.value;
  
  // Series filter
  if (selectedSeries.value && selectedSeries.value.length > 0) {
    const hasAllSeries = selectedSeries.value.some(s => s.id === null && s.name === 'Sve serije');
    if (!hasAllSeries) {
      const hasNezavisni = selectedSeries.value.some(s => s.id === 'nezavisni');
      const selectedIds = selectedSeries.value
        .filter(s => s.id !== 'nezavisni' && s.name !== 'dropdown-spacer')
        .map(s => s.id);
      
      result = result.filter(league => {
        if (hasNezavisni && (!league.series || league.series === null)) return true;
        if (selectedIds.length > 0 && league.series && selectedIds.includes(league.series.id)) return true;
        return false;
      });
    }
  }
  
  // County filter
  if (selectedCounties.value && selectedCounties.value.length > 0) {
    const hasAllCounties = selectedCounties.value.some(c => c.id === null && c.name === 'Sve opštine');
    if (!hasAllCounties) {
      const selectedCountyIds = selectedCounties.value.map(c => c.id);
      result = result.filter(league => selectedCountyIds.includes(league.county));
    }
  }
  
  return result;
});

// Watch for series selection changes
let isUpdatingSeriesSelection = false;
watch(selectedSeries, (newSelection, oldSelection) => {
  if (isUpdatingSeriesSelection) {
    leagues.value = filteredLeagues.value;
    return;
  }
  
  if (newSelection && newSelection.length > 0) {
    const hasAllSeries = newSelection.some(s => s.id === null && s.name === 'Sve serije');
    const oldHasAllSeries = oldSelection && oldSelection.some(s => s.id === null && s.name === 'Sve serije');
    
    // "Sve serije" was just clicked → keep only "Sve serije"
    if (hasAllSeries && !oldHasAllSeries) {
      isUpdatingSeriesSelection = true;
      selectedSeries.value = [{ id: null, name: 'Sve serije' }];
      nextTick(() => { isUpdatingSeriesSelection = false; });
    }
    // A specific series was clicked while "Sve serije" was active → remove "Sve serije", keep the new item
    else if (hasAllSeries && oldHasAllSeries && newSelection.length > 1) {
      isUpdatingSeriesSelection = true;
      selectedSeries.value = newSelection.filter(s => !(s.id === null && s.name === 'Sve serije'));
      nextTick(() => { isUpdatingSeriesSelection = false; });
    }
  }
  
  leagues.value = filteredLeagues.value;
}, { deep: true });

// Watch for county selection changes
let isUpdatingCountySelection = false;
watch(selectedCounties, (newSelection, oldSelection) => {
  if (isUpdatingCountySelection) {
    leagues.value = filteredLeagues.value;
    return;
  }
  
  if (newSelection && newSelection.length > 0) {
    const hasAll = newSelection.some(c => c.id === null && c.name === 'Sve opštine');
    const oldHasAll = oldSelection && oldSelection.some(c => c.id === null && c.name === 'Sve opštine');
    
    if (hasAll && !oldHasAll) {
      isUpdatingCountySelection = true;
      selectedCounties.value = [{ id: null, name: 'Sve opštine' }];
      nextTick(() => { isUpdatingCountySelection = false; });
    } else if (hasAll && oldHasAll && newSelection.length > 1) {
      isUpdatingCountySelection = true;
      selectedCounties.value = newSelection.filter(c => !(c.id === null && c.name === 'Sve opštine'));
      nextTick(() => { isUpdatingCountySelection = false; });
    }
  }
  
  leagues.value = filteredLeagues.value;
}, { deep: true });

const tournamentsText = computed(() => {
   //check last digit of headerStats.totalTournaments
   const lastDigit = headerStats.value.totalTournaments % 10;
   if(headerStats.value.totalTournaments === 0){
       return "Turniri";
   }
   else if (lastDigit === 1) {
       return utils.formatAsThousands(headerStats.value.totalTournaments) + " Turnir";
   } else {
       return utils.formatAsThousands(headerStats.value.totalTournaments) + " Turnira";
   }
});
</script>
<template>
  <!-- <div class="loader" :class="{'close' : isLoading}">

  </div> -->
  <Head title="Turniri -" />
  <h1 class="list-title">{{ tournamentsText }}</h1>
  <div class="tournament-controls" :class="{ 'hidden-nav': scrollPos > 50 && currentView === 'list' }">
    <div class="control-group">
      <!-- View switcher buttons -->
      <button 
        @click="currentView = 'calendar'" 
        :class="{ active: currentView === 'calendar' }"
        class="view-btn"
      >
        KALENDAR
      </button>
      <button 
        @click="currentView = 'list'" 
        :class="{ active: currentView === 'list' }"
        class="view-btn"
      >
        LISTA
      </button>
    </div>
    
    <!-- Series filter -->
    <div class="series-filter">
      <Dropdown
        v-if="series"
        label="name"
        :options="series"
        v-model="selectedSeries"
        :multiple="true"
      />
    </div>
    
    <!-- County filter -->
    <div class="county-filter">
      <Dropdown
        v-if="counties"
        label="name"
        :options="counties"
        v-model="selectedCounties"
        :multiple="true"
      />
    </div>
    
    <!-- Month navigation -->
    <div :class="{ 'month-navigation': true, 'hidden-nav': currentView !== 'calendar' }">
      <div class="month-dropdown">
        <Dropdown
          v-if="monthOptions.length > 0 && selectedMonth.id"
          label="name"
          :options="monthOptions"
          v-model="selectedMonth"
          :multiple="false"
          @input="onMonthChange"
          @change="onMonthChange"
        />
      </div>
      
      <button @click="goToPreviousMonth" class="nav-arrow-btn">
        <svg class="dropdown-arrow" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(90deg) translateY(2px)">
          <g><polygon points="8 3 5 7 2 3 8 3" /></g>
        </svg>
      </button>
      
      <button @click="goToNextMonth" class="nav-arrow-btn">
        <svg class="dropdown-arrow" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg" style="transform: rotate(-90deg) translateY(2px)">
          <g><polygon points="8 3 5 7 2 3 8 3" /></g>
        </svg>
      </button>
    </div>
  </div>

  <div v-if="currentView === 'list'" class="rankings-wrapper leagues tournament mobile-mb-300">
    <!-- Skeleton Loading State -->
    <div v-if="isLoading" class="skeleton-wrapper">
      <div id="desktop">
        <div class="rankings-header" :style="{ top: 304 - topOffset + 'px' }">
          <div class="spacer"></div>
          <div class="name">turniri</div>
          <div class="wins">poeni</div>
          <div class="total-matches">mečevi</div>
          <div class="loses">teniseri</div>
          <div class="elo">početak - kraj</div>
          <div class="elo">opština</div>
        </div>
        <div v-for="(n, index) in 8" :key="`desktop-skeleton-${n}`" class="ranking-entry skeleton" :style="{marginTop: index === 0 ? 25 - topOffset/3 + 'px' : '0'}">
          <div class="rank">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="name">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="elo league-points">
            <div class="skeleton-item skeleton-text medium"></div>
          </div>
          <div class="total-matches">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="loses">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="wins smaller-font">
            <div class="skeleton-item skeleton-text" style="margin-bottom: 4px; width: 70%;"></div>
            <div class="skeleton-item skeleton-text" style="width: 80%;"></div>
          </div>
          <div class="wins smaller-font">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
        </div>
      </div>
      <div id="mobile">
        <div v-for="n in 8" :key="`mobile-skeleton-${n}`" class="ranking-entry skeleton">
          <div class="rank">
            <div class="skeleton-item skeleton-text small"></div>
          </div>
          <div class="name" style="font-weight: bold; text-align: center;">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="date">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
          <div class="county">
            <div class="skeleton-item skeleton-text" :style="{ width: getRandomWidth() + '%' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actual Content -->
    <div v-else>
      <div id="desktop">
        <div class="rankings-header" :style="{ top: 304 - topOffset + 'px' }">
        <!-- <div class="rankings-header" :style="{top: `${ 50 - topOffset}px`}"> -->
          <div class="spacer"></div>
          <div class="name">turniri</div>
          <div class="wins">poeni</div>
          <div class="total-matches">mečevi</div>
          <div class="loses">teniseri</div>
          <div class="elo">početak - kraj</div>
          <div class="elo">opština</div>
        </div>
        <div v-if="leagues.length" class="ranking-entry" v-for="(league, index) in leagues" :style="{marginTop: index === 0 ? 16 - topOffset/2.4 + 'px' : '0'}" >
        <div class="rank">
            {{ index+1 }}
          </div>
          <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-turnir/${league.uri}`"><EditBtn/></Link>
          <div class="name"><Link prefetch="false" :href="`/${league.uri}`">{{league.name}}</Link><br><span class="series" :style="{'color': league.series?.color || '#8f8f8f'}">{{ league.series?.name || 'nezavistan' }}</span></div>
          <div class="elo league-points" :class="{'unknown': league.points == 0}">{{utl.formatAsThousands(league.points)}}</div>
          <div class="total-matches">{{league.match_number}}</div>
          <div class="loses" :class="{'unknown': league.player_number == 0}">{{league.player_number}}</div>
          <div style="text-align: center; line-height: 1.6;" :class="{'inactive' : isInactive(league.date_end)}" class="wins smaller-font">{{formatDates(league.date_start, league.date_end)[0]}}<template v-if="!areSameDate(league.date_start, league.date_end)"><br>{{formatDates(league.date_start, league.date_end)[1]}}</template></div>
          <div style="text-align:center" class="wins smaller-font" :class="{'unknown': league.county == '?'}">{{league.county}}</div>
        </div>
      </div>
      <div v-if="leagues" id="mobile">
        <div class="ranking-entry" v-for="(league, index) in leagues">
          <div class="rank">
            {{ index + 1 }}
          </div>
          <div class="name" style="font-weight: bold; text-align: center;"><Link prefetch="false" :href="`/${league.uri}`">{{league.name}}</Link>
            <br>
          <span class="series" :style="{'color': league.series?.color || '#8f8f8f'}">{{ league.series?.name || 'nezavistan' }}</span>
          </div>
          <div :class="{'inactive' : isInactive(league.date_end)}" class="date">{{formatDate(league.date_start, league.date_end)}}</div>
          <div class="county" :class="{'unknown': league.county == '?'}">{{league.county}}</div>
          <Link prefetch="false" class="edit-btn" v-if="$page.props.auth.user" :href="`/izmeni-turnir/${league.uri}`"><EditBtn/></Link>

        </div>
      </div>
    </div>
  </div>
  <div v-else-if="currentView === 'calendar'" class="calendar-container">
    <!-- Calendar view content -->
    <div v-if="isLoading" class="calendar-loading">
      Loading calendar...
    </div>
    <CalendarView
      v-else
      :show-date="currentDate"
      :items="getMappedEvents()"
      :display-period-uom="'month'"
      :display-period-count="1"
      :starting-day-of-week="1"
      :day-names="serbianDayNames"
      :locale="'sr-Latn'"
      class="theme-default"
      @click-item="handleEventClick"
      @click-date="handleDateClick"
    >
      <template #day-content="{ day }">
        <div class="custom-day-number"><span class="day-name">{{ serbianDayNamesShort[day.getDay()] }}</span> {{ day.getDate() }} <span class="month-abbr">{{ serbianMonthNames[day.getMonth()].toLowerCase().substring(0, 3) }}</span></div>
      </template>
    </CalendarView>
  </div>
</template>

<style scoped lang="scss">
@use '../../../css/sass/pages/tournaments';
</style>
