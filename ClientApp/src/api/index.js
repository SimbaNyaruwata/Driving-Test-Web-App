import axios from 'axios';

export const BASE_URL = 'http://localhost:5269/';

export const ENDPOINTS = {
    participant: 'participant',
    question: 'questions',
    getAnswers: 'questions/getanswers'
}
export const createAPIEndpoint = (endpoint) => {

    const url = BASE_URL + 'api/' + endpoint + '/';
    return {
        fetch: () => axios.get(url),
        fetchById: (id) => axios.get(url + id),
        post: (newRecord) => axios.post(url, newRecord),
        put: (id, updatedRecord) => axios.put(url + id, updatedRecord),
        delete: (id) => axios.delete(url + id),
    };

}

