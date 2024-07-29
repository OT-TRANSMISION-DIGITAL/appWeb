<template>
    <div class="mb-2 mt-0">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Seleccione un Técnico</label>
        <select v-model="tecnico_id"
        @change="getAgenda($event.target.value)"
        id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
            <option selected disabled>Elija una opción</option>
            <option v-for="rol in tecnicos" :value="rol.id">{{ rol.nombre }}</option>
        </select>
    </div>
    <Calendar
    :events="events"
    />
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { agenda } from '../../services/agenda.js'
import Calendar from '../../components/Calendar.vue'
import { tecnicos as Tec } from '../../services/usuarios.js'
const events = ref([])
const tecnicos = ref([])
const tecnico_id = ref(null)
onMounted(async () => {
    try {
        const resTecnicos = await Tec()
        if(resTecnicos.status < 300){
            tecnicos.value = resTecnicos.data
            tecnico_id.value = tecnicos.value[0].id
            console.log(tecnico_id.value)
            await getAgenda(tecnico_id.value)
        }
    } catch (error) {
        console.error(error)
    }
})
const getAgenda = async (id) => {
    events.value = []
    try {    
        // Get Vistas
        const resAgenda = await agenda({tecnico: Number(id), tipo: 'visitas'})
        if(resAgenda.status < 300){
            events.value = events.value.concat(resAgenda.data.map((item) => {
                // Separar data y hora
                const [date, time] = item.fechaHoraSolicitud.split(' ')
                return {
                    date,
                    time,
                    title: 'Visitas | ' +item.estatus
                }
            }))
        }
        // Get Ordenes
        const resOrdenes = await agenda({tecnico: Number(id), tipo: 'ordenes'})
        if(resOrdenes.status < 300){
            events.value = events.value.concat(resOrdenes.data.map((item) => {
                // Separar data y hora
                const [date, time] = item.fechaHoraSolicitud.split(' ')
                return {
                    date,
                    time,
                    title: 'Ordenes | ' +item.estatus
                }
            }))
        }
    } catch (error) {
        console.error(error)   
    }
}
</script>

/**

events: [
{
  date: '2024-07-01',
  time: '10:00 AM',
  title: 'Event 1'
},
{
  date: '2024-07-15',
  time: '2:00 PM',
  title: 'Event 2'
}
] */

<style scoped>

</style>