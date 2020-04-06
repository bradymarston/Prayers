import { useState } from 'react';

export interface QuickFormProps<T> {
    initialValues: T;
    children: (args: QuickFormChildArguments<T>) => JSX.Element;
    validate?: (values: T) => QuickFormErrors<T>;
}

export interface QuickFormChildArguments<T> {
    values: T;
    touched: QuickFormTouched<T>;
    errors: QuickFormErrors<T>;
    isValid: boolean;
    isTouched: boolean;
    handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    textFieldProps: <K extends keyof T>(name: K) => QuickFormInputProperties;
}

export interface QuickFormInputProperties {
    name: string;
    onChange:(e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
    value: string;
    error: boolean;
    helperText: string;
}

export type QuickFormErrors<T> = {
    [P in keyof T]: string | undefined;
}

export type QuickFormTouched<T> = {
    [P in keyof T]: boolean;
}

function buildPristineTouchedState<T>(values: T): QuickFormTouched<T> {
    const returnObject = {} as QuickFormTouched<T>;
    for (const k in values) {
        returnObject[k] = false;
    }
    return returnObject;
}


export function QuickForm<T>(props: QuickFormProps<T>) {
    const [values, setValues] = useState(props.initialValues);
    const [touched, setTouched] = useState(buildPristineTouchedState(props.initialValues));
    const [errors, setErrors] = useState(props.validate ? props.validate(props.initialValues) : {} as QuickFormErrors<T>);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTouched({ ...touched, [e.target.name]: true });

        const newValues = { ...values, [e.target.name]: e.target.value } as T;
        setValues(newValues);

        if (props.validate) {
            setErrors(props.validate(newValues));
        }
    }

    function checkOverallValidity<T>(): boolean {
        for (let k in errors) {
            if (errors[k] !== undefined)
                return false;
        }

        return true;
    }

    function checkOverallTouchedState() {
        for (let k in touched) {
            if (touched[k])
                return true;
        }

        return false;
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        setTouched({ ...touched, [e.target.name]: true });
    }

    function buildInputProps<K extends keyof T>(name: K): QuickFormInputProperties {
        return {
            name: name as string,
            onChange: handleChange,
            onBlur: handleBlur,
            value: (values[name] as unknown) as string,
            error: errors[name] !== undefined && touched[name],
            helperText: errors[name] !== undefined && touched[name] ? errors[name] as string : ""
        };
    }

    return props.children({
        values: values,
        touched: touched,
        errors: errors,
        isValid: checkOverallValidity(),
        isTouched: checkOverallTouchedState(),
        handleChange: handleChange,
        handleBlur: handleBlur,
        textFieldProps: buildInputProps
    });
}

export default QuickForm;