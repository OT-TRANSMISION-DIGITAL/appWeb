<script setup>
import { FwbButton } from 'flowbite-vue';
import DataTable from '../../components/Tables/DataTable.vue';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
const router = useRouter();
const data = ref([
    {
        persona: 'Juan Perez',
        rfc: 'PEJU123456',
        regimen: 'Persona Física',
        emails: 'juan@example.com',
        cp: '12345'
    },
    {
        persona: 'Pedro Lopez',
        rfc: 'LOPE123456',
        regimen: 'Persona Moral',
        emails: 'pedro@example.com',
        cp: '54321'
    },
]);
const edit = (id) => {
    console.log('Editando', id);
}
const deleted = (id) => {
    console.log('Eliminando', id);
}
const addUser = () => {
    router.push('/usuarios/crear');
}
</script>

<template>
    <div class="space-y-5 mt-44">
        <div class="flex justify-end mr-5">
            <fwb-button gradient="blue" shadow="dark" 
            @click="addUser"
            >
                Agregar Usuario
            </fwb-button>
        </div>
        <DataTable 
        :data="data"
        :header="['Persona', 'RFC', 'Regimen', 'Emails', 'Código Postal']"
        :columns="['persona', 'rfc', 'regimen', 'emails', 'cp']"
        :filterForColumn="true"
        :acciones="[
            {
                action: edit,
                icon: 'edit'
            },
            {
                action: deleted,
                icon: 'delete'
            },
        ]"
        />
    </div>
</template>

<style scoped>

</style>