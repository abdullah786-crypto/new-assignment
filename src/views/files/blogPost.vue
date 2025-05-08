<script setup>
import Card from 'primevue/card';
import { defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const props = defineProps(['id', 'imgUrl', 'title', 'subtitle', 'description', 'index', 'comments', 'date', 'time'])

const goBlogDetailsPage = (id) => {
    router.push(`/blog-details/${id}`)
}
</script>

<template>

    <div class="myComment">
        <Card class="border border-gray-200" style="width: 100%; overflow: hidden">
            <template #header>
                <img alt="Failed to fetch image here" :src="imgUrl" />
            </template>
            <template class="text-ellipsis overflow-hidden min-w-auto max-w-[98%]" #title>
                {{ title }}
            </template>
            <template :class="'text-justify'" #subtitle>
                {{ subtitle }}
            </template>
            <template style="padding: 0rem 0;" #content>
                <div class="flex flex-col">
                    <p class="text-gray-400 text-[10px]">Total Commets: {{ comments.length }}</p>
                    <p class="text-gray-400 text-[10px]">Date: {{ date }}</p>
                    <p class="text-gray-400 text-[10px]">Time: {{ time }}</p>
                </div>
            </template>
            <template #footer>
                <div>
                    <Button @click="goBlogDetailsPage(props.id)"
                        :class="'font-semibold bg-black text-white w-full p-2 rounded-lg rounded-sm rounded-xl cursor-pointer'">
                        View
                    </Button>
                </div>
            </template>
        </Card>
    </div>
</template>

<style scoped>
.myComment ::v-deep(.p-card) {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

::v-deep(.p-card-caption) {
    display: block !important;
    min-width: auto !important;
    max-width: 98% !important;
    text-overflow: ellipsis !important;
    overflow: hidden !important;
    white-space: nowrap !important;
}

::v-deep(.p-card-body) {
    text-align: justify;
    gap: 5px;
    padding: 15px;
}

::v-deep(.p-card .p-card-footer) {
    padding: 0px;
}

::v-deep(.p-card.p-card-content) {
    padding: 0px 0px;
}

::v-deep(.p-card .p-card-content) {
    padding: 0px 0px;
}
</style>