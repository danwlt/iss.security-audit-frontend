import axios from 'axios';

export default {
    async get(url) {
        const response = await axios.get(url);
        return response;
    },
    async authenticatedGet(url, token) {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    },
    async authenticatedDelete(url, token) {
        const response = await axios.delete(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    }
}