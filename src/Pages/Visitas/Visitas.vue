<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { visitas, del }  from '../../services/visitas.js'
import Table from '../../components/Tables/Table.vue'
const router = useRouter();
const headers = ['Motivo','Dirección','Cliente', 'Técnico', 'Sucursal', 'Fecha', 'Estado'];
const columns = ['motivo','direccion','cliente_id', 'tecnico_id', 'sucursal_id', 'fechaHoraSolicitud','estatus'];
const data = ref([])
const edit = (id) => {
    console.log('Editando', id);
}
const deleted = async (id) => {
    try {
        const res = await del(id);
        if(res.status < 300){
            console.log('Eliminado', id);
            location.reload();
        }
    } catch (error) {
        console.log(error);
    }
}
const addUser = () => {
    router.push('/visitas/crear');
}

onMounted(async () => {
    try {
        const res = await visitas();
        const d = res.data.data;
        console.log(d)
        data.value = d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
            return item;
        });
    } catch (error) {
        console.log(error);
    }
});

</script>

<template>
    <div class="space-y-5">
        <div class="flex justify-end mr-5">
            <!-- <fwb-button gradient="blue" shadow="dark" 
            @click="addUser"
            >
                Agregar Usuario
            </fwb-button> -->
        <button class="border border-[#3E4095] rounded-2xl py-1 px-5 bg-white hover:bg-[#3E4095] hover:text-white"
            @click="addUser"
        >
            Nueva Visita
        </button>
        </div>
        <Table 
            :columns="columns"
            :headers="headers"
            :data="data"
        />
    </div>
</template>

<style scoped>

</style>