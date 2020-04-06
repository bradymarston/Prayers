import { observable, action, computed } from "mobx";

export class UserStore {
    @observable
    private _name: string | null = (() => { console.log("Fetching local storage"); return localStorage.getItem("user-name"); })()

    @action
    login(newName: string) {
        console.log("Initiating login");
        localStorage.setItem("user-name", newName);
        this._name = newName;
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
        console.log("Checking login state.");
        return this._name !== null;
    }
}