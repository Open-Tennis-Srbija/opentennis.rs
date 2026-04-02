<script setup>
import { getCurrentInstance, watch, ref } from "vue";
import { computed, onBeforeMount, onMounted, onUnmounted, reactive } from "vue";

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
    disabledOptions: Array,
    minWidth: String
});

const model = defineModel();

onBeforeMount(() => {
    if (props.multiple) {
        // For multi-select, initialize as empty array if not set
        if (!model.value || !Array.isArray(model.value)) {
            model.value = [];
        }
        updateDisplayForMultiple();
    } else {
        // Single select logic (existing)
        if (model.value && model.value.name && model.value.name != "") {
            state.search = model.value.name;
        }
        if (model.value && !model.value.name && model.value !== "") {
            state.search = model.value;
        }
        if(model.value && model.value.id && model.value.name == ''){
            state.search = model.value.name;
        }
    }
});

const dropdownInput = ref(null);
const dropdownDiv = ref(null);

const state = reactive({
    isOpen: false,
    search: "",
    searching: false,
    selectedIndex: 0,
    isBlured: false,
    placeholder: "",
    options: props.options,
});

// Helper function to update display for multiple selection
const updateDisplayForMultiple = () => {
    if (props.multiple && model.value && Array.isArray(model.value) && model.value.length > 0) {
        const selectedNames = model.value.map(item => {
            if (props.type === "array") {
                return item;
            }
            return item.name || item;
        }).join(", ");
        
        state.search = selectedNames;
        state.placeholder = selectedNames;
    } else if (props.multiple) {
        state.search = "";
        state.placeholder = "Select items...";
    }
};

// Watch for model value changes to update display
watch(model, () => {
    if (props.multiple) {
        updateDisplayForMultiple();
    } else if (model.value && model.value.name && model.value.id !== 'temp' && !state.isOpen) {
        // Update display when model changes externally in single-select mode
        state.search = model.value.name;
        state.placeholder = model.value.name;
    }
}, { deep: true, immediate: true });

watch(
    () => props.shouldReset,
    (value) => {
        if (value) {
            state.search = "";
            if (props.multiple) {
                model.value = [];
            } else {
                model.value = null;
            }
            state.placeholder = "";
            props.shouldReset = false;
        }
    },
);

// Check if an option is selected (for multi-select)
const isOptionSelected = (option) => {
    if (!props.multiple || !model.value || !Array.isArray(model.value)) {
        return false;
    }
    return model.value.some(selected => {
        if (props.type === "array") {
            return selected === option;
        }
        // For objects, match both id and name for more precise comparison
        return selected.id === option.id && selected.name === option.name;
    });
};

const handleSearch = (e) => {
    if (!props.multiple) {
        // Single-select mode (existing behavior)
        state.search = e.target.value;
        state.placeholder = e.target.value;
        model.value.id = "temp";
        model.value.name = state.search;
    }
    // For multi-select, don't allow manual input - it's readonly
};

