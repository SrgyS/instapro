import { getToken} from "./index.js";
// import { formatDistanceToNow } from "date-fns";
// import ru from "date-fns/locale/ru";

export function saveUserToLocalStorage(user) {
  window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch (error) {
    return null;
  }
}

export function removeUserFromLocalStorage(user) {
  window.localStorage.removeItem("user");
}

export function initLikeButtons(posts, user, addLike, removeLike) {
  const elements = document.querySelectorAll(".like-button, .post-image");

  elements.forEach((element, index) => {
    const eventType = element.classList.contains("like-button") ? "click" : "dblclick";
    
    element.addEventListener(eventType, (event) => {
      event.stopPropagation();

      if (user) {
        const isLikeButton = element.classList.contains("like-button");
        const isPostImage = element.classList.contains("post-image");
        let postId;
  
        const postEl = element.closest(".post");
        postId = postEl.querySelector(".like-button").dataset.postId;
  
        const post = posts.find((post) => post.id === postId);
        post.isLiked = !post.isLiked;
        
        if (isPostImage) {
          
          const heartEl = postEl.querySelector(".heart")
          heartEl.src = `./assets/images/${post.isLiked ? "heart-like.svg" : "heart-dislike.svg"}`;
          heartEl.classList.add("puff-in-center")
         setTimeout(()=>{
          heartEl.classList.remove("puff-in-center")
         }, 1000);
         }
        
         const userIndex = post.likes.findIndex((like) => like.name === user.name);

        if (post.isLiked) {
          if (userIndex === -1) {
            post.likes.push({ name: user.name });
          }
        } else {
          if (userIndex !== -1) {
            post.likes.splice(userIndex, 1);
          }
        }

        let likedUserNames = post.likes.map((like) => like.name);

        // Обновить элемент HTML с новыми данными
        const likeCountElement = postEl.querySelector(".post-likes-text");
        likeCountElement.innerHTML = `Нравится: <strong>${likedUserNames.length ? likedUserNames[0] : 0}</strong>
          ${likedUserNames.length > 1 ? `и <strong>еще ${likedUserNames.length - 1}</strong>` : ""}`;

        // Изменить путь к изображению лайка
        const likeImageElement = postEl.querySelector(".like-button img");
        likeImageElement.src = `./assets/images/${post.isLiked ? "like-active.svg" : "like-not-active.svg"}`;

        if (post.isLiked) {
          // Вызвать функцию добавления лайка
          addLike({ token: getToken(), id: postId });
        } else {
          // Вызвать функцию удаления лайка
          removeLike({ token: getToken(), id: postId });
        }
      } else {
        const setError = (message) => {
          element.parentNode.parentNode.querySelector(".form-error").textContent = message;
        };
        setError("Лайки могут ставить только авторизованные пользователи");
      }
    });
  });
}