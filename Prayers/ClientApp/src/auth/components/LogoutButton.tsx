import React from 'react';
import { useUserStore } from "../use-user-store";
import { Button } from "@material-ui/core";

export function LogoutButton() {
    console.log("Rendering logout button");
    const userStore = useUserStore();

    return (
        <Button
            variant="contained"
            color="primary"
            type="button"
            onClick={() => userStore.logout()}
        >
            Log {userStore.name} out
        </Button>
    );
}