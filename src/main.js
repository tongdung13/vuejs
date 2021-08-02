import {
    createApp
} from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import VueHtmlToPaper from './components/VueHtmlToPaper'

// global register

export const HTTP = axios.create({
    baseURL: "http://localhost:8000/api",
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Access-Control-*, Origin, X-Requested-With, Content-Type, Accept"
    }
});

const token = localStorage.getItem("accessToken");
if (token) {
    HTTP.defaults.headers.common["Authorization"] = token;
}

export function formatPrice(value) {
    if (value === null || isNaN(value)) {
        value = 0;
        return value;
    }
    return (value = parseFloat(value)
        .toFixed(2)
        .toString()
        .replace(/\d(?=(\d{3})+\.)/g, "$&,")
        .replace(".00", " ₫"));
    //console.log(data)
}

export function formatNumberAccount(value) {
    if (value === null) {
        value = 0;
    }
    return (value = parseFloat(value)
        .toFixed(2)
        .toString()
        .replace(/\d(?=(\d{4})+\.)/g, "$& ")
        .replace(".00", " "));
}

export function formatNumber(value) {
    if (value === null) {
        value = 0;
    }
    return (value = parseFloat(value)
        .toFixed(2)
        .toString()
        .replace(/\d(?=(\d{3})+\.)/g, "$& ")
        .replace(".00", ""));
}

export function formatDate(isoDate) {
    var d = new Date(isoDate);
    let dateD = d.getDate();
    if (dateD < 10) {
        dateD = "0" + dateD;
    }
    let monthD = d.getMonth() + 1;
    if (monthD < 10) {
        monthD = "0" + monthD;
    }
    let yearD = d.getFullYear();
    d = monthD + "/" + dateD + "/" + yearD;
    // console.log(d);
    return d;
}
const options = {
    name: '_blank',
    specs: [
        'fullscreen=yes',
        'titlebar=yes',
        'scrollbars=yes'
    ],
    styles: [
        'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css',
        'https://unpkg.com/kidlat-css/css/kidlat.css'
    ]
}
createApp(App)
    .use(store)
    .use(router)
    .use(VueSweetalert2)
    .use(VueHtmlToPaper, options)
    .mount("#app");