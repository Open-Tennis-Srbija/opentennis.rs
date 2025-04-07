<script setup>
import { getCurrentInstance, watch } from "vue";
import { computed, onBeforeMount, onMounted, reactive } from "vue";

const model = defineModel();
const instance = getCurrentInstance();

onBeforeMount(() => {
    if (model.value && model.value.name && model.value.name != "") {
        state.search = model.value.name;
    }
    if (model.value && !model.value.name && model.value.name !== "")
        state.search = model.value;
});

const props = defineProps({
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
        console.log("reset");
        console.log('reset now');
        if (value) {
            state.search = "";
            model.value = null;
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
    options: props.options,
});

const handleSearch = (e) => {
    state.search = e.target.value;
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

const onFocus = (e) => {
    let input = e.target;
    let value = e.target.value;
    input.setSelectionRange(value.length, value.length);
    input.placeholder = value;
    state.search = "";
    if (!model.value) {
        console.log("model is empty");
        if (props.type !== "array")
            model.value = {
                id: "temp",
                name: state.search,
            };
        else model.value = state.search;
    }

    state.searching = true;
    state.isOpen = true;
    state.selectedIndex = 0;
};
const onBlur = (e) => {
    let input = e.target;

    if (input.value == "" && input.placeholder != "" && !state.isBlured) {
        state.search = input.placeholder;
    }
    state.searching = false;
    state.isOpen = false;
    state.isBlured = false;
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
        console.log("here");
    if (!props.type || props.type !== "array") {
        model.value.id = option.id;
        model.value.name = option.name;
        state.search = option.name;
        e.target.placeholder = option.name;
    } else {
        model.value = option;
        state.search = option;
    }
    state.isBlured = true;
    e.target.blur();
};
</script>
<template>
    <div class="dropdown-wrapper">
        <input
            type="text"
            :value="state.search"
            @input="handleSearch"
            @focus="onFocus"
            @blur="onBlur"
            @keydown.down.prevent="onKeyDown"
            @keydown.up.prevent="onKeyUp"
            @keydown.esc.prevent="onEsc"
            @keydown.tab.prevent="onTab"
        />
        <div class="dropdown" :class="{ open: state.isOpen }">
            <ul>
                <li
                    v-for="(option, index) in filteredOptions"
                    :key="index"
                    :class="{
                        spacer: option=='dropdown-spacer' || option.name == 'dropdown-spacer',
                        disabled:
                            props.disabledOption &&
                            props.disabledOption.id == option.id,
                        hovered: state.selectedIndex == index && (!props.disabledOption || props.disabledOption.id != option.id),
                    }"
                    @mouseover="state.selectedIndex = index"
                    @click="selectOption(option, $event)"
                    @tap="selectOption(option, $event)"
                >
                    <template v-if="option == 'dropdown-spacer' || option.name == 'dropdown-spacer'">
                        <div class="spacer"></div>
                    </template>
                    <template v-else>
                        {{ props.type == "array" ? option : option[props.label] }}
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
