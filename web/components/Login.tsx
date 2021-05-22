import React, { useState } from 'react';
import Google from '@assets/google.svg';
import PrimaryButton from '@components/General/PrimaryButton';
import Input from '@components/General/Input';
import { useForm } from '@lib/useForm';
import { useLoginMutation } from '@graphql/generated/graphql';
import Link from 'next/link';
import ErrorMessage from './General/ErrorMessage';
import { checkObjEqual } from '@lib/checkObjEqual';
import * as yup from 'yup';
import { useRouter } from 'next/dist/client/router';

// Inital form state
const initialState = {
    email: '',
    password: '',
};

const schema = yup.object().shape({
    email: yup.string().email('Not a valid email').required('Email is required'),
    password: yup.string().min(2),
});

const Login = ({ className, ...p }: React.ComponentPropsWithoutRef<'div'>) => {
    const { handleChange, inputs, isEmpty, isError, errors } = useForm(initialState, schema);
    const [lastInputs, setLastInputs] = useState(initialState);
    const [error, setError] = useState('');
    const [isShowError, setIsShowError] = useState(false);
    const router = useRouter();

    const [loginMutation] = useLoginMutation();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // To prevent multiple server calls
        if (checkObjEqual(lastInputs, inputs)) return;

        // Update cahced inputs
        setLastInputs(inputs);

        const { data } = await loginMutation({ variables: inputs });

        if (data?.login?.__typename === 'BaseError') {
            // Wrong email/password
            setError(data.login.message);
        } else {
            setError('');
            // Do stuff
            router.push('/home/all');
        }
    };

    return (
        <div className={`p-8 ${className || ''}`} {...p}>
            <div className="py-4">
                <h1 className="py-4 text-4xl font-bold md:text-5xl">Login</h1>
                <p className="text-sm text-gray-500 md:text-lg">Start organizing your bookmarks!</p>
            </div>
            <div className="pt-5">
                <button className="flex justify-center w-full px-4 py-2 border border-gray-300 rounded-full md:py-3 no-outline ">
                    <Google className="h-5" />
                    <span className="px-4">Sign in with Google</span>
                </button>
                <div className="text-xs font-medium py-7">
                    {/* <Divider text='or Sign in with Email' lineColor='rgba(0,0,0,.2)' textColor='rgba(0,0,0,.4)' /> */}
                </div>
                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid gap-8">
                        <div className="grid gap-3">
                            <Input
                                label="Email"
                                type="email"
                                name="email"
                                placeholder="mail@example.com"
                                onChange={handleChange}
                                value={inputs.email}
                            />

                            <ErrorMessage text={errors.email.message || ''} hidden={!isShowError} />
                        </div>
                        <Input
                            label="Password"
                            type="password"
                            name="password"
                            placeholder="Min. of 8 characters"
                            onChange={handleChange}
                            value={inputs.password}
                        />
                    </div>

                    <ErrorMessage text={error} />
                    <Link href="/">
                        <a className="text-sm font-medium transition-colors duration-200 justify-self-end hover:underline text-primary hover:text-primary-dark md:text-base hover:cursor-pointer">
                            Forgot password?
                        </a>
                    </Link>
                    <div className="relative">
                        <div
                            className={`absolute z-10 w-full h-full ${isShowError ? 'hidden' : ''}`}
                            onClick={() => setIsShowError(true)}
                        ></div>
                        <PrimaryButton
                            disabled={isEmpty || isError}
                            text="Login"
                            className="w-full transition-all duration-200 transform hover:bg-primary-dark disabled:opacity-50 "
                        />
                    </div>
                    <span className="text-sm md:text-base">
                        Don&apos;t have an account?{' '}
                        <Link href="/register">
                            <a className="font-medium transition-colors duration-200 text-primary hover:underline hover:cursor-pointer hover:text-primary-dark">
                                Register
                            </a>
                        </Link>
                    </span>
                </form>
            </div>
        </div>
    );
};

export default Login;
