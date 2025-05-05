<script setup>
import Editor from 'primevue/editor';
import Button from 'primevue/button';
import { ref, onMounted } from 'vue';
import useBlogStore from '@/State managment/blogPostStore';
import SplitButton from 'primevue/splitbutton';
import { useRouter } from 'vue-router';
import { useToast } from "primevue/usetoast";
const router = useRouter();

const newBlogStore = useBlogStore();
const editorData = ref("");
const toast = useToast();


const postBlogsList = (data) => {
    newBlogStore.addBlogPosts(data);
    toast.add({
        severity: 'success',
        summary: 'Blog Post',
        detail: 'Post is upload successfully'
    })
};
const goHomePage = () => {
    router.push('/')
}

onMounted(() => newBlogStore.getBlogPosts())
</script>

<template>
    <div class="mainDiv">
        <div class="w-[60%] h-auto">
            <div class="flex flex-row text-center items-center">
                <Button class="bg-black m-[0] text-white p-2 mt-10" label="Back Home" @click="goHomePage" /> 
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
                <h1 class="justify-self-center place-content-center m-[0] text-center text-5xl text-[#000638] font-bold">Add New Blog</h1>
            </div>
            <div class="card mt-10 flex flex-col gap-1 w-[95%] self-center">
                <Editor v-model="editorData" editorStyle="height: 320px" />
            </div>
            <Button @click="postBlogsList(editorData)" class="bg-black text-white p-2 mt-10 w-[95%]" label="Post" />
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