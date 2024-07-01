<template>
  <div>
    <div class="overflow-x-auto">
      <table class="min-w-full bg-white">
        <thead class="bg-purple-800 bg-opacity-75 text-white border-x">
          <tr>
            <th class="border border-gray-300">#</th>
            <th class="border border-gray-300" v-for="(header, i) in headers" :key="i">{{ header }}</th>
            <th class="border border-gray-300">ACCIONES</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(data, index) in paginatedData" :key="data.id" class="odd:bg-gray-200 even:bg-gray-300">
            <td class="border border-gray-300 pl-2">{{ data.id }}</td>
            <td class="border border-gray-300 pl-2" v-for="(column, i) in columns" :key="i">{{ data[column] }}</td>
            <td class="border border-gray-300 flex justify-around gap-0">
              <!-- Icono de borrar -->
              <button class="text-red-500" v-if="data?.delete" @click="data?.delete(data.id)" >
                <IconDelete />
              </button>
              <!-- Icono de editar -->
              <button class="text-blue-500" v-if="data?.delete" @click="data?.edit(data.id)">
                <IconEdit />
              </button>
              <!-- Icono de aceptar -->
              <!-- <button class="text-green-500">
                <IconSuccess />
              </button> -->
              <!-- Icono de ojo -->
              <!-- <button class="text-blue-500">
                <IconEye />
              </button> -->
              <!-- Icono de impresora -->
              <!-- <button class="text-yellow-500">
                <IconImpresora />
              </button> -->
              <!-- Icono de documentos -->
              <!-- <button class="text-yellow-500">
                <IconDocs />
              </button> -->
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="flex items-center justify-between mt-4">
      <div>
        <label for="itemsPerPage" class="mr-2">Mostrar:</label>
        <select id="itemsPerPage" v-model="itemsPerPage" @change="updatePagination" class="border rounded px-2 py-1">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <div>
        <button @click="prevPage" :disabled="currentPage === 1" class="px-3 py-1 mx-1 bg-purple-800 text-white rounded disabled:opacity-50">Anterior</button>
        <span>Página {{ currentPage }} de {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="px-3 py-1 mx-1 bg-purple-800 text-white rounded disabled:opacity-50">Siguiente</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, defineProps } from 'vue';
import IconDelete from '../../assets/svgs/delete.vue';
import IconEdit from '../../assets/svgs/edit.vue';
import IconDocs from '../../assets/svgs/docs.vue';
import IconEye from '../../assets/svgs/show.vue';
import IconSuccess from '../../assets/svgs/succes.vue';
import IconImpresora from '../../assets/svgs/impresora.vue';

const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  data: {
    type: Array,
    required: true,
  },
  columns: {
    type: Array,
    required: true,
  },
});

const itemsPerPage = ref(25);
const currentPage = ref(1);
const totalPages = computed(() => Math.ceil(props.data.length / itemsPerPage.value));

const paginatedData = computed(() => {
  console.log(props.data);
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.data.slice(start, end);
});

function updatePagination() {
  currentPage.value = 1;
}

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}
</script>

<style scoped>
/* Puedes añadir estilos adicionales si es necesario */
</style>
