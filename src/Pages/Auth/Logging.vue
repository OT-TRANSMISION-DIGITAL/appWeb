<script setup>
import { ref } from 'vue';
import Input from '../../components/Forms/Input.vue';
import Submit from '../../components/Forms/Submit.vue';
import CheckBox from '../../components/Forms/CheckBox.vue';
import Footer from '../../layouts/Footer.vue';
import imgLogging from '../../assets/logging.svg'
import imgLogo from '../../assets/OT_logo_light.jpeg'
import axios from 'axios';
import { login } from '../../services/sesion.js'
const showCode = ref(false);
const urlSigned = ref('');
const loading = ref(false);
const code = ref({
    value: '',
    error: {
        status: '',
        message: ''
    }
});
const form = ref({
    email: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
    password: {
        value: '',
        error: {
            status: '',
            message: ''
        }
    },
});
const handleSubmit = (e) => {e.preventDefault();}
const submit = async (e) => {
    e.preventDefault();
    loading.value = true;
    try {
        const response = await login(form.value.email.value, form.value.password.value);
        console.log(response);
        if (response.status == 200) {
            if(response.data.rutaFirmada){
                showCode.value = true;
                urlSigned.value = response.data.rutaFirmada.replace(/\//g, ' ').replaceAll(' ', '/');
            }else{
                localStorage.setItem('token', response.data.token)
                window.location.href = '/'
            }
        }
    } catch (error) {
        console.log(error);
    }finally{
        loading.value = false;
    }
}
const verifyCode = async (e) => {
    e.preventDefault();
    console.log('verifying code', code.value);
    try {
        const response = await axios.post(urlSigned.value, {
            codigo: code.value.value
        });
        if (response.status === 200) {
            // Guardar token
            const {nombre,correo,rol_id,telefono} = response.data.usuario
            localStorage.setItem('token', response.data.token)
            localStorage.setItem('user', JSON.stringify({nombre,correo,rol_id,telefono}))
        }
    } catch (error) {
        console.log(error);
    }finally{
        loading.value = false;
    }
}
</script>

<template>
    <div class="min-h-screen flex items-center justify-center bg-neutral-100">
        <div class="flex flex-row justify-center items-center gap-36 mb-5">
            <div class="hidden img lg:block">
                <img :src="imgLogging" alt="logo" width="950"/>
            </div>
            <div class="min-w-[36rem] space-y-20 shadow-md shadow-black px-16 pt-5 pb-16 bg-white border-[#3e4095] border-8">
                <div class="flex justify-center items-center flex-col mt-5">
                    <img :src="imgLogo" alt="" width="284">
                </div>
                <form class="space-y-12 pb-14" @submit="handleSubmit($event)">
                    <div v-if="!showCode">
                        <Input 
                            v-model="form.email.value"
                            label="Email"
                            placeholder="Email"
                            :validationStatus="form.email.error.status"
                            :validationMessage="form.email.error.message"
                            id="email"
                            type="email"
                        />
                    </div>
                    <div v-if="!showCode">
                        <Input 
                            v-model="form.password.value"
                            label="Contraseña"
                            placeholder="Contraseña"
                            :validationStatus="form.password.error.status"
                            :validationMessage="form.password.error.message"
                            id="contraseña"
                            type="password"
                        />
                        <div class="flex justify-center items-center">
                            <CheckBox>
                                <template #text>
                                    <p class="text-base text-[#3e4095]">Recordar</p>
                                </template>
                            </CheckBox>
                        </div>
                    </div>
                    <div class="flex justify-center items-center" v-if="!showCode">
                        <Submit 
                            :handleClick="submit"
                            text="Iniciar Sesión"
                            :disabled="loading"
                        />
                    </div>
                    <div v-if="showCode">
                        <Input 
                            v-model="code.value"
                            label="Código"
                            placeholder="Código"
                            :validationStatus="code.error.status"
                            :validationMessage="code.error.message"
                            id="code"
                            type="text"
                        />
                    </div>
                    <div class="flex justify-center items-center" v-if="showCode">
                        <Submit 
                            :handleClick="verifyCode"
                            text="Verificar Código"
                            :disabled="loading"
                        />
                    </div>
                    
                </form>
            </div>
        </div>
    </div>
    <Footer />
</template>

<style scoped>
.back {
    position: absolute;
    background-size: cover;
    background: #FFFFFF;
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
    padding: 25px 50px 25px 50px;
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