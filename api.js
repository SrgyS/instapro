const personalKey = 'sergei-stepanov';
const baseHost = 'https://webdev-hw-api.vercel.app';
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
    return fetch(postsHost, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error('Нет авторизации');
            }

            return response.json();
        })
        .then((data) => {
            return data.posts;
        });
}

export function registerUser({ login, password, name, imageUrl }) {
    return fetch(baseHost + '/api/user', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
            name,
            imageUrl,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Этот login занят');
        }
        return response.json();
    });
}

export function loginUser({ login, password }) {
    return fetch(baseHost + '/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            login,
            password,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Неверный логин или пароль');
        }
        return response.json();
    });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
    const data = new FormData();
    data.append('file', file);

    return fetch(baseHost + '/api/upload/image', {
        method: 'POST',
        body: data,
    }).then((response) => {
        return response.json();
    });
}

// Получает посты конкретного пользователя
export function getUserPosts({ token, id }) {
    return fetch(postsHost + '/user-posts/' + id, {
        method: 'GET',
        headers: {
            Authorization: token,
        },
    })
        .then((response) => {
            if (response.status === 401) {
                throw new Error('Нет авторизации');
            }

            return response.json();
        })
        .then((data) => {
            return data.posts;
        });
}
// Добавляет пост
export function addPost({ description, imageUrl, token }) {
    return fetch(postsHost, {
        method: 'POST',
        headers: {
            Authorization: token,
        },
        body: JSON.stringify({
            description,
            imageUrl,
        }),
    }).then((response) => {
        if (response.status === 400) {
            throw new Error('Отсутствует фото или описание');
        }
        if (response.status === 401) {
            throw new Error('Нет авторизации');
        }
        return response.json();
    });
}

//  Добавляет лайк

export function addLike({ token, id }) {
    return fetch(postsHost + '/' + id + '/like', {
        method: 'POST',
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        return response.json();
    });
}

//  Удаляет лайк

export function removeLike({ token, id }) {
    return fetch(postsHost + '/' + id + '/dislike', {
        method: 'POST',
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        return response.json();
    });
}
//  Удаляет пост

export function deletePost({ token, id }) {
    return fetch(postsHost + '/' + id, {
        method: 'DELETE',
        headers: {
            Authorization: token,
        },
    }).then((response) => {
        return response.json();
    });
}
