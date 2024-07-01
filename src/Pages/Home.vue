<script setup>
import Sidebar from '../layouts/SideBar.vue'
import Navbar from '../layouts/NavBar.vue'
import Footer from '../layouts/Footer.vue'
// Remover la etiqueta dark de la clase body
import { onMounted } from 'vue';
import axios from 'axios';
const URL_API = import.meta.env.VITE_API_URL;
const getUser = async () => {
    try {
        const res = await axios.get(`${URL_API}/user`,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        if(res.status == 200) {
            const user = {
                id: res.data.id,
                nombre: res.data.nombre,
                correo: res.data.correo,
                nombre_completo: res.data.nombre,
            };
            localStorage.setItem('user', JSON.stringify(user));
        }
    } catch (error) {
        console.log(error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        location.href = '/login';
    }
}
onMounted(() => {
    document.body.classList.remove('dark');
    getUser();
});
</script>

<template>
  <Navbar />
  <Sidebar />
  <Footer />
  <!-- // content -->
  <div class="mt-28 ml-72  mr-10 h-[86vh]">
        <div class="text-white">
            <h1>Hola</h1>
        </div>
      <router-view />
</div>
</template>

<style scoped>

</style>
