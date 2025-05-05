// stores/useBlogStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useBlogStore = defineStore("blogStore", () => {
  const editorValue = ref("");
  const posts = ref([]);
  const name = ref("");
  const email = ref("");
  const comment = ref("");
  const commentsObject = ref();
  const commentsList = ref([]);

  const convertHTMLToObject = (htmlString) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const title = doc.querySelector("h1")?.textContent || "";
    const descriptionNodes = doc.querySelectorAll("p");
    const description = Array.from(descriptionNodes)
      .map((p) => p.textContent)
      .join(" ");
    const img = doc.querySelector("img")?.src || "";
    const subtitle = doc.querySelector("h2")?.textContent || "";
    console.log("descriptipon is", description);

    return {
      id: Date.now(),
      title,
      description,
      img,
      subtitle,
    };
  };

  const convertObjectToHTML = (obj) => {
    const { title, subtitle, description, img } = obj;

    const descriptionParagraphs = description
      .split(". ")
      .filter((line) => line.trim() !== "")
      .map((line) => `${line.trim()}`)
      .join("\n");

    const htmlString = `
        <h1>${title}</h1>
        <h2>${subtitle}</h2>
        <p><img src="${img}" alt="Image" />
        ${descriptionParagraphs}</p>
    `;
    return htmlString;
  };

  const addBlogPosts = (htmlData) => {
    editorValue.value = htmlData;
    console.log('HTML data is', htmlData);
    
    const newPost = convertHTMLToObject(htmlData);
    const storedPosts = JSON.parse(localStorage.getItem("blogsList")) || [];
    storedPosts.push(newPost);
    localStorage.setItem("blogsList", JSON.stringify(storedPosts));
    posts.value = storedPosts;
    console.log("posted succefully", posts.value);
  };

  const getBlogPosts = () => {
    const stored = localStorage.getItem("blogsList");
    posts.value = stored ? JSON.parse(stored) : [];
    return posts.value;
  };

  const getBlogPostsById = (postId) => {
    const stored = localStorage.getItem("blogsList");
    if (stored) {
      const parsedPosts = JSON.parse(stored);
      console.log("parsed posts", parsedPosts);
      const post = parsedPosts.find((p) => Number(p.id) === Number(postId));
      return post;
    }
    return null;
  };
  const postComment = (postId) => {
    console.log("post id in postComment is", postId);
    const newComment = {
      id: Date.now(),
      name: name.value,
      email: email.value,
      comment: comment.value,
    };

    const oldComments =
      JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
    oldComments.push(newComment);
    localStorage.setItem(`comments-${postId}`, JSON.stringify(oldComments));
    commentsList.value = oldComments;
    console.log("Updated comments list:", commentsList.value);
  };

  const getCommentByPost = (postId) => {
    console.log("post id is ", postId);
    const storedComments =
      JSON.parse(localStorage.getItem(`comments-${postId}`)) || [];
    commentsList.value = storedComments;
    console.log("Fetched comments:", commentsList.value);
  };
  const editPostById = (postId, html) => {
    console.log("post id is in editPostById", postId);
    console.log('HTML data is', html);
    
    const blog = localStorage.getItem('blogsList');
    if (blog) {
      const blogsData = JSON.parse(blog);
  
      const updatedPost = convertHTMLToObject(html);
      updatedPost.id = Number(postId);
  
      const updatedBlogs = blogsData.map((blg) =>
        Number(blg.id) === Number(postId) ? updatedPost : blg
      );
  
      localStorage.setItem('blogsList', JSON.stringify(updatedBlogs));
      posts.value = updatedBlogs;
    }
  };
  

  // const editPostById = (postId, html) => {
  //   console.log("post id is in editPostById", postId);
  //   console.log('HTML data is', html);
    
  //   const blog = localStorage.getItem('blogsList');
  //   if (blog) {
  //     const blogsData = JSON.parse(blog);
  //     var blogsById = blogsData.find(blg => Number(blg.id) === Number(postId.value))
  //     const filteredArray = blogsData.filter((blgs) => blgs.id !== postId)

  //           // ok here till
  //       const convertedObject = convertHTMLToObject(html);
  //       filteredArray =  convertedObject
  //       console.log('converted object is', c);
        
  //       // blogsById = convertedObject;
  //       // console.log('Blogs by id is', blogsById);
  //       localStorage.setItem('blogsList', JSON.stringify(filteredArray))
  //       posts.value = filteredArray;
  //   }    
  // };
  // const postComment = (postId) => {
  //   console.log("post id in postComment is", postId);

  //   commentsList.value.push({
  //     id: Date.now(),
  //     name: name.value,
  //     email: email.value,
  //     comment: comment.value,
  //   });
  //   console.log('comments list is', commentsList.value);

  //   const data = localStorage.setItem(`comments-${postId}`, commentsList.value);
  //   // console.log("comments list is", commentsList.value);
  //   console.log('data variable print in postComment', data);

  // };
  // const getCommentByPost = (postId) => {
  //   console.log('post id is ', postId);

  //   const newCommentsList = localStorage.getItem(`comments-${postId}`)
  //   commentsList.value.push(JSON.parse(JSON.stringify(newCommentsList)))
  //   console.log('comments list is in comments', commentsList.value);

  // };

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
    convertObjectToHTML,
    editPostById
  };
});

export default useBlogStore;
