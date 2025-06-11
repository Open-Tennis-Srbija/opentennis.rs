<script setup>
import {useForm, usePage} from '@inertiajs/vue3'
import {onMounted, reactive} from 'vue';
import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';
import axios from 'axios';
import bus from 'vue3-eventbus';

const props = defineProps({id: Number});

const page = usePage();
const court = ref({});

onMounted(() => {
    page.props['title'] = `Izmeni teren`;
    axios.get(`/teren/${props.id}`).then((response) => {
       console.log(response.data);
       form.id = response.data.id;
       form.name = response.data.name;
       form.link = response.data.link;
        court.value = response.data;
        bus.emit('loading', false);
    }).catch((error) => {
        console.error('Error fetching court:', error);
    });
});

const form = useForm({
    id: null,
    name: null,
    link: null,
});

const formState = reactive({
    submitted: false,
    success: false,
});
const deleteCourt = () =>{
    if(confirm('Da li ste sigurni da želite da obrišete ovaj teren?')){
        form.post(`/teren/obrisi`,{
            onSuccess: () => {
                location.href = '/tereni';
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

    form.post(`/teren/izmeni`,{
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
    <h1 id="title" :class="{'hide': formState.success}">izmeni teren</h1>
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
          <div class="form-group" @focusin="prepareTemp()" @focusout="handleTemp('loser')">
            <label for="winner-fname" class="input-label">
              Link
            </label>
            <input v-model="form.link" @input="handleInputs($event)" :class="{'invalid': form.errors.link}" :disabled="formState.submitted" id="link" type="text">
            <p class="error-message">{{ form.errors.link }}</p>
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
    <button @click.prevent="deleteCourt()" class="delete">obriši</button>
  </div>
</template>
