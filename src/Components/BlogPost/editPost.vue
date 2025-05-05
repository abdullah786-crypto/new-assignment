<script setup>

import Editor from 'primevue/editor';
import Button from 'primevue/button';
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useBlogStore from '@/State managment/blogPostStore';
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import Quill from 'quill'

const blogStore = useBlogStore()
const postId = ref('');
const data = ref('')
const router = useRouter()
const goHomePage = () => {
    router.push('/')
}

onMounted(() => {
    postId.value = useRoute().params.id
    console.log('id is ', postId.value);
    const html = blogStore.convertObjectToHTML(blogStore.getBlogPostsById(postId.value))
    data.value = html
    console.log('data is ', data.value);

    // blogStore.editPostById(postId)

})

</script>

<template>
    <div class="mainDiv">
        <div class="w-[60%] h-auto">
            <div class="flex flex-row text-center items-center">
                <Button class="bg-black m-[0] text-white p-2 mt-10" label="Back Home" @click="goHomePage" />
                <h1
                    class="ml-[160px] justify-self-center place-content-center m-[0] text-center text-5xl text-[#000638] font-bold">
                    Update Blog</h1>
            </div>
            <div class="card mt-10 flex flex-col gap-1 w-[95%] self-center">
                <Editor v-model="data" editorStyle="height: 320px" />
            </div>
            <Button @click="blogStore.editPostById(postId, data)" class="bg-black text-white p-2 mt-10 w-[95%]"
                label="Update" />
        </div>
    </div>
</template>