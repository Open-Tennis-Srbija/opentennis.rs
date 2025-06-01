<script setup>
import {useForm, usePage} from '@inertiajs/vue3'
import {reactive, onMounted, defineAsyncComponent, nextTick} from 'vue';
import bus from 'vue3-eventbus';

import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps({players: Array});
const page = usePage();

onMounted(async () => {
   page.props['title'] = 'Admin';
   await nextTick
   bus.emit('loading', false);
});

const form = useForm({
    username: null,
    password:null,
});

const formState = reactive({
    submitted: false,
    success: false,
});

const submit = () =>{

  formState.submitted = true;

    form.post('/admin/login',{
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

  if(event.target.value && event.target.value !== ''){
      form.errors[event.target.id] = '';
  }
  else{
    form.errors[event.target.id] = 'Ovo polje je obavezno';
  }

}

</script>
<template>
    <div class="static-wrapper">
    <h1 id="title" :class="{'hide': formState.success}">Admin</h1>
    <form id="form" @submit.prevent="submit" :class="{'hide': formState.success}">
       <div class="form-section">
        <div class="form-row column">
          <div class="form-group center">
            <label for="full-score" class="input-label">
              Korisničko ime <span class="required">*</span>
            </label>
            <input v-model="form.username" @input="handleInputs($event)" :class="{'invalid': form.errors.username}" :disabled="formState.submitted" id="username" type="text">
            <p class="error-message">{{ form.errors.username }}</p>
          </div>
          <div class="form-group center">
            <label for="games" class="input-label">
              Lozinka <span class="required">*</span>
            </label>
            <input :class="{'invalid': form.errors.password}" v-model="form.password" @input="handleInputs($event)" :disabled="formState.submitted" id="game_score " type="password">
            <p class="error-message">{{ form.errors.password }}</p>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-row">
          <button id="submit">
            <span id="add-btn" :class="{'hide': formState.submitted}">Uloguj se</span>
            <span id="loader-submit" :class="{'show': formState.submitted}" class="loader"></span>
          </button>
        </div>
      </div>

    </form>
  </div>
</template>
