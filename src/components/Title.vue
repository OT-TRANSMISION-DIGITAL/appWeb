<template>
    <h1>
        Hola {{ user.nombre || '' }} 
    </h1>
</template>

<script setup>
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};
</script>