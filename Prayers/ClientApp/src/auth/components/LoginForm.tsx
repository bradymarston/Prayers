import QuickForm, { QuickFormErrors } from "../../forms/QuickForm";
import React, { FormEvent } from "react";
import { TextField, FormControlLabel, Checkbox, Button, Grid, Link } from "@material-ui/core";
import { useUserStore } from "../use-user-store";

export interface Credentials {
    userName: string;
    password: string;
    rememberMe: boolean;
}

export function LoginForm() {
    const userStore = useUserStore();

    function checkValidity(values: Credentials) {
        const errors = {} as QuickFormErrors<Credentials>;
        if (values.userName === "")
            errors.userName = "Required";
        if (values.password === "")
            errors.password = "Required";

        return errors;
    }

    function handleLogin(e: FormEvent, values: Credentials) {
        e.preventDefault();
        return userStore.login(values);
    }

    return (
        <QuickForm
            initialValues={{
                userName: "",
                password: "",
                rememberMe: false
            } as Credentials}
            validate={checkValidity}
        >
            {({ textFieldProps, values }) => {

                return (
                    <form className="form" onSubmit={(e) => handleLogin(e, values)} noValidate>
                        <TextField
                            {...textFieldProps("userName")}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="User Name"
                            autoComplete="username"
                            autoFocus
                        />
                        <TextField
                            {...textFieldProps("password")}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                        />
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className="submit"
                        >
                            Sign In
                    </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                            </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                );
            }}
        </QuickForm>
    )
}