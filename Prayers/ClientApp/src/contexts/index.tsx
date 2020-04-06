import { UserStore } from "../auth/UserStore";
import React from "react";

export const storesContext = React.createContext({
    userStore: new UserStore()
})