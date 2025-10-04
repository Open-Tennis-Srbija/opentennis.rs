<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    modelValue: {
        type: String,
        default: ''
    },
    label: {
        type: String,
        default: 'Password'
    },
    placeholder: {
        type: String,
        default: ''
    },
    required: {
        type: Boolean,
        default: false
    },
    error: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
});

const emit = defineEmits(['update:modelValue']);

const showPassword = ref(false);
const inputType = computed(() => showPassword.value ? 'text' : 'password');

const updateValue = (event) => {
    emit('update:modelValue', event.target.value);
};

const togglePasswordVisibility = () => {
    showPassword.value = !showPassword.value;
};

const hasError = computed(() => !!props.error);
</script>

<template>
    <div class="form-group password-field">
        <label v-if="label">
            {{ label }}
            <span v-if="required" class="required">*</span>
        </label>
        <div class="password-input-wrapper">
            <input
                :type="inputType"
                :value="modelValue"
                :disabled="disabled"
                :class="{ invalid: hasError }"
                @input="updateValue"
            />
            <p class="toggle-text" @click="togglePasswordVisibility">
                {{ showPassword ? "sakrij" : "prikaži" }}
            </p>
        </div>
        <div v-if="hasError" class="error-message">
            {{ error }}
        </div>
    </div>
</template>

<style lang="scss" scoped>
@use '../../../css/sass/abstracts' as *;

.password-field {
    display: flex;
    flex-direction: column;
    gap: 10px;
    position: relative;

    label {
        font-size: 16px;
        cursor: text;

        .required {
            color: $red;
        }
    }

    input {
        position: relative;
        height: 50px;
        width: 562px;
        font-size: 18px;
        padding-inline: 10px;
        padding-right: 80px;
        border-radius: 0;
        border: 1px solid black;
        outline: 0;

        &:focus,
        &:focus-visible {
            outline: 0;
            border-radius: 0;
        }

        &.invalid {
            border-color: $red;
        }

        &:disabled {
            background-color: #f5f5f5;
            color: #666;
            cursor: not-allowed;
        }
    }

    .error-message {
        font-size: 16px;
        color: $red;
        position: absolute;
        left: 0;
        top: 110%;
    }
}

.password-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;

    .toggle-text {
        position: absolute;
        right: -10px;
        top: -30px;
        font-size: 14px;
        color: $mid-gray;
        cursor: pointer;
        user-select: none;
        margin: 0;
        padding: 5px 10px;
        transition: color 0.2s ease;

        &:hover {
            color: $red;
        }
    }
}

@media only screen and (max-width: 900px) {
    .password-field {
        input {
            width: 100% !important;
        }
    }
}
</style>