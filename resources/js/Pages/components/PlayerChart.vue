<script setup>
import { onBeforeMount } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { reactive } from 'vue';
import { computed } from 'vue';

const props = defineProps({
    player_id: Number
});

const data = reactive({
    playerData: {}
});

onBeforeMount(() => {
  
    fetchPlayerData()

});

const formatDate = (d) => {
    let date =  new Date(d)
    let days = ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'];
    let months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];
    return days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}
const options = reactive({
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
        max: 1000,
        dataLabels: {
              enabled: true,
            },
        xaxis: {
            categories: []
        },
    },
    colors: ['#008FFB'],
})


const fetchPlayerData = async () => {
    
    await axios.post(route("playerChart"), {
        id: props.player_id
    }).then(res =>{
        console.log(res.data)
        data.playerData = res.data
    }).catch(err => {
        console.log(err)
    })

}
const points = computed(() => {

    if(data.playerData.points){
        let array = []

        data.playerData.points.forEach(entry => {
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

const ranks = computed(() => {

    if(data.playerData.rankings){
        let array = []

        data.playerData.rankings.forEach(entry => {
            array.push({
                x: formatDate(entry.date),
                y: entry.rank,
            })
        });
        return [{
            data: array,
            name: 'Rang',
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
        max: data.playerData.maxPoints || undefined,
        dataLabels: {
              enabled: true,
            },
    },
    colors: ['#c6373d'],
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
    return data.playerData.maxRank || 5
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
        reversed: true,
        min: 1,
        max: maxRank,
    },
    xaxis:{
        
        labels:{
            show: false
        },
        
    },
    colors: ['#0d4075'],
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
        text: 'rang',
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
            <VueApexCharts type="line" height="200" :options="chartOptions" :series="points" />
        </div>
        <div id="chart-line2">
            <VueApexCharts type="line" height="200" :options="chartOptionsLine2" :series="ranks" />
        </div>
    </div>
</template>