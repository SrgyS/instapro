import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user, getToken } from "../index.js";
import { USER_POSTS_PAGE } from "../routes.js";
import { initLikeButtons, formatDateDistanceToNow } from "../helpers.js";
import { addLike, removeLike, deletePost } from "../api.js";

export function  renderUserPostsPageComponent({appEl}) {
    console.log("Актуальный список постов:", posts);

    const postsHTML = posts
    .map((post) => {
      const likedUserNames = post.likes.map(like => like.name)
      return `  <li class="post">
      <div class="post-header" data-user-id="${post.user.id}">
          <img src="${post.user.imageUrl}" class="posts-user-header__user-image">
          <p class="post-header__user-name">${post.user.name}</p>
      </div>
      <div class="post-image-container">
      <img class="heart heart-like" src="./assets/images/heart-like.svg" alt="heart">
        <img class="post-image" src="${post.imageUrl}">
      </div>
      <div class="post-likes">
        <button data-post-id="${post.id}" class="like-button">
          <img src="./assets/images/${post.isLiked ? 'like-active.svg' : 'like-not-active.svg'}"> 
        </button>
        <p class="post-likes-text">
          Нравится: <strong>${likedUserNames.length ? likedUserNames[0] : 0} </strong>
          ${likedUserNames.length > 1 ? `и <strong>еще ${likedUserNames.length - 1}</strong>`: ''}
        </p>
      </div>
      ${user && user._id === post.user.id ? `<button class="delete-button button
      ">Удалить</button>`: ""}
      <div class="form-error"></div>
      <p class="post-text">
        <span class="user-name">${post.user.name}</span>
        ${decodeURIComponent(post.description)}
      </p>
      <p class="post-date">
      ${formatDateDistanceToNow(new Date(post.createdAt))}
      </p>
    </li>`
    })
    .join("")
    
      /**
       * TODO: чтобы отформатировать дату создания поста в виде "19 минут назад"
       * можно использовать https://date-fns.org/v2.29.3/docs/formatDistanceToNow
       */
      const appHtml = `
                  <div class="page-container">
                    <div class="header-container"></div>
                    <ul class="posts">
                     ${postsHTML}
                    </ul>
                  </div>`;
    
      appEl.innerHTML = appHtml;
    
      renderHeaderComponent({
        element: document.querySelector(".header-container"),
      });
    
      for (let userEl of document.querySelectorAll(".post-header")) {
        userEl.addEventListener("click", () => {
          goToPage(USER_POSTS_PAGE, {
            userId: userEl.dataset.userId,
          });
        });
      }
      initLikeButtons(posts, user, addLike, removeLike)
const deleteButtonElements = document.querySelectorAll(".delete-button")

deleteButtonElements.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.stopPropagation();
    const postId = button.parentElement.querySelector('.like-button').dataset.postId;

    deletePost({token: getToken(), id: postId})
    .then(() => {
      // загружаем посты пользователя после удачного удаления
      goToPage(USER_POSTS_PAGE, {
        userId: user._id
      });
    })
    .catch((error) => {
      setError("Не удалось удалить пост");
      console.error(error);
    });
   
    
    })
  })
}

    
