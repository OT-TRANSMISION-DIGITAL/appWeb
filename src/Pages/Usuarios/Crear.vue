<template>

<div class="flex justify-center items-center">
    <div class="mt-20 bg-blue-100 p-5 space-y-10 rounded-lg shadow-md w-3/6">
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
            Crear Usuario
        </h5>
        <fwb-input
        v-model="form.nombre.value"
        label="Nombre"
        placeholder="Nombre"
        required
        />
        <!-- <div class="grid grid-cols-2 gap-10">
            <fwb-input
            v-model="form.apellido_paterno.value"
            label="Apellido Paterno"
            placeholder="Apellido Paterno"
            required
            />
            <fwb-input
            v-model="form.apellido_materno.value"
            label="Apellido Materno"
            placeholder="Apellido Materno"
            required
            />
        </div> -->
        <div class="grid grid-cols-2 gap-10">
            <fwb-input
            v-model="form.correo.value"
            label="Correo"
            placeholder="example@example.com"
            required
            />
            <fwb-input
            v-model="form.telefono.value"
            label="Teléfono"
            placeholder="871-000-0000"
            required
            />
        </div>
        <fwb-input
            v-model="form.password.value"
            label="Contraseña"
            placeholder="Contraseña"
            type="password"
            required
            />
        <fwb-select
            v-model="form.rol_id.value"
            :options="roles"
            label="Rol"
        />
        <p v-if="succ" class="text-emerald-500">  Usuario Registrado </p>
        <div class="space-x-5 flex justify-end">
            <fwb-button gradient="red">Cancelar</fwb-button>
            <fwb-button gradient="blue" @click="submit">Aceptar</fwb-button>
        </div>
    </div>
</div>
</template>
  
<script setup>
    import { ref, onMounted } from 'vue'
    import axios from 'axios'
    import { FwbInput, FwbSelect, FwbButton } from 'flowbite-vue'
    // Obtener la url de la api del .env
    const URL_API = import.meta.env.VITE_API_URL
    const succ = ref(false)
    const roles = ref([])
    const form = ref({
        nombre: {
            value: '',
            error: '',
            message: ''
        },
        apellido_paterno: {
            value: '',
            error: '',
            message: ''
        },
        apellido_materno: {
            value: '',
            error: '',
            message: ''
        },
        correo: {
            value: '',
            error: '',
            message: ''
        },
        telefono: {
            value: '',
            error: '',
            message: ''
        },
        password: {
            value: '',
            error: '',
            message: ''
        },
        rol_id: {
            value: '',
            error: '',
            message: ''
        },
    })
    const getRoles = async () => {
        try {
            const res = await axios.get(`${URL_API}/roles`)
            if(res.status == 200) {
                roles.value = res.data.roles.map((role) => {
                    return {
                        value: role.id,
                        name: role.nombre
                    }
                })
            }else{
                console.log(res)
            }
        } catch (error) {
            console.log(error)        
        }
    }
    const submit = async () => {
        const data = {
            nombre: form.value.nombre.value,
            correo: form.value.correo.value,
            telefono: form.value.telefono.value,
            password: form.value.password.value,
            rol_id: form.value.rol_id.value
        }
        try {
            const res = await axios.post(`${URL_API}/registrar`,data, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            })
            if(res.status == 200) {
                succ.value = true
                setTimeout(()=>{
                    window.location.href = '/'
                }, 2000)
            }
        } catch (error) {
            console.log(error)        
        }
    }
    onMounted(() => {
        getRoles()
    })
</script>