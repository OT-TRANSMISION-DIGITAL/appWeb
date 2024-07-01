<script setup>
import { ref } from 'vue'
import { FwbInput, FwbHeading, FwbButton, FwbCheckbox } from 'flowbite-vue'
import axios from 'axios'
// Use Global Validators
import { isEmail, isPassword } from '../../global/Validators'
const check = ref(false)
const URL_API = import.meta.env.VITE_API_URL
// import usuario from '../../../service/usuario';  
const makeLogin = ref({
    correo: {
        value: '',
        error: '',
        message: ''
    },
    password: {
        value: '',
        error: '',
        message: ''
    }
})
const inputCode = ref(null)
const showCode = ref(false)
const showEmail = ref(true)
const rutaF = ref('')
async function verifyLogin() {
    let errors = false
    if (!isEmail(makeLogin.value.correo.value)) {
        makeLogin.value.correo.error = 'error'
        makeLogin.value.correo.message = 'Correo incorrecto'
        errors = true
    }else if(makeLogin.value.correo.error == 'error'){
        makeLogin.value.correo.error = 'success'
        makeLogin.value.correo.message = ''
    } if(makeLogin.value.password.error == 'error'){
        makeLogin.value.password.error = 'success'
        makeLogin.value.password.message = ''
    }
    if(errors){
        console.log(
            makeLogin.value,
        )
    }else{
        try {
            const res = await axios.post(`${URL_API}/login`, {
                correo: makeLogin.value.correo.value,
                password: makeLogin.value.password.value
            })
            if(res.status == 200) {
                if(res.data.rutaFirmada){
                    showCode.value = true
                    showEmail.value = false
                    rutaF.value = res.data.rutaFirmada.replace(/\//g, ' ').replaceAll(' ', '/')
                }else{
                    localStorage.setItem('token', res.data.token)
                    window.location.href = '/'
                
                }
            }
        } catch (error) {
            console.log(error)
        }
    }
}
async function verifyCode() {
    if (inputCode.value && inputCode.value != '') {
        try {
            const res = await axios.post(`${rutaF.value}`, {
                "codigo": inputCode.value,
            })
            if(res.status == 200) {
                localStorage.setItem('token', res.data.token)
                window.location.href = '/'
            }
        } catch (error) {
            console.log(error)
        }
        
    }
    else {
        console.log('error')
    }
}
</script>

<template>
    <div class="back">
        <div class="login-page">
            <div class="form space-y-5 shadow-lg shadow-black">
                <form class="login-form space-y-5">
                    <div class="flex justify-center items-center">
                        <img src="../../assets/LogoNavBar.png" alt="" class="w-56">
                    </div>
                    <fwb-heading tag="h4" class="mb-5">Iniciar Sesión</fwb-heading>
                    <div class="grid grid-cols-1 gap-2 space-y-5">
                        <fwb-input placeholder="correo o nombre de usuario" v-if="showEmail"
                            v-model="makeLogin.correo.value" 
                            :validation-status="makeLogin.correo.error">
                            <template #validationMessage>
                             {{ makeLogin.correo.message }}
                            </template>
                        </fwb-input>
                            <div>
                                <fwb-input type="password" placeholder="Contraseña" v-if="showEmail" v-model="makeLogin.password.value" 
                                :validation-status="makeLogin.password.error">
                                    <template #validationMessage>
                                        {{ makeLogin.password.message }}
                                    </template>
                                </fwb-input>
                                <div>
                                    
                                </div>
                            </div>
                        <fwb-input type="password" placeholder="Código de Verificación" v-if="showCode"
                            v-model="inputCode" 
                            />
                    </div>
                    <div class="grid grid-cols-1 gap-2">
                        <fwb-button type="button" color="blue" class="mt-5" v-if="showEmail"
                            v-on:click="verifyLogin()">Entrar</fwb-button>
                        <fwb-button type="button" color="blue" class="mt-5" v-on:click="verifyCode()"
                            v-if="showCode">Validar</fwb-button>
                    </div>
                    <div class="flex justify-center items-center">
                          <fwb-checkbox v-model="check" label="Recordarme" />
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<style scoped>
.back {
    position: absolute;
    background-size: cover;
    height: 100%;
    width: 100% !important;
}

.login-page {
    padding: 10% 5% 5%;
    margin: auto;
}

.form {
    position: relative;
    background: #FFFFFF;
    padding: 50px 100px 50px 100px;
    text-align: center;
    border-radius: 25px;
    max-width: 500px;
    margin: 0 auto 100px;

}

@media (max-width: 768px) {

    .login-page {
        padding: 30% 5% 5%;
    }

    .form {
        padding: 30px;
    }

}
</style>