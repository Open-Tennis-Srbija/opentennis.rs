<script setup>
import { getCurrentInstance, watch, ref } from "vue";
import { computed, onBeforeMount, onMounted, onUnmounted, reactive } from "vue";

const model = defineModel();

onBeforeMount(() => {
    
    if (model.value && model.value.name && model.value.name != "") {
        state.search = model.value.name;
    }
    if (model.value && !model.value.name && model.value !== "") {
        state.search = model.value;
    }
    if(model.value && model.value.id && model.value.name == ''){
        state.search = model.value.name;
    }
});

const dropdownInput = ref(null);
const dropdownDiv = ref(null);
const props = defineProps({
    autofocus: Boolean,
    options: Array,
    label: String,
    value: String,
    multiple: Boolean,
    shouldReset: Boolean,
    type: String,
    canAdd: Boolean,
    disabledOption: Object,
});

watch(
    () => props.shouldReset,
    (value) => {
        if (value) {
            state.search = "";
            model.value = null;
            state.placeholder = "";
            props.shouldReset = false;
        }
    },
);

const state = reactive({
    isOpen: false,
    search: "",
    searching: false,
    selectedIndex: 0,
    isBlured: false,
    placeholder: "",
    options: props.options,
});

const handleSearch = (e) => {
    state.search = e.target.value;
    state.placeholder = e.target.value;
    model.value.id = "temp";
    model.value.name = state.search;
};

const filteredOptions = computed(() => {
    if (state.search === "" || (model.value && model.value.name == ""))
        return state.options;
    if (props.type !== "array")
        return state.options.filter((option) =>
            option[props.label]
                .toLowerCase()
                .includes(state.search.toLowerCase()),
        );
    else
        return state.options.filter((option) =>
            option.toLowerCase().includes(state.search.toLowerCase()),
        );
});

const onKeyUp = () => {
    if (state.selectedIndex > 0) {
        state.selectedIndex--;
    }
};
const onKeyDown = () => {
    if (state.selectedIndex < filteredOptions.value.length - 1) {
        state.selectedIndex++;
    }
};

let ignoreFocusUntil = 0;

const onFocus = (e) => {
    let now = Date.now();

    if(now < ignoreFocusUntil) {
        return;
    }

    let input = e.target;
    let value = e.target.value;
    input.setSelectionRange(value.length, value.length);
    input.placeholder = value;
    state.search = "";
    if (!model.value) {
        if (props.type !== "array")
            model.value = {
                id: "temp",
                name: state.search,
            };
        else model.value = state.search;
    }

    state.searching = true;
    state.selectedIndex = 0;
    setTimeout(() => {
        state.isOpen = true;
    }, 70);
};

onMounted(() => {
    if (typeof window !== "undefined") {
        window.addEventListener("click", handleClickOutside);
        window.addEventListener("focus", handleWindowFocus);
        document.addEventListener('touchstart', handleInteraction, true);
    
        if(props.autofocus)
        dropdownInput.value.focus();
    }
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
    document.removeEventListener('visibilitychange', onVisibilityChange);
    document.removeEventListener('focus', handleWindowFocus);
});

const onClickOutside = ref((e) => { });

const ignoreNextFocus = ref(false);

const onVisibilityChange = () => {
  if (!document.hidden) {
    ignoreNextFocus.value = true;
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      ignoreNextFocus.value = false;
    }, 500); // Adjust if needed
  }
};

const handleWindowFocus = () => {
  const now = Date.now();
  // If focus happens within 500ms of resuming the app, suppress it
  ignoreFocusUntil = now + 500;
};

const handleInteraction = () => {
  lastInteraction = Date.now();
};

const handleClickOutside = (event) => {
    if (
        dropdownInput.value &&
        !dropdownInput.value.contains(event.target) &&
        dropdownDiv.value &&
        !dropdownDiv.value.contains(event.target)
    ) {
        state.searching = false;
        state.isOpen = false;

        onBlur();
    }
};

const onBlur = () => {
    let input = dropdownInput.value;

    if (
        (input.value == "" || state.search == '')&&
        state.placeholder != "" &&
        !state.isBlured &&
        !state.isOpen
    ) {
        state.search = state.placeholder;
        input.value = state.placeholder;
    }
    if ((state.search == '' || input.value == "") && state.placeholder != "" && !state.isOpen) {
        state.search = state.placeholder;
        input.value = state.placeholder;
    }
};

const onTab = () => {
    let selected = filteredOptions.value[state.selectedIndex];

    if (selected.id == "temp") selected.id = "temp-selected";

    model.value = selected;
    state.searching = false;
    state.isOpen = false;
    document.activeElement.blur();
};

const onEsc = () => {
    state.isBlured = true;
    document.activeElement.blur();
};

const selectOption = (option, e) => {
    if (!props.type || props.type !== "array") {
        model.value.id = option.id;
        model.value.name = option.name;
        state.search = option.name;
        state.placeholder = option.name;
    } else {
        model.value = option;
        state.search = option;
        state.placeholder = option;
    }
    state.isBlured = true;
    e.target.blur();
    onClickOutside.value(e);
};
</script>
<template>
    <div class="dropdown-wrapper">
        <input type="text" :placeholder="state.placeholder" :value="state.search" ref="dropdownInput"
            @input="handleSearch" @focus="onFocus" @blur="onBlur" @keydown.down.prevent="onKeyDown"
            @keydown.up.prevent="onKeyUp" @keydown.esc.prevent="onEsc" @keydown.tab.prevent="onTab" />
        <div class="dropdown" ref="dropdownDiv" :class="{ open: state.isOpen }">
            <ul>
                <li v-for="(option, index) in filteredOptions" :key="index" :class="{
                    spacer:
                        option == 'dropdown-spacer' ||
                        option.name == 'dropdown-spacer',
                    disabled:
                        props.disabledOption &&
                        props.disabledOption.id == option.id,
                    hovered:
                        state.selectedIndex == index &&
                        (!props.disabledOption ||
                            props.disabledOption.id != option.id),
                }" @mouseover="state.selectedIndex = index" @click.native="selectOption(option, $event)"
                    @tap="selectOption(option, $event)">
                    <template v-if="
                        option == 'dropdown-spacer' ||
                        option.name == 'dropdown-spacer'
                    ">
                        <div class="spacer"></div>
                    </template>
                    <template v-else>
                        {{
                            props.type == "array" ? option : option[props.label]
                        }}
                    </template>
                </li>
            </ul>
        </div>
        <div class="arrow" :class="{ open: state.isOpen }">
            <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <polygon points="8 3 5 7 2 3 8 3" />
                </g>
            </svg>
        </div>
    </div>
</template>
