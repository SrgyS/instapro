import { getToken} from "./index.js";
import { formatDistanceToNow } from "date-fns";
import ru from "date-fns/locale/ru";

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

export function initLikeButtons (posts, user, addLike, removeLike) {
  const likeButtonElements = document.querySelectorAll(".like-button")

  

    likeButtonElements.forEach((button, index) => {
      button.addEventListener("click", (event) => {
        event.stopPropagation()
        
        if (user) {
          const postId = button.dataset.postId;
          const post = posts.find((post) => post.id === postId)
          post.isLiked = !post.isLiked
  
          console.log(post.likes)
          const userIndex = post.likes.findIndex((like) => like.name === user.name)
  
          if (post.isLiked) {
            if (userIndex === -1) {
              post.likes.push({name: user.name})
            }
           } else {
            if (userIndex !== -1) {
              post.likes.splice(userIndex, 1)
            }
          }
          let likedUserNames = post.likes.map(like => like.name)
          console.log(likedUserNames)
          // Обновить элемент HTML с новыми данными
      const likeCountElement = button.parentNode.querySelector(".post-likes-text");
      likeCountElement.innerHTML = 
                          `Нравится: <strong>${likedUserNames.length ? likedUserNames[0] : 0}</strong>
                          ${likedUserNames.length > 1 ? `и <strong>еще ${likedUserNames.length - 1}</strong>`: ''}`;
  
      // Изменить путь к изображению лайка
      const likeImageElement = button.querySelector("img");
      likeImageElement.src = `./assets/images/${post.isLiked ? 'like-active.svg' : 'like-not-active.svg'}`;
  
      if (post.isLiked) {
        // Вызвать функцию добавления лайка
        addLike({ token: getToken(), id: postId });
      } else {
        removeLike({ token: getToken(), id: postId });
        // Вызвать функцию удаления лайка
      } 

        } else {
          const setError = (message) => {
            button.parentNode.parentNode.querySelector(".form-error").textContent = message;
          };
         setError('Лайки могут ставить только авторизованные пользователи')
        }
       
        
  }
      )        
  })
}

export const formatDateDistanceToNow = (date) => {
  return formatDistanceToNow(date, { locale: ru, addSuffix: true })
}