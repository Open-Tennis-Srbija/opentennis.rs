<script setup>
import {useForm, usePage} from '@inertiajs/vue3'
import { onMounted, reactive} from 'vue';
import CircleLoader from '../../../public/LRlCNqLdgl.json';
import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue';

const props = defineProps({players: Array, match: Object});


const page = usePage();

onMounted(() => {
    page.props['title'] = `Izmeni meč`;
});

const form = useForm({
    id: props.match.id,
    winner: props.match.winner,
    loser: props.match.loser,
    set_score: props.match.set_score,
    game_score: props.match.game_score,
    date: props.match.date,
    location: props.match.location,
});
const deleteMatch = () =>{
    if(confirm('Da li ste sigurni da želite da obrišete ovaj meč?')){
        form.post(`/mec/obrisi`,{
            onSuccess: () => {
                location.href = '/mecevi';
            },
            onError: (errors) => {
                formState.submitted = false;
            },
        });
    }
}
const selectedWinner = computed(() => {
  return props.players.find(player => player.id === form.winner.id);
});

const selectedLoser = computed(() => {
  return props.players.find(player => player.id === form.loser.id);
});

const formState = reactive({
    submitted: false,
    success: false,
});

const submit = () =>{

  formState.submitted = true;
  if(form.winner){
    form.winner.name.trim();
    form.winner.name.replace('  ', ' ');
  }
  if(form.loser){
    form.loser.name.trim();
    form.loser.name.replace('  ', ' ');
  }

  form.set_score.trim();
  if(form.game_score){
      form.game_score.trim();
      form.game_score = '('+ form.game_score + ')';
  }
  form.location.trim();

    form.post(`/izmeni`,{
        onSuccess: () => {
          form.reset();
          formState.submitted = false;
          formState.success = true;
        },
        onError: (errors) => {
          formState.submitted = false;
        },
    });
}
const minDate = (date) =>{
  let temp = date;
  temp.setFullYear(temp.getFullYear() - 1);

  return temp;
}
const formatDate = (date) => {
    let days = ['ned', 'pon', 'uto', 'sre', 'čet', 'pet', 'sub'];
    let months = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun', 'jul', 'avg', 'sep', 'okt', 'nov', 'dec'];
    return days[date.getDay()] + ' ' + date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear();
}

const tempPlayers = reactive({
  players: props.players
})

const prepareTemp = () => {
  console.log('focus')
  tempPlayers.players.push({
    id:'temp',
    name:''
  });
}
const handleTemp = (mode) => {
  if(tempPlayers.players[tempPlayers.players.length-1].name === ''){
    tempPlayers.players.pop();
  }
  if(!form[mode] || form[mode] === ''){
    form.errors[mode] = 'Ovo polje je obavezno';
  }
  else{
    form.errors[mode] = '';
  }
}
const checkChange = (event) => {
  if(event.data)
    tempPlayers.players[tempPlayers.players.length-1].name += event.data;
  else{
    tempPlayers.players[tempPlayers.players.length-1].name = tempPlayers.players[tempPlayers.players.length-1].name.slice(0, -1);
  }
}

const handleInputs = (event,isDate = false) => {
  if(isDate) return form.errors['date'] = '';
  
  if(event.data){
      form.errors[event.target.id] = '';
  }
  else{
    form.errors[event.target.id] = 'Ovo polje je obavezno';
  }

}

