<template>
  <div class="flex h-full">
    <SideBar />
    <main class="w-full p-8 mt-16 bg-neutral-100 mb-18">
      <!-- <CrearUser /> -->
      <!-- <CrearCliente /> -->
      <!-- <Useres /> -->
      
    <router-view />
    </main>
  </div>
  <Footer />
</template>

<script setup>
import Footer from '../layouts/Footer.vue'
import SideBar from '../layouts/SideBar.vue'
import CrearUser from '../Pages/Usuarios/Crear.vue'
import CrearCliente from '../Pages/Clientes/Crear.vue'
import Useres from '../Pages/Usuarios/Usuarios.vue'
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
