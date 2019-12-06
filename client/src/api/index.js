import axios from 'axios';

class Api {

    constructor() {
        axios.defaults.headers.post['Content-Type'] = 'application/json';
    }


    get(url) {
        return axios.get(url);
    }

    post(url, body) {

        const jsonBody = JSON.stringify(body);

        return axios.post(url, jsonBody);
    }

    put(url, body) {
        const jsonBody = JSON.stringify(body);
        return axios.put(url, jsonBody);
    }

    delete(url) {
        return axios.delete(url);
    }
}

export const api = new Api();
