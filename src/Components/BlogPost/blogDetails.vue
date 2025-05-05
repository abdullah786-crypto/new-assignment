<script setup>

import { ref, onMounted, computed } from 'vue';
import useBlogStore from '@/State managment/blogPostStore';
import { useRoute, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import Card from 'primevue/card';
import Button from 'primevue/button';

const route = useRoute();
const router = useRouter();

const blogStore = useBlogStore();
const dataById = ref();
const postId = ref('')

onMounted(() => {
    postId.value = route.params.id
    dataById.value = blogStore.getBlogPostsById(postId.value);
    blogStore.getCommentByPost(postId.value)
    console.log('On mount is called', dataById.value);
})

const gotToUpdatePostPage = (id) => {
    console.log('clicked to edit post button', dataById.value)
    router.push({ name: 'update-post', query: dataById})
}


const props = defineProps(['id', 'title', 'subtitle', 'description'])

</script>

<template>

    <div class="p-10">
        <div>
            <h1 class="text-[30px] text-xl text-lg text-2xl font-bold text-center">{{ dataById?.title }}</h1>
            <Button @click="gotToUpdatePostPage(postId)"
                :class="'bg-black text-center text-white w-[150px] p-2 rounded-lg rounded-sm rounded-xl cursor-pointer self-end'">
                <span class="p-button-label">Edit Post</span>
            </Button>
        </div>
        <h2 class="text-[20px] text-xl text-lg text-2xl font-semibold text-gray-500 text-center">{{ dataById?.subtitle
        }}</h2>
        <img :src="dataById?.img" :style="{ width: '100%' }" class="shadow-xl rounded-lg rounded-xl rounded-md mt-10 h-60 object-cover" />
        <p>{{ dataById?.description }}</p>
    </div>
    <div class="p-10 ">
        <h1 class="mb-10 text-[30px] text-xl text-lg text-2xl font-bold text-center">All Comments list</h1>
        <div v-if="blogStore.commentsList.length > 0">
            <div v-for="(newComment, index) in blogStore.commentsList">
                <div
                    class="border-gray-200 p-5 m-0 m-[0px] mb-0 bg-grey-400 flex flex-col items-center overflow-auto overflow-y-auto content-center max-h-450px min-h-auto mb-40 justify-center ">
                    <Card class="border-gray-200 w-[100%] m-0 m-[0px] mb-0 shadow-lg shadow-xl shadow-2xl shadow-md">
                        <template #title>{{ newComment.name }}</template>
                        <template #subtitle>{{ newComment.email }}</template>
                        <template #content>
                            <p class="m-0">
                                {{ newComment.comment }}
                            </p>
                        </template>
                    </Card>
                </div>
            </div>
        </div>
        <div class="bg-grey-500 mb-10 text-[15px] text-xl text-lg text-2xl font-bold text-center" v-else>
            <h3>Sorry no any comment yet</h3>
        </div>
        <h1 class="mt-10 mb-10 text-[30px] text-xl text-lg text-2xl font-bold text-center">
            Comments
        </h1>
        <div class="flex flex-row items-center content-center mb-40 justify-center">
            <div class="flex flex-col gap-2 w-[50%]">
                <InputText name="username" type="text" placeholder="Your Name" v-model="blogStore.name" />
                <InputText name="userEmail" type="text" placeholder="email" v-model="blogStore.email" />
                <InputText name="comment" type="text" placeholder="Write your comment here...!!"
                    v-model="blogStore.comment" />
                <Button @click="blogStore.postComment(postId)" class="w-[100%] mt-10" label="Post Comment" />
            </div>
        </div>

    </div>

</template>

<style></style>