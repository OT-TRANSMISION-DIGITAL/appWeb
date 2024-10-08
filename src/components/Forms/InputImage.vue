<template>
  <div
    ref="imagePreview"
    @click="triggerFileUpload"
    @dragover.prevent="handleDragOver"
    @dragleave="handleDragLeave"
    @drop.prevent="handleFileDrop"
    :class="['relative w-[20rem] max-w-sm p-6 mb-4 bg-gray-100 border-dashed border-2 rounded-lg items-center mx-auto text-center cursor-pointer', isDragging ? 'border-blue-500' : 'border-gray-400']"
  >
    <input ref="uploadInput" @change="handleFileChange" type="file" class="hidden" accept="image/*" />
    <label v-if="!imageSRC" for="uploadInput" class="cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-700 mx-auto mb-4">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
      <h5 class="mb-2 text-xl font-bold tracking-tight text-gray-700">Upload picture</h5>
      <p class="font-normal text-sm text-gray-400 md:px-6">Choose photo size should be less than <b class="text-gray-600">2mb</b></p>
      <p class="font-normal text-sm text-gray-400 md:px-6">and should be in <b class="text-gray-600">JPG, PNG</b> format.</p>
    </label>
    <span ref="filenameLabel" class="text-gray-500 bg-gray-200 z-50"></span>
    <img :src="imageSRC" alt="Img" v-if="imageSRC" class="max-h-32 rounded-lg mx-auto">
    <div v-if="showSVG" class="absolute inset-0 flex items-center justify-center">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8 text-gray-700">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
      </svg>
    </div>
  </div>
  <div class="flex items-center justify-center" v-show="showSVG || imageSRC">
    <div class="w-[80%]">
      <label @click="triggerFileUpload" class="w-full text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 flex items-center justify-center mr-2 mb-2 cursor-pointer">
        <span class="text-center ml-2">Cambiar</span>
      </label>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: File,
  imageSRC: String,
});

const emit = defineEmits(['update:modelValue', 'inFocus', 'submit', 'update:imageSRC']);

const uploadInput = ref(null);
const filenameLabel = ref(null);
const imagePreview = ref(null);
const showSVG = ref(false);
const isDragging = ref(false);
const file = ref(null);

watch(() => props.modelValue, (newFile) => {
  if (newFile) {
    //console.log(newFile);
    filenameLabel.value.textContent = newFile.name;

    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value.innerHTML = `<img src="${e.target.result}" class="max-h-32 rounded-lg mx-auto" alt="Image preview" />`;
      imagePreview.value.classList.remove('border-dashed', 'border-2', 'border-gray-400');
    };
    reader.readAsDataURL(newFile);
    showSVG.value = true;
  } else {
    if(filenameLabel.value) filenameLabel.value.textContent = '';
    if(imagePreview.value) {imagePreview.value.innerHTML = `<div class="bg-gray-200 h-30 rounded-lg flex items-center justify-center text-gray-500">No image preview</div>`;
    imagePreview.value.classList.add('border-dashed', 'border-2', 'border-gray-400');}
    showSVG.value = false;
  }
}, { immediate: true });
watch(() => props.imageSRC, (value) => {
  if(!value){
    emit('update:modelValue', file.value);
  }
},{immediate: false});

const handleFileChange = (event) => {
  const file = event.target.files[0];
  handleFile(file);
};

const handleFileDrop = (event) => {
  const file = event.dataTransfer.files[0];
  handleFile(file);
};

const handleFile = (f) => {
  // eliminar valor de ImageSRC
  emit('update:imageSRC', null);
  file.value = f;
};

const handleDragOver = () => {
  isDragging.value = true;
  emit('inFocus');
};

const handleDragLeave = () => {
  isDragging.value = false;
};

const triggerFileUpload = () => {
  uploadInput.value.click();
};
</script>

<style scoped>
/* Add any necessary styles here */
</style>
