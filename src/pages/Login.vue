<template>
    <div class="container mx-auto">
        <h1 class="text-center font-bold mt-10 mb-2">Login</h1>
        <h2 class="text-center">Enter your credentials to gain full access to Frappe Books.</h2>
        <form @submit.prevent="doLogin()">
        <fieldset>
            <label for="email-input">E-mail</label>
            <input v-model="emailValue" id="email-input" type="email">
        </fieldset>
        <fieldset class="mb-2">
            <label for="password-input">Password</label>
            <input v-model="passwordValue" id="password-input" type="password">
        </fieldset>
        <p v-if="warn">{{ warn }}</p>
        <Button

            type="primary"
            :disabled="!(emailValue && passwordValue)"
        >
            Login
        </Button>
        </form>
    </div>
</template>

<script>
import { showSidebar } from '../utils/refs';
import { defineComponent } from 'vue';
import FormControl from 'src/components/Controls/FormControl.vue';
import Button from 'src/components/Button.vue';
export default defineComponent({
    name: 'Login',

    components: {
        Button,
        FormControl
    },
    data() {
        return {
            warn: '',
            emailValue: '',
            passwordValue: ''
        }
       
    },
    methods: {
        doLogin() {
            this.warn = '';
            if (!(this.emailValue && this.passwordValue)) {
                this.warn = 'Please insert both email and password';
                return;
            }

            this.$emit('on-login', {email: this.emailValue, password: this.passwordValue});
            
        }
    },
    mounted() {
        showSidebar.value = false;
    }
})
</script>

<style scoped>
.container {
    max-width: 420px !important;
    margin-top: 70px;
    margin-bottom: auto;
}
h1 {
    font-size: 26px;
}
form {
    display: flex;
    flex-direction: column;
    gap: 8px;
}
fieldset {
    display: flex;
    flex-direction: column;

}
label {
    margin-bottom: 3px;
}
input {
    padding: 8px 12px;
    border-radius: 6px;
    border: 1px solid rgb(218, 218, 218);
}
</style>