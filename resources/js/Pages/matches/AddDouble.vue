<script setup>
import {useForm} from '@inertiajs/vue3'
import {reactive,onMounted, defineAsyncComponent, computed, onUpdated, onBeforeMount} from 'vue';
import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'
import opstine from '@assets/regions_serbia.json';
import bus from 'vue3-eventbus';
import { nextTick } from 'vue';

const props = defineProps({players: Array,courts: Array, leagues: Array, court_id: Number, league_id: Number});

const emit = defineEmits(['submitted','success']);

const form = useForm({
    winner1: null,
    winner2: null,
    loser1: null,
    loser2: null,
    set_score: '',
    game_score: '',
    court: null,
    date: new Date(),
    location: 'Beograd',
    league: {id: 1, name: 'sparing'},
});


const formState = reactive({
    submitted: false,
    success: false,
    shouldReset: false,
});
onBeforeMount(() => {
    props.courts.forEach(element => {
      if (element.id == props.court_id) {
        form.court = element;
      }
    });
    props.leagues.forEach(element => {
      if (element.id == props.league_id) {
        form.league = element;
      }
    });
});
onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
})
onUpdated(()=>{
bus.emit('loading', false);
})


const submit = () =>{

  if(!validateNames()) return;

  formState.submitted = true;
  if(form.winner1){
    form.winner1.name.trim();
    form.winner1.name = form.winner1.name.replace(/  /g, ' ');
  }
  if(form.winner2){
    form.winner2.name.trim();
    form.winner2.name = form.winner2.name.replace(/  /g, ' ');
  }
  if(form.loser1){
    form.loser1.name.trim();
    form.loser1.name = form.loser1.name.replace(/  /g, ' ');
  }
  if(form.loser2){
    form.loser2.name.trim();
    form.loser2.name = form.loser2.name.replace(/  /g, ' ');
  }

  form.set_score.trim();
  form.set_score = form.set_score.replace(/-/g, ':');
  form.game_score.trim();
  form.game_score = form.game_score.replace(/ /g, ',');
  form.game_score = form.game_score.replace(/,,/g, ',');
  form.game_score = form.game_score.replace(/-/g, ':');

  form.location.trim();

    form.post('/dodaj-dubl',{
        onSuccess: (data) => {
          formState.shouldReset = true;
            // Update the match URI from the response
          if (data.props && data.props.match_uri) {
            matchUri.value = data.props.match_uri;
            // Emit the match URI to parent component
            emit('matchCreated', data.props.match_uri);
          }
          
          emit('success');
          form.reset('game_score');
          form.reset('set_score');
          form.winner1 = null;
          form.winner2 = null;
          form.loser1 = null;
          form.loser2 = null;
          formState.submitted = false;
          formState.success = true;
          console.log(data)
          setTimeout(()=>{
            formState.shouldReset = false;
          }, 1000);
          updateDropDowns(data)
          form.location = 'Beograd';
        },
        onError: (errors) => {
          formState.submitted = false;
          setTimeout(()=>{
            formState.shouldReset = false;
          }, 1000);
        },
    });
}

  const updateDropDowns = (data =>{
    props.players = data.props.players;
    props.courts = data.props.courts;
    props.leagues = data.props.leagues;
  })
const validateNames = (()=>{
  let check = true;
  if(!form.winner1){
    form.errors.winner1 = 'ovo polje je obavezno';
    check = false;
  }

  if(!form.winner2){
    form.errors.winner2 = 'ovo polje je obavezno';
    check = false;
  }
  if(!form.loser1){
    form.errors.loser1 = 'ovo polje je obavezno';
    check = false;
  }
  if(!form.loser2){
    form.errors.loser2 = 'ovo polje je obavezno';
    check = false;
  }

  if(check){
  if(!form.winner1.name || form.winner1.name === ''){
    form.errors.winner = 'ovo polje je obavezno';
    check = false;
  }
  if(!form.winner2.name || form.winner2.name === ''){
    form.errors.winner2 = 'ovo polje je obavezno';
    check = false;
  }

  if(!form.loser1 || form.loser1 === ''){
    form.errors.loser1 = 'ovo polje je obavezno';
    check = false;
  }
  if(!form.loser2 || form.loser2 === ''){
    form.errors.loser2 = 'ovo polje je obavezno';
    check = false;
  }

  if(!check) return check;


  form.winner1.name.trim();
  if(form.winner1.name.split(' ').length < 2){
    form.errors.winner1 = 'molim vas unesite i ime i prezime';
    check =  false;
  }

  form.winner2.name.trim();
  if(form.winner2.name.split(' ').length < 2){
    form.errors.winner2 = 'molim vas unesite i ime i prezime';
    check =  false;
  }
  form.loser1.name.trim();
  if(form.loser1.name.split(' ').length < 2){
    form.errors.loser1 = 'molim vas unesite i ime i prezime';
    check =  false;
  }
  form.loser2.name.trim();
  if(form.loser2.name.split(' ').length < 2){
    form.errors.loser2 = 'molim vas unesite i ime i prezime';
    check =  false;
  }

  return check;
 }
})
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


