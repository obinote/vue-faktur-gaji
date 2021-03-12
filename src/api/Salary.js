import Api from "./Api";

const config = {
  headers: {
  }
}

export default {
    get() {
        return Api.get("/salary/inquiry");
    },

    post(data) {
        return Api.post("/salaryi/save", JSON.stringify(data));
    },
}