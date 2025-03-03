<script setup>
import { computed, onBeforeMount, reactive } from 'vue';

const model = defineModel();

onBeforeMount(()=>{
  if(model.value)
    state.search = model.value.name;
})


const props = defineProps({
  options: Array,
  label: String,
  value: String,
  multiple: Boolean,
});

const state = reactive({
  isOpen: false,
  search: '',
  searching: false,
  selectedIndex: 0,
  isBlured: false,
  options: props.options,
});

const handleSearch = (e) => {
  state.search = e.target.value;
  model.value.id = 'temp';
  model.value.name = state.search;
}

const filteredOptions = computed(() => {
  if (state.search === '') return state.options;

  return state.options.filter(option => option[props.label].toLowerCase().includes(state.search.toLowerCase()));
});


const onKeyUp = () => {
  if (state.selectedIndex > 0) {
    state.selectedIndex--;
  }
}
const onKeyDown = () => {
  if (state.selectedIndex < filteredOptions.value.length - 1) {
    state.selectedIndex++;
  }
}

const onFocus = (e) => {
  let input = e.target;
  let value = e.target.value;
  input.setSelectionRange(value.length, value.length);

  if(!model.value){
    console.log('model is empty');
    model.value = {
      id: 'temp',
      name: state.search
    }
  }
  
  state.searching = true;
  state.isOpen = true;
  state.selectedIndex = 0;

}
const onBlur = (e) => {
  let input = e.target;
  let value = e.target.value;
  input.setSelectionRange(value.length, value.length);

  state.searching = false;
  state.isOpen = false;
  state.isBlured = false;
}


const onTab = () => {
  let selected = filteredOptions.value[state.selectedIndex];

  if (selected.id == 'temp')
    selected.id = 'temp-selected';

  model.value = selected;
  state.searching = false;
  state.isOpen = false;
  document.activeElement.blur();
}

const onEsc = () => {
  state.isBlured = true;
  document.activeElement.blur();
}


const selectOption = (player) => {
  model.value.id = player.id;
  model.value.name = player.name;
  state.search = player.name;
  document.activeElement.blur();
}


</script>
<template>
  <div class="dropdown-wrapper">
    <input type="text" 
      :value="state.search"
      @input="handleSearch" 
      @focus="onFocus" 
      @blur="onBlur"
      @keydown.down.prevent="onKeyDown" 
      @keydown.up.prevent="onKeyUp" 
      @keydown.esc.prevent="onEsc" 
      @keydown.tab.prevent="onTab" 
      />
    <div class="dropdown" :class="{ 'open': state.isOpen }">
      <ul>
        <li v-for="(option, index) in filteredOptions" :key="index" :class="{ 'hovered': state.selectedIndex == index }"
          @mouseover="state.selectedIndex = index" @click="selectOption(option)">
          {{ option[props.label] }}
        </li>
      </ul>
    </div>
    <div class="arrow" :class="{ 'open': state.isOpen }">
      <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
        <g>
          <polygon points="8 3 5 7 2 3 8 3" />
        </g>
      </svg>
    </div>
  </div>
</template>