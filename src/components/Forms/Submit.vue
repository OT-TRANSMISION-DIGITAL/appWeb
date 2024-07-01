<script setup>
import { defineProps } from 'vue';

const props = defineProps({
    text: {
        type: String,
        default: 'Submit'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    handleClick: {
        type: Function,
        default: () => {}
    }
});

</script>

<template>
    <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-xl font-medium text-[#3e4095] rounded-3xl group bg-gradient-to-br from-indigo-600 to-[#3e4095] group-hover:from-purple-600 group-hover:to-purple-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
    @click="handleClick($event)"
    :disabled="disabled">
        <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-3xl group-hover:bg-opacity-0">
            {{ text || 'Submit' }}
        </span>
    </button>
</template>

<style scoped>

</style>