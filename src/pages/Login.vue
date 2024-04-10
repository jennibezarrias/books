<template>
    <div class="container mx-auto">
        <h1 class="text-center font-bold mt-10 mb-2">Login</h1>
        <h2 class="text-center">Enter your credentials to gain full access to Frappe Books.</h2>
        <form @submit.prevent="doLogin()">
        <fieldset>
            <label for="name-input">Username</label>
            <input @input="() => warn = ''" v-model="usernameValue" id="name-input" type="text">
        </fieldset>
        <fieldset class="mb-2">
            <label for="password-input">Password</label>
            <input @input="() => warn = ''" v-model="passwordValue" id="password-input" type="password">
        </fieldset>
        <p v-if="warn">{{ warn }}</p>
        <Button

            type="primary"
            :disabled="!(usernameValue && passwordValue)"
        >
            Login
        </Button>
        </form>
    </div>
</template>

<script>
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
            usernameValue: '',
            passwordValue: ''
        }
       
    },
    methods: {
        doLogin() {
            this.warn = '';
            let success = false;

            if (!(this.usernameValue && this.passwordValue)) {
                this.warn = 'Please insert both username and password';
                return;
            }
            let headers = {
                'Accept': 'text/plain',
                'Content-Type': 'application/json'    
            }
            /*const res = await fetch('/Auth/Login', {
                method: 'POST',
                headers,
                body: JSON.stringify({
                userName: data.email,
                password: data.password
                })
            });*/
            if (this.usernameValue === 'Administrator' && this.passwordValue === 'admin') {
                localStorage.token = 'dasidsakfljsakldjsa' // generate token later with auth api
                success = true;
            } else {
                this.warn = 'Wrong credentials.'
            }

            this.$emit('on-login', {success});
        }
    },
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