<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { sucursales, deleteSucursal }  from '../../services/sucursales'
import Table from '../../components/Tables/Table.vue'
const router = useRouter();
const headers = ['Nombre','Cliente','Teléfono','Direccion'];
const columns = ['nombre','cliente','telefono','direccion'];
const data = ref([])
const edit = (id) => {
    //console.log('Editando', id);
    router.push(`/sucursales/${id}`);
}
const deleted = async (id) => {
    try {
        const res = await deleteSucursal(id);
        if(res.status < 300){
            //console.log('Eliminado', id);
            location.reload();
        }
    } catch (error) {
        console.error(error);
    }
}
const addUser = () => {
    router.push('/sucursales/crear');
}

onMounted(async () => {
    try {
        const res = await sucursales();
        const d = res.data.data;
        //console.log(d)
        data.value = d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
            item.cliente = item.cliente.nombre
            return item;
        });
        paginateData();
    } catch (error) {
        console.error(error);
    }
});

async function paginateData(){
    // Siclo para paginar la api mientrar traega resultados
    let page = 2;
    let res = await sucursales(page);
    let d = res.data.data;
    while(d.length > 0){
        data.value = data.value.concat(d.map((item) => {
            item['edit'] = edit
            item['delete'] = deleted
            item.cliente = item.cliente.nombre
            return item;
        }));
        page++;
        res = await sucursales(page);
        d = res.data.data;
    }
}

</script>

<template>
    <div class="space-y-5">
        <div class="flex justify-end mr-5">
            <!-- <fwb-button gradient="blue" shadow="dark" 
            @click="addUser"
            >
                Agregar Usuario
            </fwb-button> -->
        </div>
        <Table 
            :columns="columns"
            :headers="headers"
            :data="data"
            btn-text="Agregar Sucursal"
            :btn-action="addUser"
        />
    </div>
</template>

<style scoped>

</style>