<script setup>
import {useForm, usePage} from '@inertiajs/vue3'
import {onMounted, reactive} from 'vue';
import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import axios from 'axios';
import bus from 'vue3-eventbus';
import Dropdown from '../components/Dropdown.vue';
import opstine from '../../assets/opstine.json';

const props = defineProps({uri: String, courts: Array});

const page = usePage();
const league = ref({});
const focusInput = ref(null);

onMounted(() => {
    page.props['title'] = `Izmeni ligu`;
    axios.get(`/liga/${props.uri}`).then((response) => {
       console.log(response.data)
        form.id = response.data.id;
        form.name = response.data.name;
        form.location = response.data.county;
        form.date_begin = response.data.date_begin;
        form.date_end = response.data.date_end;
        form.link = response.data.link;
        form.court = response.data.court;
        league.value = response.data;
        bus.emit('loading', false);
        focusInput.value.focus();
    }).catch((error) => {
        console.error('Error fetching league:', error);
    });
});

const handleTemp = (mode) => {
  if(!form[mode] || form[mode] === ''){
    form.errors[mode] = 'Ovo polje je obavezno';
  }
  else{
    form.errors[mode] = '';
  }
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

const form = useForm({
    id: null,
    name: null,
    date_begin: null,
    date_end: null,
    name: null,
    location: null,
    link: null,
    court: null,
});

const formState = reactive({
    submitted: false,
    success: false,
});
const deleteLeague = () =>{
    if(confirm('Da li ste sigurni da želite da obrišete ovu ligu?')){
        form.post(`/obrisi-ligu`,{
            onSuccess: () => {
                location.href = '/lige-turniri';
            },
            onError: (errors) => {
                formState.submitted = false;
            },
        });
    }
}
const submit = () =>{

  formState.submitted = true;
  form.name.trim();
  if(form.location)
    form.location.trim();

    form.post(`/izmeni-ligu/${props.uri}`,{
        onSuccess: (response) => {
          form.reset();
          formState.submitted = false;
          formState.success = true;
        },
        onError: (errors) => {
          formState.submitted = false;
          console.error('Error updating league:', errors);
        },
    });
}

const handleInputs = (event,isDate = false) => {
  if(isDate) return form.errors['date'] = '';

  if (event.target.value && event.target.value.trim() !== '') {
    form.errors[event.target.id] = '';
  } else {
    form.errors[event.target.id] = 'Ovo polje je obavezno';
  }

}

</script>
<template>
   <Head title="Izmeni ligu -" />
    <div class="static-wrapper">
    <h1 id="title" :class="{'hide': formState.success}">izmeni ligu</h1>
    <form id="form" @submit.prevent="submit">

      <div class="form-section">
        <div class="form-row">
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('winner')">
            <label for="winner-fname" class="input-label">
              Ime<span class="required">*</span>
            </label>
            <input ref="focusInput" v-model="form.name" @input="handleInputs($event)" :class="{'invalid': form.errors.first_name}" :disabled="formState.submitted" id="first_name" type="text">
            <p class="error-message">{{ form.errors.first_name }}</p>
          </div>
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('loser')">
            <label for="winner-fname" class="input-label">
              Opstina<span class="required">*</span>
            </label>
            <Dropdown
              v-if="form.location"
              label="name"
              :options="opstine.data"
              v-model="form.location"
              :type="'array'"
              :class="{'invalid': form.errors.location}"
              :shouldReset="formState.shouldReset"
            ></Dropdown>
            <p class="error-message">{{ form.errors.last_name }}</p>
          </div>
        </div>
      </div>


      <div class="form-section">
        <div class="form-row">
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('winner')">
            <label for="winner-fname" class="input-label">
              Organizator (link)
            </label>
            <input v-model="form.link" @input="handleInputs($event)" :class="{'invalid': form.errors.link}" :disabled="formState.submitted" id="link" type="text">
            <p class="error-message">{{ form.errors.link }}</p>
          </div>
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('loser')">
            <label for="winner-fname" class="input-label">
              Teren
            </label>
            <Dropdown
              v-if="form.court"
              label="name"
              :options="courts"
              v-model="form.court"
              :class="{'invalid': form.errors.court}"
              :shouldReset="formState.shouldReset"
            ></Dropdown>
            <p class="error-message">{{ form.errors.court }}</p>
          </div>
        </div>
      </div>
       <div class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label for="full-score" class="input-label">
              Datum početka
            </label>
            <datepicker
              :enable-time-picker="false"
              :format="formatDate"
              :preview-format="formatDate"
              @update:model-value="handleInputs($event,true)"
              @closed="handleTemp('date')"
              id="date"
              v-model="form.date_begin"
              :class="{'invalid': form.errors.date}"
              :clearable="false"
              :year-range="[new Date().getFullYear()-1, new Date().getFullYear()]"
              cancel-text="Otkaži"
              select-text="Potvrdi"
              :disabled="formState.submitted"
              :day-names="['pon', 'uto', 'sre', 'čet', 'pet', 'sub', 'ned']"
            ></datepicker>
            <p class="error-message">{{ form.errors.club }}</p>
          </div>
          <div class="form-group">
            <label for="games" class="input-label">
              Datum završetka
            </label>
            <datepicker
              :enable-time-picker="false"
              :format="formatDate"
              :preview-format="formatDate"
              @update:model-value="handleInputs($event,true)"
              @closed="handleTemp('date')"
              id="date"
              v-model="form.date_end"
              :class="{'invalid': form.errors.date}"
              :clearable="false"
              :year-range="[new Date().getFullYear()-1, new Date().getFullYear()]"
              cancel-text="Otkaži"
              select-text="Potvrdi"
              :disabled="formState.submitted"
              :day-names="['pon', 'uto', 'sre', 'čet', 'pet', 'sub', 'ned']"
            ></datepicker>
            <p class="error-message">{{ form.errors.date_begin }}</p>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-row">
          <button id="submit">
            <span id="add-btn">izmeni</span>
          </button>
        </div>
      </div>

    </form>
    <button @click.prevent="deleteLeague()" class="delete">obriši</button>
  </div>
</template>