function generatetempID(base){
  return `${base}-${new Date().getTime()}`;
}
const handlePlayerSelect = (mode, event) => {
  if(form.errors[mode]){
    form.errors[mode] = '';
  }

  let player = event;
  
  if(mode == 'winner'){
    if(player.id == 'temp'){
        player.id = generatetempID('winner');
      }
      form.winner = player;
    }
    else{
      if(player.id == 'temp'){
        player.id = generatetempID('loser');
      }
      form.loser = player;
    }
    
    for( let i = 0; i < tempPlayers.players.length; i++){
      let checkToDel = false;
      
      if(tempPlayers.players[i].id == 'temp')
        checkToDel = true;

      if(!isNaN(player.id)){
        if(isNaN(tempPlayers.players[i].id))
          checkToDel = true;
      }

    else{
      if(isNaN(tempPlayers.players[i].id) && tempPlayers.players[i].id != player.id){
          checkToDel = true;
      }
    }

    if(checkToDel){
      tempPlayers.players.splice(i, 1);
      i--;
    }
    
  }
}
</script>
<template>
    <Head title="Izmeni meč" />
    <div class="static-wrapper">
    <h1 id="title" :class="{'hide': formState.success}">Izmeni meč</h1>
    <h1 id="success" :class="{'show': formState.success}">Meč je uspešno izmenjen</h1>
    <div id="success-links" :class="{'show': formState.success}">
      <Link class="blue" :href="route('matches')">vidi mečeve</Link>
      <Link class="red" :href="route('home')">vidi rang listu</Link>
    </div>
    <form id="form" @submit.prevent="submit" :class="{'hide': formState.success}">

      <div class="form-section">
        <h2>Igrači</h2>
        <div class="form-row">
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('winner')">
            <label for="winner-fname" class="input-label">
              Pobednik<span class="required">*</span>
            </label>
            <vSelect 
              label="name"
              :class="{'invalid': form.errors.winner}"
              :options="props.players"
              :clearable="false"
              :placeholder="form.winner.name"
              :selectOnTab="true"
              @input="checkChange($event)"
              @option:selecting="handlePlayerSelect('winner', $event)"
            />
            <p class="error-message">{{ form.errors.winner }}</p>
          </div>
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('loser')">
            <label for="winner-fname" class="input-label">
              Gubitnik<span class="required">*</span>
            </label>
            <vSelect 
              label="name"
              :class="{'invalid': form.errors.loser}"
              :clearable="false"
              :placeholder="form.loser.name"
              :options="props.players"
              :selectOnTab="true"
              @input="checkChange($event)"
              @option:selecting="handlePlayerSelect('loser', $event)"
            />
            <p class="error-message">{{ form.errors.loser }}</p>
          </div>
        </div>
      </div>

       <div class="form-section">
        <h2>Rezultat</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="full-score" class="input-label">
              Konačni rezultat (primeri: 2:0 u slučaju setova ili 9:4 u slučaju gemova) <span class="required">*</span>
            </label>
            <input v-model="form.set_score" @input="handleInputs($event)" :class="{'invalid': form.errors.set_score}" :disabled="formState.submitted" data-validate="true" id="set_score" type="text">
            <p class="error-message">{{ form.errors.set_score }}</p>
          </div>
          <div class="form-group">
            <label for="games" class="input-label">
              Gemovi (primer: 6:3,7:6,6:1)
            </label>
            <input v-model="form.game_score" @input="handleInputs($event)" :disabled="formState.submitted" id="game_score " type="text">
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Vreme i lokacija</h2>
        <div class="form-row">
          <div class="form-group" @focsout="handleTemp('date')">
            <label for="date" class="input-label">
              Datum (možeš da dodaš meč odigran u zadnjih godinu dana) <span class="required">*</span>
            </label>
            <datepicker 
              :enable-time-picker="false" 
              :format="formatDate"
              :preview-format="formatDate"
              @update:model-value="handleInputs($event,true)"
              @closed="handleTemp('date')"
              id="date"
              v-model="form.date"
              :class="{'invalid': form.errors.date}"
              :min-date="minDate(new Date())"
              :max-date="new Date()"
              :clearable="false"
              :year-range="[new Date().getFullYear()-1, new Date().getFullYear()]"
              cancel-text="Otkaži"
              select-text="Potvrdi"
              :disabled="formState.submitted"
              :day-names="['pon', 'uto', 'sre', 'čet', 'pet', 'sub', 'ned']"
            ></datepicker>
            <p class="error-message">{{ form.errors.date }}</p>
          </div>
          <div class="form-group">
            <label for="place" class="input-label">
              Lokacija tj. teniski teren ili klub <span class="required">*</span>
            </label>
            <input v-model="form.location" @input="handleInputs($event)" :class="{'invalid': form.errors.location}" :disabled="formState.submitted" data-validate="true" id="location" type="text">
            <p class="error-message">{{ form.errors.location }}</p>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-row">
          <button id="submit">
            <span id="add-btn" :class="{'hide': formState.submitted}">Dodaj</span>
            <span id="loader-submit" :class="{'show': formState.submitted}" class="lottie-container"><Lottie :height="150" :animationData="CircleLoader"/></span>
          </button>
        </div>
      </div>

    </form>
    <button @click.prevent="deleteMatch()" class="delete">obriši</button>
  </div>
</template>
