import { useEffect, useCallback } from "react";
import Input from "../components/input";
import Button from "../components/buttons";
import Spinner from "../components/spinner";
import { registerUser } from "../api/registerEndpoints";
import { useFormContext } from "../context/formContext";
import { isBlankOrNull } from "../utils/formValidateUtils";
import { toast } from 'react-toastify';
import { validateEmail } from "../utils/formValidateUtils";

function Register() {

    const {
        data,
        setData,
        errors,
        setErrors,
        page,
        setPage,
        isLoading,
        setIsLoading,
        pageValid,
        setPageValid,
        defaultData,
        defaultErrors
    } = useFormContext();

    const inputOnChangeHandler = (event) => {
        setData((prevData) => (
            {
                ...prevData,
                [event.target.id]: event.target.value
            }
        ))

        setErrors(defaultErrors);

        validate({
            ...data,
            [event.target.id]: event.target.value
        });
    }

    const validate = useCallback(async (newData) => {

        let formIsValid = true;

        if (isBlankOrNull(newData.name)) {
            setErrors((prev) => ({
                ...prev,
                nameError: "Full name is required"
            }))
            formIsValid = false;
        }

        if (isBlankOrNull(newData.email)) {
            setErrors((prev) => ({
                ...prev,
                emailError: "Email is required"
            }))
            formIsValid = false;
        }
        else if (!validateEmail(newData.email)) {
            setErrors((prev) => ({
                ...prev,
                emailError: "Invalid email format"
            }))
            formIsValid = false;
        }

        if (isBlankOrNull(newData.password)) {
            setErrors((prev) => ({
                ...prev,
                passwordError: "Password is required"
            }))
            
            
          
        }
        else if (newData.password.length < 6) {
            setErrors((prev) => ({
                ...prev,
                passwordError: "Password must have minimum 6 characters"
            }))
        }
        if (newData.password !== newData.confirmPassword) {

            setErrors((prev) => ({
                ...prev,
                confirmPasswordError: "Passwords must match"
            }))
        }

        setPageValid(formIsValid);
    }, [setErrors, setPageValid]);

    const nextStepHandler = () => {
        setPage(2);
    }

    const prevStepHanlder = () => {
        setPage(1);
    }

    const submitHandler = async () => {
        setIsLoading(true);

        try {

            if (errors.confirmPasswordError !== null || errors.emailError !== null || errors.nameError !== null || errors.phoneError !== null || errors.passwordError !== null) {
                setIsLoading(false);
                return
            }
            const res = await registerUser(
                {
                    fullName: data.name,
                    email: data.email,
                    phone: data.phone,
                    password: data.password
                }
            )

            console.log(res);

            if (res.status === 200) {
                toast.success("Success");
                setPage(3);
            }
            else {
                toast.error("Something Went Wrong");
                toast.error(res.message);
            }
        } catch (error) {
            toast.error("Something Went Wrong");
            toast.error(error);
            setIsLoading(false);
        }
        setIsLoading(false);
    }

    const resetForm = () => {
        setErrors(defaultErrors);
        setData(defaultData);
        setPageValid(false);
        setPage(1);
    }

    useEffect(() => {
        validate(data);
    }, [data, validate]);


    return (
        <div className="Register">
            <div className='bg-sky-100 h-screen flex items-center justify-center'>
                <div className='rounded-lg bg-white text-gray-600 pb-10 pt-10 px-10 lg:w-1/3 lg:h-fit md:w-1/2 md:h-max w-full h-full flex flex-col items-center relative'>
                {isLoading ? <Spinner /> : ""}
                <div className='w-full flex flex-col justify-center mt-5'>
                    <label className="font-medium mx-2 text-center">Step {page} of 3</label>
                    <div className="w-full flex items-center justify-center mt-2">
                        <div className="flex flex-col items-center mx-2 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                            ${page > 1 ? 'bg-green-500' : 'bg-sky-500'}`}>
                            {page > 1 ? '\u2714' : '1'}
                        </div>
                        <span className="text-sm mt-1 text-center">Personal Details</span>
                    </div>

                    <div className={`flex-1 h-1 mx-2 ${page > 1 ? 'bg-green-500' : 'bg-slate-300'}`}></div>

                    <div className="flex flex-col items-center mx-2 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                            ${page > 2 ? 'bg-green-500' :page ===2 ? 'bg-sky-500' : 'bg-slate-400'}`}>
                            {page > 2 ? '\u2714' : '2'}
                        </div>
                        <span className="text-sm mt-1 text-center">Password</span>
                    </div>

                    <div className={`flex-1 h-1 mx-2 ${page > 2 ? 'bg-green-500' : 'bg-slate-300'}`}></div>

                    <div className="flex flex-col items-center mx-2 flex-1">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold
                            ${page === 3 ? 'bg-green-500': 'bg-slate-400'}`}>3
                        </div>
                        <span className="text-sm mt-1 text-center">Complete</span>
                    </div>
                    </div>
                </div>
                <h2 className='text-md text-2xl font-bold mx-auto w-100 mb-5'>Registration Form</h2>
                <form className="max-w-sm mx-auto w-full flex-col">
                    {page === 3 ? (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded-lg shadow-md text-center w-full">
                            <h2 className="text-xl font-semibold mb-2"> Registration Successfull</h2>
                            <p>Thank you for Registering...</p>
                            <Button onClick={resetForm} className='my=4'>Back to Register</Button>
                        </div>
                    ) : page === 1 ? (
                                <div className='flex flex-col'>
                                    <div className="mb-5">
                                        <Input label={"Full Name *"} id={"name"} type={"text"} error={errors.nameError} onChange={inputOnChangeHandler} value={data.name} required />
                                    </div>
                                    <div className="mb-5">
                                        <Input label={"Email *"} id={"email"} type={"email"} error={errors.emailError} onChange={inputOnChangeHandler} value={data.email} required />
                                    </div>
                                    <div className="mb-5">
                                        <Input label={"Phone *"} id={"phone"} type={"number"} error={errors.phoneError} onChange={inputOnChangeHandler} value={data.phone} required />
                                    </div>
                                    <Button type="button" onClick={nextStepHandler} disabled={!pageValid}>Next</Button>
                                </div>
                    ) : (
                                <div className="flex flex-col">
                                    <div className="mb-5">
                                        <Input label={"Password"} id={"password"} type={"password"} error={errors.passwordError} onChange={inputOnChangeHandler} value={data.password} required />
                                    </div>
                                     <div className="mb-5">
                                        <Input label={"Confirm Password"} id={"confirmPassword"} type={"password"} error={errors.confirmPasswordError} onChange={inputOnChangeHandler} value={data.confirmPassword} required />
                                    </div>
                                    <Button type="button" onClick={submitHandler}>Confirm</Button>
                                    <Button type="button" styles="bg-slate-500" onClick={prevStepHanlder}>Back</Button>
                                </div>
                    )}
                </form>
                </div>
            </div>
        </div>
    );

}

export default Register;