const handleTemp = (mode) => {
  if(!form[mode] || form[mode] === ''){
    form.errors[mode] = 'Ovo polje je obavezno';
  }
  else{
    form.errors[mode] = '';
  }
}


const handleInputs = (event,isDate = false) => {
  if(isDate) return form.errors['date'] = '';

  if(event.target.value && event.target.value !== ''){
      form.errors[event.target.id] = '';
  }
  else{
    form.errors[event.target.id] = 'Ovo polje je obavezno';
  }

}

</script>
<template>
    <form id="form" @submit.prevent="submit" :class="{'hide': formState.success}">

      <div class="form-section">
        <h2>Teniseri</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="winner-fname" class="input-label">
              Pobednici (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span>
            </label>
            <div class="field-group">
              <dropdown
                 :minWidth="'271px'"
                 :autofocus="true"
                 label="name"
                 :options="props.players"
                 :disabledOptions="[form.winner2,form.loser1,form.loser2]"
                 v-model="form.winner1"
                 :class="{'invalid': form.errors.winner1}"
                 :shouldReset="formState.shouldReset"
               />

              <dropdown
                 label="name"
                 :minWidth="'271px'"
                 :options="props.players"
                 :disabledOptions="[form.winner1,form.loser1,form.loser2]"
                 v-model="form.winner2"
                 :class="{'invalid': form.errors.winner2}"
                 :shouldReset="formState.shouldReset"
               />
            </div>
            <p class="error-message">{{ form.errors.winners }}</p>
          </div>
          <div class="form-group">
            <label for="winner-fname" class="input-label">
              Gubitnici (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span>
            </label>
            <div class="field-group">
              <dropdown
                 label="name"
                 :minWidth="'271px'"
                 :options="props.players"
                 :disabledOptions="[form.loser2, form.winner1, form.winner2]"
                 v-model="form.loser1"
                 :class="{'invalid': form.errors.loser1}"
                 :shouldReset="formState.shouldReset"
               />

              <dropdown
                 label="name"
                 :options="props.players"
                 :minWidth="'271px'"
                 :disabledOptions="[form.loser1, form.winner1, form.winner2]"
                 v-model="form.loser2"
                 :class="{'invalid': form.errors.loser2}"
                 :shouldReset="formState.shouldReset"
               />
            </div>
            <p class="error-message">{{ form.errors.losers }}</p>
          </div>
        </div>
      </div>

      
       <div class="form-section">
        <h2>Rezultat</h2>
        <div class="form-row three">
          <div class="form-group">
            <label for="full-score" class="input-label">
                Konačni rezultat <br>(2:0 u slučaju setova ili 9:4 u slučaju gemova) <span class="required">*</span>
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
          <div class="form-group">
            <label for="winner-fname" class="input-label">
              Sparing, liga ili turnir
            </label>
            <Dropdown
              label="name"
              :options="[{ id: 1, name: 'sparing' },{ id: null, name: 'dropdown-spacer' }, ...props.leagues]"
              v-model="form.league"
              :class="{'invalid': form.errors.league}"
              :shouldReset="formState.shouldReset"
            />
            <p class="error-message">{{ form.errors.league }}</p>
          </div>

        </div>
      </div>

      <div class="form-section">
        <h2>Vreme i lokacija</h2>
        <div class="form-row three">
          <div class="form-group" @focsout="handleTemp('date')">
            <label for="date" class="input-label">
              Datum (godinu dana unazad) <span class="required">*</span>
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
            <label for="winner-fname" class="input-label">
              Opština (ili inostranstvo na dnu) <span class="required">*</span>
            </label>
            <Dropdown
              label="name"
              :options="opstine.data"
              :type="'array'"
              v-model="form.location"
              :class="{'invalid': form.errors.location}"
            />
            <p class="error-message">{{ form.errors.location }}</p>
          </div>
          <div class="form-group">
            <label for="place" class="input-label">
              Teniski teren ili klub
            </label>
            <Dropdown
              label="name"
              :options="props.courts"
              v-model="form.court"
              :class="{'invalid': form.errors.court}"
              :shouldReset="formState.shouldReset"
            />
            <p class="error-message">{{ form.errors.court }}</p>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-row">
        <button id="submit" :class="{'red': formState.submitted}">
            <span id="add-btn" :class="{'hide': formState.submitted}">Dodaj</span>
            <span id="loader-submit" :class="{'show': formState.submitted}" class="loader"></span>
          </button>
        </div>
      </div>

    </form>
</template>
