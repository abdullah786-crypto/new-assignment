<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import InputText from 'primevue/inputtext';
import useBlogStore from '@/stores/blogPostStore';
import CardComponent from '../../components/comment/comments.vue';
import { Form, FormField } from '@primevue/forms';
import { z } from 'zod';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { Textarea, useToast } from 'primevue';

const props = defineProps(['id', 'title', 'subtitle', 'description'])
const route = useRoute();
const router = useRouter();
const blogStore = useBlogStore();
const dataById = ref();
const postId = ref('');
const toast = useToast();

onMounted(() => {
    postId.value = route.params.id
    console.log('post id is', postId.value);
    dataById.value = blogStore.getBlogPostsById(postId.value);
    blogStore.getCommentByPost(postId.value)
})

const gotToUpdatePostPage = (id) => {
    router.push(`/update-post/${id}`)
}
const resolver = zodResolver(
    z.object({
        username: z.string().min(1, { message: "User's name is required" }),
        userEmail: z.string().min(1, { message: "User's email is required" }).regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'Email is not valid please enter valid email' }),
        comment: z.string().min(1, { message: "This field is required" })
    })
)
const onSubmitForm = ({ valid }) => {
    if (valid) {
        blogStore.postComment(postId.value)
        blogStore.comment = '',
            blogStore.name = '',
            blogStore.email = ''
        toast.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Comment added successfully',
            life: 3000,
        })
    }
}

</script>

<template>

    <div class="p-10">
        <div class="mt-20">
            <h1 class="text-[30px] text-xl text-lg text-2xl font-bold text-center">{{ dataById?.title }}</h1>
            <Button @click="gotToUpdatePostPage(postId)"
                class="font-semibold bg-black text-center text-white w-[150px] p-2 rounded-lg rounded-sm rounded-xl cursor-pointer self-end">
                Edit Post</Button>
        </div>
        <h2 class="text-[20px] text-xl text-lg text-2xl font-semibold text-gray-500 text-center">{{ dataById?.subtitle
        }}</h2>
        <img :src="dataById?.imgUrl" :style="{ width: '100%' }"
            class="shadow-xl rounded-lg rounded-xl rounded-md mt-10 h-60 object-cover mb-10" />
        <p class="text-justify whitespace-normal break-words text-wrap" v-html="dataById?.description"></p>
    </div>
    <div class="p-10 ">
        <h1 class="mb-10 text-[30px] text-xl text-lg text-2xl font-bold text-center">All Comments list</h1>
        <div class="overflow-y-auto h-100" v-if="blogStore.commentsList.length > 0">
            <div v-for="(newComment, index) in blogStore.commentsList">
                <CardComponent :email="newComment.email" :name="newComment.name" :comment="newComment.comment" />
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
                <Form v-slot="$form" class="flex flex-col" :resolver @submit="onSubmitForm">
                    <FormField v-slot="$field" name="username" initial-value="" class="flex flex-col">
                        <InputText autofocus :invalid="$field.invalid" class="mb-2" placeholder="Enter your name"
                            v-model="blogStore.name" />
                        <Message class="text-red-500 mb-2" v-if="$field.invalid" severity="error" size="small"
                            variant="simple">{{
                                $field.error?.message }}</Message>
                    </FormField>
                    <FormField v-slot="$field" name="userEmail" initial-value="" class="flex flex-col">
                        <InputText :invalid="$field.invalid" class="mb-2" placeholder="Enter your email"
                            v-model="blogStore.email" />
                        <Message class="text-red-500 mb-2" v-if="$field.invalid" severity="error" size="small"
                            variant="simple">{{
                                $field.error?.message }}</Message>
                    </FormField>
                    <FormField v-slot="$field" name="comment" initial-value="" class="flex flex-col">
                        <Textarea :invalid="$field.invalid" class="mb-2" style="resize: none;" rows="5"
                            placeholder="Write your comment here...!!" v-model="blogStore.comment" />
                        <Message class="text-red-500 mb-2" v-if="$field.invalid" severity="error" size="small"
                            variant="simple">{{
                                $field.error?.message }}</Message>
                    </FormField>
                    <Button type="submit"
                        class="font-semibold bg-black text-center mt-5 cursor-pointer text-white w-[150px] p-2 rounded-lg rounded-sm rounded-xl cursor-pointer self-center w-full">
                        Comment</Button>
                </Form>
            </div>
        </div>
    </div>
</template>