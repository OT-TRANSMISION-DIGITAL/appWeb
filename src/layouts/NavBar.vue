<template>
    <fwb-navbar solid class="bg-white shadow-md absolute h-24 w-full top-0 z-50 border-b dark:border-white">
      <template #logo>
        <RouterLink to="/">
          <fwb-img alt="Flowbite logo" :src="IMGSS" 
          class="absolute left-10 flex items-center justify-center top-2 w-32 cursor-pointer"/>
        </RouterLink>
      </template>
      <template #right-side>
          <fwb-dropdown  align-to-end class="absolute right-0 top-4">
            <template #trigger>
              <div class="cursor-pointer">
                  <fwb-avatar />
              </div>
            </template>
            <fwb-list-group>
              <div class="pl-2 pb-2">
                {{ name }} <br>
                {{ correo }}
              </div>
              <hr>
              <fwb-list-group-item class="cursor-pointer">
                Cerrar Sesión
              </fwb-list-group-item>
            </fwb-list-group>
          </fwb-dropdown>
      </template>
    </fwb-navbar>
  </template>
  
  <script setup>
  import {
    FwbNavbar,
    FwbImg,
    FwbAvatar,
    FwbDropdown, 
    FwbListGroup, 
    FwbListGroupItem,
    FwbA,
    FwbNavbarCollapse,
    FwbNavbarLink,
    FwbNavbarLogo,
  } from 'flowbite-vue'
  import IMGSS from '../assets/OT_logo_light.jpeg'
  import { ref } from 'vue';


  const user = JSON.parse(localStorage.getItem('user'));
  const name = ref(user?.nombre || '');
  const correo = ref(user?.correo || '');
</script>