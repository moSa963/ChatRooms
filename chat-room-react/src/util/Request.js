export const APP_URL = "/"; // "http://127.0.0.1:8000/";
export const TOKEN = null; // "Bearer 1|fV5ggsu2Xp53OdoZmMGU4f5jZ0cZ3BMKIE7HYS5P";


function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }

    return "";
}

export const getCsrf = () => {
    return getCookie('XSRF-TOKEN');
}

const getHeader = () => {
    const headers = {
        'Accept': "application/json",
    };

    TOKEN && (headers['Authorization'] = TOKEN);
    !TOKEN && (headers['X-XSRF-TOKEN'] = getCsrf());

    return headers;
}

const request = (url = APP_URL, method = "GET", data = null, controller) => {
    var body = {};

    if (data && method !== 'GET') {
        var form = new FormData();

        if (typeof (data) === "object") {
            Object.keys(data).forEach(key => {
                if (Array.isArray(data[key])) {
                    data[key].forEach((e) => {
                        form.append(key + "[]", e);
                    });
                } else {
                    form.append(key, data[key]);
                }
            });
        } else {
            form = data;
        }

        body["body"] = form;
    }

    body["headers"] = getHeader();
    body["method"] = method;

    controller && (body["signal"] = controller.signal);

    if (!url.match(/^https?:/s)) {
        url = APP_URL + url;
    }

    return fetch(url, body);
}


export const requestWithProgress = (
    url = APP_URL,
    form,
    progressEvent,
    onDone,
    onError,
) => {
    if (!url.match(/^https?:/s)) {
        url = APP_URL + url;
    }

    const ajax = new XMLHttpRequest();

    ajax.upload.addEventListener('progress', progressEvent, false);

    ajax.addEventListener("load", (e) => {
        if (e.target.status === 201) {
            return onDone(JSON.parse(e.target.response));
        }
        return onError(JSON.parse(e.target.response)?.message, true);
    }, false);

    ajax.addEventListener("error", (e) => onError(e.target.statusText), false);
    ajax.addEventListener("abort", (e) => onDone(null), false);

    ajax.open('POST', url, true);

    !TOKEN && ajax.setRequestHeader('X-XSRF-TOKEN', getCookie('XSRF-TOKEN'));
    TOKEN && ajax.setRequestHeader('Authorization', TOKEN);
    ajax.setRequestHeader('Accept', 'application/json');
    !TOKEN && (ajax.withCredentials = true);
    ajax.send(form);

    return ajax;
}


export default request;