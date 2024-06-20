
import axios from 'axios';

export default {
    getItems() {
        return axios.get('/api/items');
    },
    softDeleteItem(id) {
        return axios.get(`/api/items/${id}`);
    },
    restoreItem(id) {
        return axios.patch(`/api/items/${id}/restore`);
    },
    getTrashedItems() {
        return axios.get('/api/items/trashed');
    }
};
