import { addPost } from "../api.js";
import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";
import {getToken} from "../index.js"

export function renderAddPostPageComponent({ appEl, onAddPostClick, getToken }) {
  let imageUrl = "";
  const render = () => {
    // TODO: Реализовать страницу добавления поста
    const appHtml = `
    <div class="page-container">
      <div class="header-container">
      </div>
      <div class="form">
        <h3 class="form-title">Добавить пост</h3>
        <div class="form-inputs">
          <div class="upload-image-container">
  <div class="upload=image">
      
            <label class="file-upload-label secondary-button">
                <input type="file" class="file-upload-input" style="display:none">
                Выберите фото
            </label>
             
  </div>
</div>
          <label>
            Опишите фотографию:
            <textarea class="input textarea" rows="4"></textarea>
            </label>
            <div class="form-error"></div>
            <button class="button" id="add-button">Добавить</button>
        </div>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const setError = (message) => {
      appEl.querySelector(".form-error").textContent = message;
    };

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    } 

    document.getElementById("add-button").addEventListener("click", () => {
      setError("");

      const description = document.querySelector(".textarea").value

      if (!imageUrl) {
        setError("Не выбрана фотография");
        return;
      }

      if (!description) {
        setError("Добавьте описание к фото");
        return;
      }
     

      onAddPostClick({
        description: description,
        imageUrl: imageUrl,
      });

      // addPost({description: description, imageUrl: imageUrl, token})
    });
  };

  render();
}
