// stores/useBlogStore.js
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export const useBlogStore = defineStore('blogStore', () => {
  const editorValue = ref('');
  const posts = ref([]);
  const name = ref('');
  const email = ref('');
  const comment = ref('');
  const commentsObject = ref();
  const commentsList = ref([]);
  const route = useRouter()

  // const convertHTMLToObject = (htmlString) => {
  //   const parser = new DOMParser();
  //   const doc = parser.parseFromString(htmlString, "text/html");

  //   const title = doc.querySelector("h1")?.textContent || "";
  //   const descriptionNodes = doc.querySelectorAll("p");
  //   const description = Array.from(descriptionNodes)
  //     .map((p) => p.textContent)
  //     .join(" ");
  //   const img = doc.querySelector("img")?.src || "";
  //   const subtitle = doc.querySelector("h2")?.textContent || "";

  //   return {
  //     id: Date.now(),
  //     title,
  //     description,
  //     img,
  //     subtitle,
  //   };
  // };

  // const convertObjectToHTML = (obj) => {
  //   const { title, subtitle, description, img } = obj;

  //   const descriptionParagraphs = description
  //     .split(". ")
  //     .filter((line) => line.trim() !== "")
  //     .map((line) => `${line.trim()}`)
  //     .join("\n");

  //   const htmlString = `
  //       <h1>${title}</h1>
  //       <h2>${subtitle}</h2>
  //       <p><img src="${img}" alt="Image" />
  //       ${descriptionParagraphs}</p>
  //   `;
  //   return htmlString;
  // };

  const addBlogPosts = (htmlData) => {
    console.log('html data is ', htmlData);
    editorValue.value = htmlData;
    // const newPost = convertHTMLToObject(htmlData);
    const storedPosts = JSON.parse(localStorage.getItem('blogsList')) || [];
    storedPosts.push(htmlData);
    localStorage.setItem('blogsList', JSON.stringify(storedPosts));
    posts.value = storedPosts;
  };

  const getBlogPosts = () => {
    const stored = localStorage.getItem('blogsList');
    posts.value = stored ? JSON.parse(stored) : [];
    return posts.value;
  };

  const getBlogPostsById = (postId) => {
    const stored = localStorage.getItem('blogsList');
    if (stored) {
      const parsedPosts = JSON.parse(stored);
      const post = parsedPosts.find((p) => Number(p.id) === Number(postId));
      return post;
    }
    return null;
  };
  const postComment = (postId) => {
    const newComment = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      comment: comment.value,
    };
    const oldPosts = getBlogPosts();
    const currentPost = oldPosts.filter(
      (post) => Number(post.id) === Number(postId),
    );
    const updatedComments = currentPost.map((current) =>
      current.comments.push(newComment),
    );
    commentsList.value = updatedComments;
    localStorage.setItem('blogsList', JSON.stringify(oldPosts));
  };

  const getCommentByPost = (postId) => {
    const comments = getBlogPostsById(postId);
    console.log('type of comments', typeof comments);

    commentsList.value = comments
    
    console.log('blablabla', commentsList.value);
  };

  const editPostById = (postId, html) => {
    const blog = localStorage.getItem('blogsList');
    if (blog) {
      const blogsData = JSON.parse(blog);
      const currentPost = blogsData.find(
        (data) => Number(data.id) === Number(postId),
      );
      const remainingPosts = blogsData.filter(
        (data) => Number(data.id) !== Number(postId),
      );
      const updatedPost = html;
      remainingPosts.push(updatedPost);
      localStorage.setItem('blogsList', JSON.stringify(remainingPosts));
      posts.value = remainingPosts
    }
    setTimeout(() => {
      route.push('/')
    }, 2000)

  };

 
  return {
    editorValue,
    posts,
    name,
    email,
    comment,
    commentsObject,
    commentsList,
    addBlogPosts,
    getBlogPosts,
    getBlogPostsById,
    postComment,
    getCommentByPost,
    editPostById,
  };
});

export default useBlogStore;