const filteredOptions = computed(() => {
    // For multi-select mode, always show all options (no filtering)
    if (props.multiple) {
        return state.options;
    }
    
    // Single-select mode with no search term, show all options
    if (state.search === "" || (model.value && model.value.name == "")) {
        return state.options;
    }
    
    // Filter options based on search for single-select only
    if (props.type !== "array") {
        return state.options.filter((option) =>
            option[props.label]
                .toLowerCase()
                .includes(state.search.toLowerCase()),
        );
    } else {
        return state.options.filter((option) =>
            option.toLowerCase().includes(state.search.toLowerCase()),
        );
    }
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
        if (props.multiple) {
            // Initialize as empty array for multi-select
            model.value = [];
        } else {
            // Single-select initialization (existing behavior)
            if (props.type !== "array")
                model.value = {
                    id: "temp",
                    name: state.search,
                };
            else model.value = state.search;
        }
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

    // Only apply placeholder logic for single-select mode
    if (!props.multiple) {
        if (
            (input.value == "" || state.search == "") &&
            state.placeholder != "" &&
            !state.isBlured &&
            !state.isOpen
        ) {
            state.search = state.placeholder;
            input.value = state.placeholder;
        }
        if ((state.search == "" || input.value == "") && state.placeholder != "" && !state.isOpen) {
            state.search = state.placeholder;
            input.value = state.placeholder;
        }
    } else {
        // For multi-select, update display based on selection
        updateDisplayForMultiple();
    }
};

const toggleDropdown = () => {
    if(state.isOpen)
        onBlur();
    else
        onFocus({ target: dropdownInput.value });
};

const onTab = () => {
    let selected = filteredOptions.value[state.selectedIndex];

    if (props.multiple) {
        // For multi-select, add to selection if not already selected
        if (!isOptionSelected(selected)) {
            if (!model.value || !Array.isArray(model.value)) {
                model.value = [];
            }
            model.value = [...model.value, selected];
            updateDisplayForMultiple();
        }
    } else {
        // Single-select mode (existing behavior)
        if (selected.id == "temp") selected.id = "temp-selected";
        model.value = selected;
    }
    
    state.searching = false;
    state.isOpen = false;
    document.activeElement.blur();
};

const onEsc = () => {
    state.isBlured = true;
    document.activeElement.blur();
};

const selectOption = (option, e) => {
    if (props.multiple) {
        // Multi-select logic
        if (!model.value || !Array.isArray(model.value)) {
            model.value = [];
        }
        
        const isSelected = isOptionSelected(option);
        
        if (isSelected) {
            // Remove from selection
            model.value = model.value.filter(selected => {
                if (props.type === "array") {
                    return selected !== option;
                }
                return selected.id !== option.id || selected.name !== option.name;
            });
        } else {
            // Add to selection
            model.value = [...model.value, option];
        }
        
        // Use nextTick to ensure the update is processed before display update
        updateDisplayForMultiple();
        // Don't close dropdown for multi-select
        e.stopPropagation();
    } else {
        // Single select logic (existing)
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
    }
};
</script>
<template>
    <div class="dropdown-wrapper" :style="minWidth ? { minWidth: minWidth } : {}">
        <input type="text" 
               :placeholder="state.placeholder" 
               :value="state.search" 
               :readonly="props.multiple"
               ref="dropdownInput"
            @input="handleSearch" @focus="onFocus" @blur="onBlur" @keydown.down.prevent="onKeyDown"
            @keydown.up.prevent="onKeyUp" @keydown.esc.prevent="onEsc" @keydown.tab.prevent="onTab" />
        <div class="dropdown" ref="dropdownDiv" :class="{ open: state.isOpen }">
            <ul>
                <li v-for="(option, index) in filteredOptions" 
                    :key="index" 
                    :class="{
                        spacer: option === 'dropdown-spacer' || option?.name === 'dropdown-spacer',
                        disabled: (props.disabledOption && props.disabledOption.id === option?.id) || 
                                 (props.disabledOptions && props.disabledOptions.some(
                                     (disabledOption) => disabledOption?.id === option?.id
                                 )),
                        hovered: state.selectedIndex === index &&
                                (!(props.disabledOption && props.disabledOption.id === option?.id) &&
                                !(props.disabledOptions && props.disabledOptions.some(
                                    (disabledOption) => disabledOption?.id === option?.id
                                ))),
                        selected: props.multiple && isOptionSelected(option)
                    }" 
                    @mouseover="state.selectedIndex = index" 
                    @click="selectOption(option, $event)">
                    
                    <template v-if="option === 'dropdown-spacer' || option?.name === 'dropdown-spacer'">
                        <div class="spacer"></div>
                    </template>
                    <template v-else>
                        <div class="option-content">
                            <span class="checkbox" v-if="props.multiple">
                                <svg v-if="isOptionSelected(option)" viewBox="0 0 16 16" width="16" height="16">
                                    <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" fill="currentColor"/>
                                </svg>
                            </span>
                            <span class="option-text">
                                {{ props.type === "array" ? option : option?.[props.label] }}
                            </span>
                        </div>
                    </template>
                </li>
            </ul>
        </div>
        <div class="arrow" @click="toggleDropdown" :class="{ open: state.isOpen }">
            <svg viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <polygon points="8 3 5 7 2 3 8 3" />
                </g>
            </svg>
        </div>
    </div>
</template>

<style scoped>
.dropdown-wrapper {
    position: relative;
}

.dropdown-wrapper input {
    height: 50px;
    font-size: 18px;
    padding: 0 40px 0 10px;
    border: 1px solid black;
    border-radius: 0;
    outline: 0;
    background-color: white;
    font-family: Arial, sans-serif;
    width: 100%;
}

.dropdown-wrapper input:focus {
    outline: 0;
    border-radius: 0;
}

.dropdown-wrapper input.invalid {
    border-color: #ec008c;
}

.dropdown {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    max-height: 30vh;
    overflow-y: auto;
    background-color: white;
    z-index: 3;
    border: 1px solid black;
    border-top: 0;
    transition: 0.1s ease-in-out;
    opacity: 0;
    visibility: hidden;
}

.dropdown.open {
    opacity: 1;
    visibility: visible;
}

.dropdown ul {
    margin: 0;
    padding: 0;
    list-style: none;
}

.dropdown ul li {
    width: 100%;
    padding: 5px 10px;
    cursor: pointer;
}

.dropdown ul li.disabled {
    pointer-events: none;
    color: #8f8f8f;
}

.dropdown ul li.spacer {
    pointer-events: none;
    padding-top: 7px;
}

.dropdown ul li.spacer div {
    height: 1px;
    border-bottom: 1px dashed #8f8f8f;
}

.dropdown ul li.hovered {
    background-color: #00aeef;
    color: white;
}

.dropdown ul li.selected {
    background-color: rgba(0, 174, 239, 0.1);
}

.dropdown ul li.hovered.selected {
    background-color: rgba(0, 174, 239, 0.2);
}

.arrow {
    position: absolute;
    right: 5px;
    top: 50%;
    padding: 0;
    transform: translateY(-50%) rotate(0deg);
    transition: 0.1s ease-in-out;
    cursor: pointer;
}

.arrow svg {
    transform: rotate(0deg);
    transition: 0.15s ease-in-out;
    fill: #8f8f8f;
    height: 25px;
    width: 25px;
}

.arrow.open svg {
    transform: rotate(180deg);
}

.option-content {
    display: flex;
    align-items: center;
    gap: 8px;
}

.checkbox {
    width: 16px;
    height: 16px;
    border: 1px solid #ccc;
    border-radius: 3px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    flex-shrink: 0;
}

.option-text {
    flex: 1;
}

li.selected .checkbox {
    background: #00aeef;
    border-color: #00aeef;
    color: white;
}

li.selected .checkbox svg {
    color: white;
}

@media (max-width: 1200px) {
    .dropdown-wrapper {
        width: 100%;
    }
}
</style>
