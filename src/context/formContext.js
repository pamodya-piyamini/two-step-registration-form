import { createContext, useContext, useState } from "react";

const defaultErrors = {
    nameError: null,
    emailError: null,
    phoneError: null,
    passwordError: null,
    confirmPasswordError: null
};

const defaultData = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
};

const FormContext = createContext();

export const FormProvider = ({ children }) => {
    const [data, setData] = useState(defaultData);
    const [errors, setErrors] = useState(defaultErrors);
    const [pageValid, setPageValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(1);

    return (
        <FormContext.Provider
            value={{
                data,
                setData,
                errors,
                setErrors,
                page,
                setPage,
                pageValid,
                setPageValid,
                isLoading,
                setIsLoading,
                defaultData,
                defaultErrors
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export const useFormContext = () => useContext(FormContext);
