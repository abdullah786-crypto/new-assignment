<script setup>
import Editor from 'primevue/editor';
// import Button from 'primevue/button';
import { ref, onMounted } from 'vue';
import useBlogStore from '@/stores/blogPostStore';
import { useRouter } from 'vue-router';
import { Form, FormField } from '@primevue/forms';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import moment from 'moment-timezone'
import Toast from 'primevue/toast';

const router = useRouter();
const newBlogStore = useBlogStore();
const title = ref('');
const subtitle = ref('');
const imgUrl = ref('');
const editorData = ref("");
const toast = useToast();
const autofocus = ref(false)

onMounted(() =>{
    newBlogStore.getBlogPosts()
    autofocus.value = true
})

const goHomePage = () => {
    router.push('/')
}

const resolver = zodResolver(
    z.object({
        imgUrl: z.string().min(1, { message: 'This field is required' }),
        title: z.string().min(1, { message: 'This field is required' }).max(20, { message: 'Title should not be more then 20 characters' }),
        subtitle: z.string().min(1, { message: 'This Field is required' }).max(35, { message: 'Subtitle should not be more then 35 characters' }),
        editorData: z.string().min(1, { message: 'This field is required' })
    })
)

const onSubmitForm = ({ valid }) => {
    if (valid) {
        const date = moment().format('YYYY-MM-DD')
        const time = moment().format('hh:mm A');
        newBlogStore.addBlogPosts({
            id: Date.now(),
            title: title.value,
            subtitle: subtitle.value,
            imgUrl: imgUrl.value,
            description: editorData.value,
            comments: [],
            date: date,
            time: time,
        })
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Post added successfully',
            life: 2000,
        });
        console.log('successfully toast works here...');
        title.value = ''
        subtitle.value = ''
        imgUrl.value = ''
        editorData.value = ''
        setTimeout(() => {
            router.push('/')
        }, 2000)
    }
}

</script>

<template>
    <div class="w-[70%] m-auto mt-30 mb-100 h-auto">
        <div class="flex flex-row text-center items-center">
            <Button
                class="font-semibold cursor-pointer rounded-sm rounded-xl rounded-lg rounded-md p-2 bg-black text-white p-2"
                @click="goHomePage">Back Home</Button>
            <h1 class="justify-self-center place-content-center ml-20 text-center text-5xl text-[#000638] font-bold">
                Add New Blog</h1>
        </div>
        <div class="card mt-10 flex flex-col gap-1 w-[95%] self-center">
            <Toast />

            <Form :resolver v-slot="$form" class="flex flex-col" @submit="onSubmitForm">
                <FormField initial-value="" v-slot="$field" name="title" class="flex flex-col mb-2">
                    <InputText autofocus v-model="title" :invalid="$field.invalid" class="w-full mb-2" type="text"
                        placeholder="Enter title" auto />
                    <Message v-if="$field.invalid" class="text-red-500 mb-2" severity="error" size="small">{{
                        $field.error?.message }}
                    </Message>
                </FormField>
                <FormField initial-value="" v-slot="$field" name="subtitle" class="flex flex-col mb-2">
                    <InputText v-model="subtitle" :invalid="$field.invalid" class="w-full mb-2" type="text"
                        placeholder="Enter subtitle" />
                    <Message v-if="$field.invalid" class="text-red-500 mb-2" size="small" severity="error">{{
                        $field.error?.message }}
                    </Message>
                </FormField>
                <FormField initial-value="" v-slot="$field" name="imgUrl" class="flex flex-col mb-2">
                    <InputText v-model="imgUrl" :invalid="$field.invalid" class="w-full mb-2" type="text"
                        placeholder="Enter img url here..." />
                    <Message v-if="$field.invalid" class="text-red-500 mb-2" severity="error" size="small">{{
                        $field.error?.message }}
                    </Message>
                </FormField>
                <FormField initial-value="" v-slot="$field" name="editorData" class="flex flex-col">
                    <Editor :invalid="$field.invalid" type="text"
                        :class="['w-full mb-2', { 'border border-red-500 rounded-[7px]': $field.invalid }]"
                        placeholder="Enter description here" name="editorData" v-model="editorData"
                        editorStyle="height: 320px" />
                    <Message v-if="$field.invalid" class="text-red-500 mb-2" severity="error" size="small">{{
                        $field.error?.message }}
                    </Message>
                </FormField>
                <Button type="submit"
                    class="font-semibold cursor-pointer bg-black rounded-sm rounded-md rounded-lg rounded-xl roundex-2xl text-white p-2 mt-10 w-[95%]">Post</Button>
            </Form>
        </div>

    </div>
</template>

<style>
.blog-box h1 {
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 10px;
}

.blog-box h2 {
    font-size: 1.5rem;
    font-weight: semi-bold;
    margin-bottom: 8px;
}

.blog-box p {
    font-size: 1rem;
    margin-bottom: 6px;
}
</style>
<!-- @click="postBlogsList(editorData)" -->