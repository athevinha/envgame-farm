import axios from "axios";
export default axios.create({
    baseURL: "http://127.0.0.1:5500/index.html",
    headers: {
        "Content-type": "application/json"
    }
});
