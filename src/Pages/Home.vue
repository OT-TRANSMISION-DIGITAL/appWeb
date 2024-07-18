<template>
  <div class="flex">
    <SideBar />
    <div class="flex-1">
      <h1 class="text-white mt-5 pl-4 text-5xl font-bold">
        Titulo
      </h1>
      <main class="w-full p-8 mt-5 bg-neutral-100 mb-18 relative h-[92%]">
        <router-view />
      </main>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import Footer from '../layouts/Footer.vue'
import SideBar from '../layouts/SideBar.vue'
import CrearUser from '../Pages/Usuarios/Crear.vue'
import CrearCliente from '../Pages/Clientes/Crear.vue'
import Users from '../Pages/Usuarios/Usuarios.vue'
</script>

<style>
@import 'tailwindcss/tailwind.css';
</style>
