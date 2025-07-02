
<script setup>
import {useForm, usePage} from '@inertiajs/vue3'
import {nextTick, onMounted, reactive} from 'vue';
import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'
import bus from 'vue3-eventbus';
import Dropdown from '../components/Dropdown.vue';
import opstine from '../../assets/opstine.json';


const page = usePage();

onMounted(async () => {
    page.props['title'] = `Dodaj teren`;
    await nextTick();
    bus.emit('loading', false);
});

const form = useForm({
    id: null,
    name: null,
    link: null,
    phone: null,
    county: null,
    location: null,
    uri: null,
});

const formState = reactive({
    submitted: false,
    success: false,
});

const submit = () =>{

  formState.submitted = true;
  form.name.trim();

    form.post(`/teren/dodaj`,{
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
   <Head title="Dodaj teren -" />
    <div class="static-wrapper">
    <h1 id="title" :class="{'hide': formState.success}">Dodaj teren</h1>
    <form id="form" @submit.prevent="submit">

      <div class="form-section">
        <div class="form-row">
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('winner')">
            <label for="winner-fname" class="input-label">
              Ime<span class="required">*</span>
            </label>
            <input v-model="form.name" @input="handleInputs($event)" :class="{'invalid': form.errors.name}" :disabled="formState.submitted" id="name" type="text">
            <p class="error-message">{{ form.errors.name }}</p>
          </div>
 <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('winner')">
            <label for="winner-fname" class="input-label">
              URI (srpskatenisliga.rs/tereni/URI)<span class="required">*</span>
            </label>
            <input v-model="form.uri" @input="handleInputs($event)" :class="{'invalid': form.errors.uri}" :disabled="formState.submitted" id="uri" type="text">
            <p class="error-message">{{ form.errors.uri }}</p>
          </div>
        </div>
      </div>
       <div class="form-section">
        <div class="form-row">
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('loser')">
            <label for="winner-fname" class="input-label">
              Link
            </label>
            <input v-model="form.link" @input="handleInputs($event)" :class="{'invalid': form.errors.link}" :disabled="formState.submitted" id="link" type="text">
            <p class="error-message">{{ form.errors.link }}</p>
          </div>
         
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('loser')">
            <label for="winner-fname" class="input-label">
              Opština (ili inostranstvo na dnu) <span class="required">*</span>
            </label>
            <Dropdown
              label="name"
              :options="opstine.data"
              :type="'array'"
              v-model="form.county"
              :class="{'invalid': form.errors.county}"
            />
            <p class="error-message">{{ form.errors.county }}</p>
          </div>
        </div>
      </div>
      <div class="form-section">
        <div class="form-row">
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('winner')">
            <label for="winner-fname" class="input-label">
              Telefon
            </label>
            <input v-model="form.phone" @input="handleInputs($event)" :class="{'invalid': form.errors.phone}" :disabled="formState.submitted" id="phone" type="text">
            <p class="error-message">{{ form.errors.phone }}</p>
          </div>
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('loser')">
           <label for="winner-fname" class="input-label">
             Lokacija (google maps link)
            </label>
            <input v-model="form.location" @input="handleInputs($event)" :class="{'invalid': form.errors.location}" :disabled="formState.submitted" id="location" type="text">
            <p class="error-message">{{ form.errors.location }}</p>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-row">
          <button id="submit">
            <span id="add-btn">dodaj</span>
          </button>
        </div>
      </div>

    </form>
  </div>
</template>
