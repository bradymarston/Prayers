import { observable, action, computed } from "mobx";
import { Credentials } from "./components/LoginForm";
import { http } from "../httpHelpers";

export class UserStore {
    @observable
    private _name: string | null = (() => { console.log("Fetching local storage"); return localStorage.getItem("user-name"); })()

    @action
    login(credentials: Credentials) {
        return http.post("authentication/login", credentials).then((response) => {
            if (response.ok) {
                localStorage.setItem("user-name", credentials.userName);
                this._name = credentials.userName;
            }
        });
    }

    @action
    logout() {
        localStorage.removeItem("user-name");
        this._name = null;
    }

    @computed
    get name(): string {
        if (this._name === null)
            throw new ReferenceError("No user logged in.");

        return this._name;
    }

    @computed
    get isLoggedIn(): boolean {
        return this._name !== null;
    }
}