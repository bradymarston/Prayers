import React from "react";
import { Button, Grid, TextField } from "@material-ui/core";
import { useUserStore } from "../use-user-store";
import QuickForm, { QuickFormErrors } from "../../forms/QuickForm";


export interface UserFormValues {
    firstName: string;
    lastName: string;
}

export function UserForm() {
    const userStore = useUserStore();

    function checkValidation(values: UserFormValues) {
        const errors = {} as QuickFormErrors<UserFormValues>;
        if (values.firstName === "") {
            errors.firstName = "Required";
        }
        if (values.lastName === "") {
            errors.lastName = "Required";
        }
        return errors;
    }

    return (
        <QuickForm
            initialValues={{
                firstName: "",
                lastName: ""
            } as UserFormValues}
            validate={checkValidation}
        >
            {
                ({ values, isTouched, isValid, textFieldProps }) => (
                    <form onSubmit={() => userStore.login(`${values.firstName} ${values.lastName}`)}
                        noValidate>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...textFieldProps("firstName")}
                                    variant="outlined"
                                    margin="normal"
                                    label="First Name"
                                    autoComplete="fname"
                                    fullWidth
                                    required
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    {...textFieldProps("lastName")}
                                    variant="outlined"
                                    margin="normal"
                                    label="Last Name"
                                    autoComplete="lname"
                                    fullWidth
                                    required
                                />
                            </Grid>
                        </Grid>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            disabled={!isValid || !isTouched}
                            fullWidth
                        >
                            Continue
                        </Button>
                    </form>
                )
            }
        </QuickForm>
    );
}