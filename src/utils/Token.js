import { STORAGE } from "@/constants/storage";
import Cookies from "js-cookie";

const localStorageToken = {
    get() {
        return JSON.parse(
            localStorage.getItem(STORAGE.token) === undefined
                ? null
                : localStorage.getItem(STORAGE.token)
        );
    },
    set(token) {
        return localStorage.setItem(STORAGE.token, JSON.stringify(token));
    },
    remove() {
        return localStorage.removeItem(STORAGE.token);
    },
};

const cookiesStorageToken = {
    get() {
        return JSON.parse(
            Cookies.get(STORAGE.token) === undefined ? null : Cookies.get(STORAGE.token)
        );
    },
    set(token) {
        return Cookies.set(STORAGE.token, JSON.stringify(token));
    },
    remove() {
        return Cookies.remove(STORAGE.token);
    },
};

export const methodToken = {
    get() {
        return cookiesStorageToken.get();
    },
    set(token) {
        return cookiesStorageToken.set(token);
    },
    remove() {
        return cookiesStorageToken.remove();
    },
};
