import { USER_POSTS_PAGE} from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, user } from "../index.js";
import { initLikeButtons, formatDateDistanceToNow} from "../helpers.js";
import { addLike, removeLike } from "../api.js";

export function renderPostsPageComponent({ appEl }) {

  // TODO: реализовать рендер постов из api
  console.log("Актуальный список постов:", posts);

const postsHTML = posts
.map((post) => {
  const likedUserNames = post.likes.map(obj => obj.name)

  return `  <li class="post">
  <div class="post-header" data-user-id="${post.user.id}">
      <img src="${post.user.imageUrl}" class="post-header__user-image">
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
      console.log(userEl.dataset.userId)
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }
initLikeButtons(posts, user, addLike, removeLike)
    };

  

