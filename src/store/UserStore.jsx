import {makeAutoObservable} from "mobx";
import { check } from "../http/userAPI";

export default class UserStore {
    constructor() {
        this._isAuth = !!localStorage.getItem('token')
        this._user = {}
        this._categories = []
        this._selectedCategory = null
        makeAutoObservable(this)
        this.checkAuth()
    }

    async checkAuth() {
        try {
            const token = localStorage.getItem('token')
            if (token) {
                const response = await check()
                console.log(response)
                if (!response.valid) {
                    this.setUser({})
                    this.setIsAuth(false)
                    localStorage.removeItem('token')
                }
            }
        } catch (e) {
            console.log(e)
            this.setUser({})
            this.setIsAuth(false)
            localStorage.removeItem('token')
        }
    }

    setCategories(categories) {
        this._categories = categories
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
    }

    get categories() {
        return this._categories
    }

    get selectedCategory() {
        return this._selectedCategory
    }
    
    setIsAuth(bool) {
        this._isAuth = bool
    }
    
    setUser(user) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }
    
    get user() {
        return this._user
    }
}