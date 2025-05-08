<script setup>

import Editor from 'primevue/editor';
import { ref, onMounted, useTemplateRef } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useBlogStore from '@/stores/blogPostStore';
import 'primeicons/primeicons.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import { Form, FormField } from '@primevue/forms';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { InputText } from 'primevue';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import moment from 'moment-timezone'

const toast = useToast();
const blogStore = useBlogStore()
const postId = ref('');
const data = ref({
    title: '',
    subtitle: '',
    imgUrl: '',
    description: ''
})
const router = useRouter()
const goHomePage = () => {
    router.push('/')
}

const formRef = ref();

onMounted(() => {
    postId.value = useRoute().params.id
    const html = blogStore.getBlogPostsById(postId.value)
    data.value = {
        title: html.title,
        subtitle: html.subtitle,
        imgUrl: html.imgUrl,
        description: html.description
    }
    formRef.value.setValues(data.value)
})

const resolver = zodResolver(
    z.object({
        imgUrl: z.string().min(1, { message: 'This field is required' }),
        title: z.string().min(1, { message: 'This field is required' }).max(20, { message: 'Title should not be more then 20 characters' }),
        subtitle: z.string().min(1, { message: 'This Field is required' }).max(35, { message: 'Subtitle should not be more then 35 characters' }),
        data: z.string().min(1, { message: 'This field is required' })
    })
)

const onSubmitForm = (formObj) => {
    const date = moment().format('YYYY-MM-DD')
    const time = moment().format('hh:mm A');
    console.log('form obje is', formObj);
    if (formObj) {
        formObj.states = { ...data.value }
        blogStore.editPostById(postId.value, { ...data.value, comments: [...blogStore.commentsList], date: date, time: time })
        toast.add({
            severity: 'success',
            summary: 'Updated',
            detail: 'Post is updated successfully',
            life: 3000,
        })
    }
}

</script>

<template>
    <!-- <div> -->
    <div class="w-[70%] m-auto mt-30 mb-100 h-auto">
        <div class="flex mt-25 flex-row text-center items-center">
            <Button class="font-semibold cursor-pointer rounded-sm rounded-xl rounded-md bg-black text-white p-2"
                @click="goHomePage">Back Home</Button>
            <h1
                class="ml-[160px] justify-self-center place-content-center m-[0] text-center text-5xl text-[#000638] font-bold">
                Update Blog</h1>
        </div>
        <div class="card mt-10 flex flex-col gap-1 w-[95%] self-center">
            <Form ref='formRef' :initialValues="data" :resolver v-slot="$form" class="flex flex-col" :model="data"
                @submit="onSubmitForm">
                <FormField :initialValue="data.title" v-slot="$field" name="title" class="flex flex-col mb-2">
                    <InputText autofocus v-model="data.title" :invalid="$field.invalid" class="w-full mb-2" type="text"
                        placeholder="Enter title" />
                    <Message v-if="$field.invalid" class="text-red-500 mb-2" severity="error" size="small">{{
                        $field.error?.message }}
                    </Message>
                </FormField>
                <FormField :initialValue="data.subtitle" v-slot="$field" name="subtitle" class="flex flex-col mb-2">
                    <InputText v-model="data.subtitle" :invalid="$field.invalid" class="w-full mb-2" type="text"
                        placeholder="Enter subtitle" />
                    <Message v-if="$field.invalid" class="text-red-500 mb-2" size="small" severity="error">{{
                        $field.error?.message }}
                    </Message>
                </FormField>
                <FormField :initialValue="data.imgUrl" v-slot="$field" name="imgUrl" class="flex flex-col mb-2">
                    <InputText v-model="data.imgUrl" :invalid="$field.invalid" class="w-full mb-2" type="text"
                        placeholder="Enter img url here..." />
                    <Message v-if="$field.invalid" class="text-red-500 mb-2" severity="error" size="small">{{
                        $field.error?.message }}
                    </Message>
                </FormField>
                <FormField :initialValue="data.description" v-slot="$field" name="description"
                    class="flex flex-col mb-2">
                    <Editor v-model="data.description"
                        :class="['w-full mb-2', { 'border border-red-500 rounded-[7px]': $field.invalid }]"
                        name="description" :invalid="$field.invalid" editorStyle="height: 320px"
                        placeholder="Enter description here" />
                    <Message v-if="$field.invalid" class="text-red-500 mb-2" severity="error" size="small">{{
                        $field.error?.message }}</Message>
                </FormField>
                <Button type="submit"
                    class="mb-40 font-semibold cursor-pointer rounded-sm rounded-xl rounded-md bg-black text-white p-2 mt-10 w-full">Update</Button>
            </Form>
        </div>
    </div>
</template>