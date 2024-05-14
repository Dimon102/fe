import axios from "axios";

const NEWS_BASE_REST_API_URL = 'http://localhost:8081/news';
const AUTH_BASE_REST_API_REG = 'http://localhost:8081/registration';
const AUTH_BASE_REST_API_AUTH = 'http://localhost:8081/auth';
const BASE_REST_API = 'http://localhost:8081';

class NewsService {
    getAllNews() {
        return axios.get(NEWS_BASE_REST_API_URL)
    }

    getAllNewsByTags(tags) {
        return axios.get(NEWS_BASE_REST_API_URL + '/sort?tags=' + tags)
    }

    getAllNewsByDateBetween(start, end) {
        return axios.get(NEWS_BASE_REST_API_URL + '/sort_date?start=' + start + '&end=' + end)
    }

    getAllNewsByTagDateLimit(tags, limit) {
        return axios.get(NEWS_BASE_REST_API_URL + '/sort_all?tags=' + tags + '&limit=' + limit)
    }

    generateReport(tags, start, end, limit, token) {
        return axios.get(NEWS_BASE_REST_API_URL + '/report?tags=' + tags + '&start=' + start + '&end=' + end +
            '&limit=' + limit, { headers: {Authorization: 'Bearer ' + token } });
    }

    createNews(news) {
        return axios.post(NEWS_BASE_REST_API_URL, news);
    }

    updateNews(news) {
        console.log(news);
        return axios.put(NEWS_BASE_REST_API_URL, news);
    }

    deleteNews(id) {
        return axios.delete(NEWS_BASE_REST_API_URL + `/${id}`);
    }

    registration(username, password, confPassword) {
        return axios.post(AUTH_BASE_REST_API_REG, {
            'username': username,
            'password' : password,
            'confirmPassword' : confPassword
        });
    }

    auth(username, password) {
        return axios.post(AUTH_BASE_REST_API_AUTH, {
            'username': username,
            'password' : password
        });
    }

    getRoles(token) {
        return axios.get(BASE_REST_API + '/get_roles?token=' + token)
    }
}

export default new NewsService();