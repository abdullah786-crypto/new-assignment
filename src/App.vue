<script setup>

import Toast from 'primevue/toast';
import Header from './layout/header.vue'
import Footer from './layout/footer.vue'

</script>

<template>


    <Header />
    <Toast position="top-right" />
    <div class="m-auto w-[70%]">
        <router-view />
    </div>
    <Footer />

</template>

<style scoped>
.footer {
    background-color: rgb(70, 58, 58);
}

.customMenuBar ::v-deep(.p-menubar) {
    justify-content: space-between;
    background-color: black;
    padding: 20px;
}

.customMenuBar ::v-deep(.p-menubar-item-content) {
    color: white;
}

.customMenuBar ::v-deep(.p-menubar-item-link) {
    background-color: rgb(26, 2, 2);
    color: white;

    &:hover {
        color: white;
        background-color: rgb(100, 80, 80);
    }
}

.customMenuBar ::v-deep(.p-menubar-item-icon) {
    color: white !important;
}

.customMenuBar ::v-deep(.p-menubar-item-icon.pi.pi-home:hover) {
    color: white !important;
}
</style>
