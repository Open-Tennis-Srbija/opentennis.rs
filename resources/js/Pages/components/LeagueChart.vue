<script setup>
import axios from 'axios';
import { onBeforeMount, defineAsyncComponent, onMounted } from 'vue';
import { reactive } from 'vue';
import { computed } from 'vue';
import utils from '../../utils';

const VueApexCharts = defineAsyncComponent(() => import('vue3-apexcharts'));


const data = reactive({
    leagueData: {} 
});

onMounted(()=>{
    axios.get(`/get-league-chart`).then((response) => {
        data.leagueData = response.data;
        console.log('League data:', data.leagueData);
    }).catch((error) => {
        console.error('Error fetching league data:', error);
    });
})
const formatDate = (d) => {
    let date =  new Date(d)
    let days = ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'];
    let months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];
    return days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

const points = computed(() => {

    if(data.leagueData.points){
        let array = []

        data.leagueData.points.forEach(entry => {
            array.push({
                x: formatDate(entry.date),
                y: entry.points,
            })
        });
        return [{
            data: array,
            name: 'Poeni',
            title: {
              text: 'Poeni',
              align: 'center'
            },
        }]
    }
    else{
        return [{data: []}]
    }
})

const players = computed(() => {

    if(data.leagueData.players){
        let array = []

        data.leagueData.players.forEach(entry => {
            array.push({
                x: formatDate(entry.date),
                y: entry.players,
            })
        });
        return [{
            data: array,
            name: 'Teniseri',
        }]
    }
    else{
        return [{data: []}]
    }
})

const matches = computed(() => {

if(data.leagueData.matches){
    let array = []

    data.leagueData.matches.forEach(entry => {
        array.push({
            x: formatDate(entry.date),
            y: entry.matches,
        })
    });
    return [{
        data: array,
        name: 'Mečevi',
    }]
}
else{
    return [{data: []}]
}
})





const chartOptions = {
    chart: {
        id: 'fb',
        group: 'social',
        type: 'line',



        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        },
        min: 0,
        max: data.leagueData.maxPoints || undefined,
        dataLabels: {
              enabled: true,
            },
    },
    colors: ['#ec008c'],
    noData: {
        text: 'grafikon se učitava',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 7,
        style: {
            color: "#8f8f8f",
            fontSize: '15px',
            fontFamily: 'Helvetica Neue',
            zIndex: 5
        }
    },
    yaxis:{
        min: 0,
        labels:{
            formatter: function (value) {
                return utils.formatAsThousands(value);
            }
        }
    },
    xaxis:{

        labels:{
            show: false
        },
        axisTicks: {
            show: true,
        },
    
    },
    title:{
        text: 'poeni',
        align: 'center',
        style:{
            fontSize: '17px',
            color: '#8f8f8f',
            fontFamily: 'Arial',
            fontWeight: 'normal'
        }
    },
    legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
    },
}

const maxRank = reactive(()=>{
    return data.leagueData.maxRank || 10
})


const chartOptionsLine2 = {
    chart: {
        id: 'tw',
        group: 'social',
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        },
    },
    yaxis:{
        min: 2,
        tickAmount: (maxRank.value ? maxRank.value - 1 : 8), // e.g., 10-2=8 steps
        forceNiceScale: true,
        labels:{
            formatter: function (value) {
                return utils.formatAsThousands(value);
            }
        }
    },
    xaxis:{

        labels:{
            show: false
        },

    },
    colors: ['#00aeef'],
    noData: {
        text: 'grafikon se učitava',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 7,
        style: {
            color: "#8f8f8f",
            fontSize: '15px',
            fontFamily: 'Helvetica Neue',
            zIndex: 5
        }
    },
    title:{
        text: 'teniseri',
        align: 'center',
        style:{
            fontSize: '17px',
            color: '#8f8f8f',
            fontFamily: 'Arial',
            fontWeight: 'normal'
        }
    },
}

const chartOptionsLine3 = {
    chart: {
        id: 'tw',
        group: 'social',
        type: 'line',
        zoom: {
            enabled: false
        },
        toolbar: {
            show: false
        },
    },
    yaxis:{
        min: 1,
        labels:{
            formatter: function (value) {
                return utils.formatAsThousands(value);
            }
        }
    },
    xaxis:{

        labels:{
            show: false
        },

    },
    colors: ['#8f8f8f'],
    noData: {
        text: 'grafikon se učitava',
        align: 'center',
        verticalAlign: 'middle',
        offsetX: 0,
        offsetY: 7,
        style: {
            color: "#8f8f8f",
            fontSize: '15px',
            fontFamily: 'Helvetica Neue',
            zIndex: 5
        }
    },
    title:{
        text: 'mečevi',
        align: 'center',
        style:{
            fontSize: '17px',
            color: '#8f8f8f',
            fontFamily: 'Arial',
            fontWeight: 'normal'
        }
    },
}

</script>
<template>
    <div id="wrapper">
        <div id="chart-line">
            <VueApexCharts type="line" height="300" :options="chartOptions" :series="points" />
        </div>
        <div id="chart-line2">
            <VueApexCharts type="line" height="300" :options="chartOptionsLine2" :series="players" />
        </div>
        <div id="chart-line3">
            <VueApexCharts type="line" height="300" :options="chartOptionsLine3" :series="matches" />
        </div>
    </div>
</template>
