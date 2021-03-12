import axios from "axios";

const Api = axios.create({
    baseURL: 'https://dev-bos.smartlink.id'
});

export default Api;