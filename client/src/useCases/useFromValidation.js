import { useEffect, useState } from "react";

export function useFormValidation(initialState, validate, isLoaded) {

    const [values, setValues] = useState(initialState);
    const [errors, setErrors] = useState({});
    const [isSubmitting, setSubmitting] = useState(false);

    useEffect(() => {
        setValues(initialState);
    }, [isLoaded]);

    useEffect(() => {
        if (isSubmitting) {
            const noErrors = Object.keys(errors).length === 0;
            if (noErrors) {
                setSubmitting(false);
            } else {
                setSubmitting(false);
            }
        }
    }, [errors]);

    function handleChange(event) {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    }

    function handleBlur() {
        const validationErrors = validate(values);
        setErrors(validationErrors);
    }

    function handleSubmit(event) {
        event.preventDefault();
        const validationErrors = validate(values);
        setErrors(validationErrors);
        setSubmitting(true);
    }

    return {
        handleSubmit,
        handleChange,
        handleBlur,
        values,
        errors,
        isSubmitting
    };
}
