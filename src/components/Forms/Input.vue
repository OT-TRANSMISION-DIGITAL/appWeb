<template>
    <div class="relative mb-6 font-sans text-[#3E4095] text-2xl">
      <label :for="id" :class="['text-[#3E4095]  '+labelClass, { 'shrink': isFocused || modelValue }]">{{ label }}</label>
      <input
        :type="type"
        :id="id"
        :class="'border-0 border-b-4 placeholder-opacity-60 focus:border-0 text-2xl  px-4 py-2 ' + inputClass"
        :placeholder="isFocused ? '' : placeholder"
        :value="modelValue"
        @input="handleInput"
        @focus="isFocused = true"
        @blur="handleBlur"
      />
      <p :class="messageClass">
        <span class="font-medium">{{ messagePrefix }}</span> {{ validationMessage }}
      </p>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, computed, defineProps, defineEmits, watch } from 'vue';
  
  const props = defineProps<{
    modelValue: string;
    label: string;
    placeholder: string;
    validationStatus: 'default' | 'success' | 'error';
    validationMessage: string;
    id: string;
    type: string;
  }>();
  
  const emit = defineEmits(['update:modelValue']);
  
  const isFocused = ref(false);
  
  const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;
    emit('update:modelValue', target.value);
  };
  
  const handleBlur = () => {
    if (props.modelValue) {
      isFocused.value = true;
    } else {
      isFocused.value = false;
    }
  };
  
  const labelClass = computed(() => {
    switch (props.validationStatus) {
      case 'success':
        return 'absolute left-2.5 top-2.5 transition-all text-green-700 dark:text-green-500';
      case 'error':
        return 'absolute left-2.5 top-2.5 transition-all text-red-700 dark:text-red-500';
      default:
        return 'absolute left-2.5 top-2.5 transition-all text-gray-700 dark:text-gray-300';
    }
  });
  
  const inputClass = computed(() => {
    switch (props.validationStatus) {
      case 'success':
        return ' border-b-green-500 text-green-900 dark:text-green-400 placeholder-transparent focus:ring-green-500 focus:border-b-green-500 block w-full dark:bg-gray-700 dark:border-b-green-500';
      case 'error':
        return ' border-b-red-500 text-red-900 placeholder-transparent focus:ring-red-500 dark:bg-gray-700 focus:border-b-red-500 block w-full dark:text-red-500 dark:placeholder-red-500 dark:border-b-red-500';
      default:
        return ' border-b-[#3e4095] text-gray-900 dark:text-gray-300 placeholder-transparent focus:ring-gray-500 focus:border-b-[#3e4095] block w-full dark:bg-gray-700 dark:border-b-[#3e4095]';
    }
  });
  
  const messageClass = computed(() => {
    switch (props.validationStatus) {
      case 'success':
        return 'mt-2 text-sm text-green-600 dark:text-green-500';
      case 'error':
        return 'mt-2 text-sm text-red-600 dark:text-red-500';
      default:
        return 'mt-2 text-sm text-gray-600 dark:text-gray-400';
    }
  });
  
  const messagePrefix = computed(() => {
    switch (props.validationStatus) {
      case 'success':
        return 'Well done!';
      case 'error':
        return 'Oh, snapp!';
      default:
        return '';
    }
  });
  
  watch(() => props.modelValue, (newValue) => {
    if (newValue || isFocused.value) {
      isFocused.value = true;
    } else {
      isFocused.value = false;
    }
  });
  
  </script>
  
  <style scoped>
  .shrink {
    top: -1.8rem;
    left: 0;
    font-size: 1.3rem;
    text-align: start;
    color: #3E4095;
    line-height: 2rem/* 32px */;
  }
  </style>
  