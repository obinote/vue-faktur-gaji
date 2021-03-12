import Api from "./Api";

export default {
    get() {
        return Api.get("/salary/inquiry");
    },

    post(data) {
        return Api.post("/salaryi/save", JSON.stringify(data));
    },
}