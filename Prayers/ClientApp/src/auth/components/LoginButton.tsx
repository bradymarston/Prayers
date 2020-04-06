import React from 'react';
import { useUserStore } from "../use-user-store"
import { Button } from "@material-ui/core";

export function LoginButton() {
    const userStore = useUserStore();

    return (<Button variant="contained" color="primary" type="button" onClick={() => userStore.login("Brady Marston")}>Login</Button>);
}