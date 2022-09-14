import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";
import { LocalUser } from "../models/local_user";

@Injectable()
export class StorageService {

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        // if (usr == null) {
        //     return null
        // } else {
        //     return JSON.parse(usr); //LocalStorage só guarda valores em string;
        // }
        return usr = null ? null : JSON.parse(usr);
    }

    setLocalUser(user: LocalUser): void {
        // if(user == null){
        //     localStorage.removeItem(STORAGE_KEYS.localUser);
        // } else {
        //     localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
        // }
        user == null
            ? localStorage.removeItem(STORAGE_KEYS.localUser)
            : localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(user));
    }

    getCart() : Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        // if (str != null){
        //     return JSON.parse(str);
        // } else {
        //     return null;
        // }
        return str != null ? JSON.parse(str) : null;
    }

    setCart(obj: Cart){
        // if(obj != null){
        //     localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        // } else {
        //     localStorage.removeItem(STORAGE_KEYS.cart);
        // }
        obj != null
        ? localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj))
        : localStorage.removeItem(STORAGE_KEYS.cart);
    }
}