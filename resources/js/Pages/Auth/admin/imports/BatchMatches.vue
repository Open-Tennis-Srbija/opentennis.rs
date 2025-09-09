<script setup>
import {useForm} from '@inertiajs/vue3'
import { onMounted, reactive , nextTick} from 'vue';
import 'vue-select/dist/vue-select.css';
import '@vuepic/vue-datepicker/dist/main.css'
import bus from 'vue3-eventbus';
import { ref } from 'vue';

const props = defineProps({players: Array, courts: Array, leagues: Array});



onMounted(async () => {
    await nextTick();
    bus.emit('loading', false);
});

const form = useForm({
    court: null,
    league: null, 
    type: null,
    csvData: null,
});

const fileText = ref('Izaberi fajl');

const csvFile = ref(null);

const handleCSV = (event) =>{
  let file = event.target.files[0];
  if(!file) return;

  const reader = new FileReader();

  reader.onload = (e) =>{
    const text = e.target.result;
    form.csvData = text;
  }
  reader.readAsText(file);
  fileText.value = file.name
}

const formState = reactive({
    submitted: false,
    success: false,
    shouldReset: false,
});

const submit = () =>{


  formState.submitted = true;
    

    form.post(`/import-matches`,{
        onSuccess: () => {
          bus.emit('loading', false);
          formState.submitted = false;
          formState.success = true;
        },
        onError: (errors) => {
            bus.emit('loading', false);
          formState.submitted = false;
        },
    });
}
const validateCSV = (()=>{
 }
)


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
    <Head title="Import singlova -" />
    <div class="static-wrapper">
    <h1 id="title" :class="{'hide': formState.success}">Import singlova</h1>
    <h1 id="success" :class="{'show': formState.success}">Mečevi su uspešno dodati!</h1>
    <div id="success-links" :class="{'show': formState.success}">
      <Link prefetch="false" class="red" :href="'/lige'">vidi lige i turnire</Link>
      <Link prefetch="false" class="blue" :href="'/mecevi'">vidi mečeve</Link>
      <Link prefetch="false" class="red" :href="'/'">vidi tenisere</Link>
    </div>
    <form id="form" @submit.prevent="submit" :class="{'hide': formState.success}">

      <div class="form-section">
        <div class="form-row three">
          <div class="form-group">
            <label for="winner-fname" class="input-label">
              Liga ili turnir (opcionalno)
            </label>
            <Dropdown
              v-if="props.leagues"
              label="name"
              :options="[{ id: 1, name: 'sparing' },{ id: null, name: 'dropdown-spacer' }, ...props.leagues]"
              v-model="form.league"
              :class="{'invalid': form.errors.league}"
              :shouldReset="formState.shouldReset"
            />
            <p class="error-message">{{ form.errors.league }}</p>
          </div>
          <div class="form-group">
            <label for="place" class="input-label">
              Teniski teren ili klub (opcionalno)
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
          <div class="form-group">
            <label for="place" class="input-label">
              Tip
            </label>
            <Dropdown
              label="name"
              :type="'array'"
              :options="['Liga', 'Turnir']"
              v-model="form.type"
              :class="{'invalid': form.errors.type}"
              :shouldReset="formState.shouldReset"
            />
            <p class="error-message">{{ form.errors.type }}</p>
          </div>
        </div>
      </div>

      <div class="form-section">
        <h2>Import fajla</h2>
        <div class="form-row">
          <div class="form-group">
            <label for="winner-fname" class="input-label">
             CSV fajl 
            </label>
            <div class="input-wrapper">
              <input type="file" accept=".csv" @change="handleCSV">
              <p>{{ fileText }}</p>
            </div>
            <p class="error-message">{{ form.errors.league }}</p>
          </div>
          <div class="form-group">
            <p>Potrebno je exportovati <a href="/storage/SrpskaTenisLiga.rs prijava turnira i liga - šablon.xlsx" target="_blank">spreadsheet</a> (Google sheet ili Excel) kao .csv fajl.</p>
            <p>File > Download > Coma Separated Values (.csv)</p>
          </div>
        </div>
      </div>

      <div class="form-section">
        <div class="form-row">
          <button id="submit">
            <span id="add-btn">Importuj</span>
          </button>
        </div>
      </div>

    </form>
  </div>
</template>
<style lang="scss" scoped>
  .form-section{
    p{
      font-size: 17px;
      margin-bottom: 10px;
    }
    .input-wrapper{
          position: relative;
    height: 50px;
    width: 562px;
    font-size: 18px;
    padding-inline: 10px;
    border-radius: 0;
    border: 1px solid black;
    outline: 0;
    input{
      opacity: 0;
    }

    p{
      position: absolute;
      left: 10px;
      top:50%;
      transform: translateY(-50%);
    }
    @media only screen and (max-width: 1200px){
      width: 100%;
    }
    }
  }
</style>
