<script setup>
import {useForm, usePage} from '@inertiajs/vue3'
import {onMounted, reactive} from 'vue';
import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import axios from 'axios';
import bus from 'vue3-eventbus';

const props = defineProps({uri: String});

const page = usePage();
const player = ref({});

onMounted(() => {
    page.props['title'] = `Izmeni tenisera`;
    axios.get(`/teniser/${props.uri}`).then((response) => {
       form.id = response.data.id;
        form.first_name = response.data.first_name;
        form.last_name = response.data.last_name;
        form.club = response.data.club;
        form.location = response.data.location;
        form.category = response.data.category;
        player.value = response.data; 
        bus.emit('loading', false);
    }).catch((error) => {
        console.error('Error fetching player:', error);
    });
});

const form = useForm({
    id: null,
    first_name: null,
    last_name: null,
    club: null,
    location: null,
    category: null,
});

const formState = reactive({
    submitted: false,
    success: false,
});
const deletePlayer = () =>{
    if(confirm('Da li ste sigurni da želite da obrišete ovog tenisera?')){
        form.post(`/teniser/obrisi`,{
            onSuccess: () => {
                location.href = '/';
            },
            onError: (errors) => {
                formState.submitted = false;
            },
        });
    }
}
const submit = () =>{

  formState.submitted = true;
  form.first_name.trim();
  form.last_name.trim();
  if(form.club)
    form.club.trim();
  if(form.location)
    form.location.trim();

    form.post(`/teniser/izmeni`,{
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

  if(event.data){
      form.errors[event.target.id] = '';
  }
  else{
    form.errors[event.target.id] = 'Ovo polje je obavezno';
  }

}

</script>
<template>
   <Head title="Izmeni tenisera -" />
    <div class="static-wrapper">
    <h1 id="title" :class="{'hide': formState.success}">izmeni tenisera</h1>
    <form id="form" @submit.prevent="submit">

      <div class="form-section">
        <div class="form-row">
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('winner')">
            <label for="winner-fname" class="input-label">
              Ime<span class="required">*</span>
            </label>
            <input v-model="form.first_name" @input="handleInputs($event)" :class="{'invalid': form.errors.first_name}" :disabled="formState.submitted" id="first_name" type="text">
            <p class="error-message">{{ form.errors.first_name }}</p>
          </div>
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('loser')">
            <label for="winner-fname" class="input-label">
              Prezime<span class="required">*</span>
            </label>
            <input v-model="form.last_name" @input="handleInputs($event)" :class="{'invalid': form.errors.last_name}" :disabled="formState.submitted" id="last_name" type="text">
            <p class="error-message">{{ form.errors.last_name }}</p>
          </div>
        </div>
      </div>

       <div class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label for="full-score" class="input-label">
              Klub
            </label>
            <input v-model="form.club" :disabled="formState.submitted" id="club" type="text">
            <p class="error-message">{{ form.errors.club }}</p>
          </div>
          <div class="form-group">
            <label for="games" class="input-label">
              Lokacija
            </label>
            <input v-model="form.location" @input="handleInputs($event)" :disabled="formState.submitted" id="location " type="text">
          </div>
        </div>
      </div>
       <div class="form-section">
        <div class="form-row">
          <div class="form-group">
            <label for="full-score" class="input-label">
              Kategorija
            </label>
            <Dropdown v-if="form.category" :label="'name'" :type="'array'" v-model="form.category" :options="['?','dropdown-spacer','1','2','3','4','5','6','7','8','9','10']" :disabled="formState.submitted" id="category" />
            <p class="error-message">{{ form.errors.category }}</p>
          </div>
          <div class="form-group">
            <label for="games" class="input-label">
            </label>
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
    <!-- <button @click.prevent="deletePlayer()" class="delete">obriši</button> -->
  </div>
</template>
