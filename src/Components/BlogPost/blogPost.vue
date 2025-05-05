<script setup>
import Card from 'primevue/card';
import { defineProps, onMounted } from 'vue';
import { useRouter } from 'vue-router';

onMounted(() => {
    console.log(props.id)
})
const router = useRouter();
const props = defineProps(['id', 'imgUrl', 'title', 'subtitle', 'description'])

const goBlogDetailsPage = (id) => {
    router.push(`/blog-details/${id}`)
}
</script>

<template>

    <Card class="shadow-xl border border-gray-200" style="width: 100%; overflow: hidden">
        <template #header>
            <img alt="user header"
                :src="imgUrl" />
        </template>
        <template #title>
            {{ title }}
        </template>
        <template :class="'text-justify'" #subtitle>
            {{ subtitle }}
        </template>
        <template #footer>
            <div>
                <Button @click="goBlogDetailsPage(props.id)"
                    :class="'bg-black text-white w-full p-2 rounded-lg rounded-sm rounded-xl cursor-pointer'"> View
                </Button>
            </div>
        </template>
    </Card>
</template>

<style scoped>
::v-deep(.p-card-body) {
  text-align: justify;
  gap: 5px;
  padding: 15px;
}
::v-deep(.p-card.p-card-footer){
    padding: 0;
}
</style>