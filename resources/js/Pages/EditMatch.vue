<script setup>
import {useForm, usePage} from '@inertiajs/vue3'
import { onMounted, reactive, defineAsyncComponent} from 'vue';
import CircleLoader from '../../../public/LRlCNqLdgl.json';
import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'
import { computed } from 'vue';
import opstine from '../assets/opstine.json';

const props = defineProps({players: Array, match: Object, courts: Array});

const Lottie = defineAsyncComponent(() => import('vue3-lottie'));

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
    court: props.match.court
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


const formState = reactive({
    submitted: false,
    success: false,
    shouldReset: false,
});

const submit = () =>{

  if(!validateNames()) return;

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
      form.game_score.replace(' ', '');
  }
  form.location.trim();

    form.post(`/izmeni`,{
        onSuccess: () => {
          formState.submitted = false;
          formState.success = true;
        },
        onError: (errors) => {
          formState.submitted = false;
        },
    });
}
const validateNames = (()=>{
  let check = true;
  if(!form.winner){
    form.errors.winner = 'ovo polje je obavezno';
    check = false;
  }
  if(!form.loser){
    form.errors.loser = 'ovo polje je obavezno';
    check = false;
  }
  if(check){
  if(!form.winner.name || form.winner.name === ''){
    form.errors.winner = 'ovo polje je obavezno';
    check = false;
  }

  if(!form.loser || form.loser === ''){
    form.errors.loser = 'ovo polje je obavezno';
    check = false;
  }
  if(!check) return check;


  form.winner.name.trim();
  if(form.winner.name.split(' ').length < 2){
    form.errors.winner = 'molim vas unesite i ime i prezime';
    check =  false;
  }

  form.loser.name.trim();
  if(form.loser.name.split(' ').length < 2){
    form.errors.loser = 'molim vas unesite i ime i prezime';
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

const tempPlayers = reactive({
  players: props.players
})


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
        <h2>Teniseri</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="winner-fname" class="input-label">
              Pobednik (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span>
            </label>
           <dropdown
              label="name"
              :options="props.players"
              v-model="form.winner"
              :class="{'invalid': form.errors.winner}"
              :shouldreset="formState.shouldreset"
            />
            <p class="error-message">{{ form.errors.winner }}</p>
          </div>
          <div class="form-group">
            <label for="winner-fname" class="input-label">
              Gubitnik (ime i prezime, odaberi postojeće ili dodaj novo) <span class="required">*</span>
            </label>
             <Dropdown
              label="name"
              :options="props.players"
              v-model="form.loser"
              :class="{'invalid': form.errors.loser}"
              :shouldReset="formState.shouldReset"
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
              Opština <span class="required">*</span>
            </label>
            <Dropdown
              label="name"
              :options="opstine.data"
              :type="'array'"
              v-model="form.location"
              :class="{'invalid': form.errors.location}"
              :shouldReset="formState.shouldReset"
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
          <button id="submit">
            <span id="add-btn" :class="{'hide': formState.submitted}">izmeni</span>
            <span id="loader-submit" :class="{'show': formState.submitted}" class="lottie-container"><Lottie :height="150" :animationData="CircleLoader"/></span>
          </button>
        </div>
      </div>

    </form>
    <button @click.prevent="deleteMatch()" class="delete">obriši</button>
  </div>
</template>
