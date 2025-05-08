<script setup>

import Card from 'primevue/card';

const props = defineProps(['name', 'email', 'comment'])

</script>

<template>

    <div
        class="border-gray-200 p-5 m-0 m-[0px] mb-0 bg-grey-400 flex flex-col items-center overflow-auto overflow-y-auto content-center max-h-450px min-h-auto justify-center ">
        <Card class="border-gray-200 w-[100%] m-0 m-[0px] mb-0 shadow-lg shadow-xl shadow-2xl shadow-md">
            <template #title>{{ props.name }}</template>
            <template #subtitle>{{ props.email }}</template>
            <template #content>
                <p class="m-0">
                    {{ props.comment }}
                </p>
            </template>
        </Card>
    </div>
</template>