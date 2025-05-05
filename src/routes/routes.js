import AddNewPost from "@/Components/BlogPost/addNewPost.vue";
import BlogDetails from "@/Components/BlogPost/blogDetails.vue";
import EditPost from "@/Components/BlogPost/editPost.vue";
import MainFile from "@/Components/mainFile.vue";
import { createWebHistory, createRouter } from "vue-router";

export const routes = [
    {
        path: '/',
        name: 'home',
        component: MainFile,
    },
    {
        path: '/add-new-post',
        name: 'addNewPost',
        component: AddNewPost,
    },
    {
        path: '/blog-details/:id',
        name: 'blog-details',
        component: BlogDetails,
    },
    {
        path: '/update-post/:id',
        name: 'update-post',
        component: EditPost,
    }
];

const routers = createRouter({
    history: createWebHistory(),
    routes
})

export default routers;
