<template>
    <Calendar 
    :events="events"
    />
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { agenda } from '../../services/agenda.js'
import Calendar from '../../components/Calendar.vue'
const events = ref([])
onMounted(async () => {
    try {    
        // Get Vistas
        const resAgenda = await agenda({tecnico: 5, tipo: 'visitas'})
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
        const resOrdenes = await agenda({tecnico: 5, tipo: 'ordenes'})
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
})
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