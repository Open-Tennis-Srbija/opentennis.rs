
<template>
    <Head title="Register -" />
    <h1>Register</h1>

    <div class="form-wrapp">
        <form @submit.prevent="submit">
            <div>
                <label for="name">Name</label>
                <input type="text" id="name" v-model="form.name" />
            </div>
            <div>
                <label for="email">Email</label>
                <input type="email" id="email"  v-model="form.email"/>
            </div>
            <div>
                <label for="password">Password</label>
                <input type="password" id="password"  v-model="form.password"/>
            </div>
            <div>
                <label for="password_confirmation">Confirm Password</label>
                <input type="password" id="password_confirmation" v-model="form.password_confirmation" />
            </div>
            <div>
                <button>Register</button>
            </div>
        </form>
    </div>
</template>
<script setup>
import { reactive } from 'vue';
import {useForm} from '@inertiajs/vue3'

    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit = () =>{
        form.post('register',{
            onError: (errors) => {
               form.reset('password', 'password_confirmation');
            },
        });
    }

</script>