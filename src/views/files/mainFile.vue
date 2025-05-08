<script setup>
import '../../assets/main.css';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import useBlogStore from '@/stores/blogPostStore';
import BlogPost from '@/views/files/blogPost.vue';
import Paginator from 'primevue/paginator';

const router = useRouter();
const newBlogStore = useBlogStore()

const blogsList = ref('')
onMounted(() => {
    blogsList.value = newBlogStore.getBlogPosts()
    newBlogStore.getBlogPosts();
    console.log('items are', newBlogStore.getBlogPosts());
});

const goAddNewPost = () => {
    router.push('/add-new-post')
}

const searchValue = ref('')
const { posts } = storeToRefs(newBlogStore);
const filteredList = computed(() =>
    posts.value.filter((filteredData) =>
        filteredData.title?.toLowerCase().includes(searchValue.value.toLowerCase())
    )
);
const currentPage = ref(1);
const rowsPerPage = ref(20);

const paginatedData = computed(() => {
    const start = (currentPage.value - 1) * rowsPerPage.value;
    const end = start + rowsPerPage.value;
    return filteredList.value.slice(start, end);
});

const onPageChange = (event) => {
    currentPage.value = event.page + 1;
    rowsPerPage.value = event.rows;
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>

<template>

    <div v-bind:class="'mainDiv'">
        <div>
            <h1 class="mainHeading">The Food Ninja Blog App
                <!-- <Button label="Add Post" /> -->
            </h1>
            <p v-bind:class="'subHeader'">A blog about food, experiences, and recipes</p>
            <div class="flex flex-row items-center justify-between w-full">
                <input v-model="searchValue"
                    class="shadow-xl hover:shadow-xl focus:shadow-xl focus:border-current w-[400px] mb-5 mt-5 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
                    placeholder="Search Post here...">
                <Button @click="goAddNewPost"
                    class="font-semibold border-none outline-none  focus:outline-none shadow-xl bg-black text-center text-white w-[150px] p-2 rounded-lg rounded-sm rounded-xl cursor-pointer cursor-pointer">
                    Add Post
                </Button>
            </div>
        </div>
        <div :style="{ minWidth: 'auto', maxWidth: '100%' }"
            class="grid x-sm:grid-col-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-10 mt-10">
            <div v-for="(blog, index) in paginatedData" :key="index" :class="'w-full'">
                <BlogPost :date="blog.date" :time="blog.time" :comments="blog.comments" :id="blog.id" :title="blog.title" :imgUrl="blog.imgUrl" :subtitle="blog.subtitle"
                    :index="index" />
            </div>
        </div>
        <Paginator @page="onPageChange" :first="(currentPage - 1) * rowsPerPage" :rows="rowsPerPage"
            :totalRecords="filteredList.length" :rowsPerPageOptions="[10, 20, 30]" class="mt-20" />
    </div>


</template>
<style>
.mainDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
    height: auto;
    margin: 10% 20px 150px 20px;
    justify-content: center;
    align-items: center;
}

.mainHeading {
    font-size: 48px;
    color: #000638;
    font-weight: 700;
    margin: 0px;
}

.subHeader {
    color: #605C59;
    font-size: 20px;
    font-weight: 400;
}

.searchField {
    width: 20%;
    margin-top: 20px;
    height: 50px;
    padding-left: 20px;
    border-radius: 10px;
}

::v-deep(.p-button) {
    border: none;
}
</style>