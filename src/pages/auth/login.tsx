import { Formik, Form } from 'formik';
import Input from '../../components/forms/input';
import Password from '../../components/forms/password';
import Button from '../../components/forms/button';
import { logo, AuthBg } from '../../assets/images';
import React from 'react';

interface LoginFormInterface {
    email: string;
    password: string;
}

const LoginPage: React.FC = () => {
    const initialValues: LoginFormInterface = { email: '', password: '' };

    const validate = (values: LoginFormInterface) => {
        const errors: Partial<LoginFormInterface> = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }
        if (!values.password) {
            errors.password = 'Required';
        }
        return errors;
    };

    const handleSubmit = (values: LoginFormInterface, { setSubmitting }: any) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            {/* Container for the small screen with background image */}
            <div 
                className="p-8 max-w-md mx-auto shadow-2xl rounded-md bg-cover bg-center md:hidden" 
                style={{ backgroundImage: `url(${AuthBg})`, height: 'auto' }}
            >
                <img 
                    src={logo} 
                    alt="Logo" 
                    className="mb-4 mx-auto" 
                />
                {/* Login Form - responsive layout */}
                <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 bg-white shadow-2xl rounded-lg mx-auto">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center">Login</h1>
                    <p className="text-gray-500 mt-2 mb-6 text-center text-sm sm:text-base">
                        Sign in to stay connected
                    </p>
                    <Formik
                        initialValues={initialValues}
                        validate={validate}
                        onSubmit={handleSubmit}
                    >
                        {({ isSubmitting, errors, touched }) => (
                            <Form>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium mb-1">Email</label>
                                    <Input 
                                        type="email" 
                                        name="email" 
                                        className="border border-gray-500 rounded-lg h-10 w-full px-4"
                                    />
                                    {errors.email && touched.email && (
                                        <div className="text-red-500 text-sm">{errors.email}</div>
                                    )}
                                </div>
                                
                                <div className="mb-6">
                                    <label className="block text-sm font-medium mb-1">Password</label>
                                    <Password 
                                        name="password" 
                                        className="border border-gray-500 rounded-lg h-10 w-full px-4"
                                        error={errors.password && touched.password ? errors.password : undefined}
                                    />
                                </div>

                                <div className="flex justify-center">
                                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

            {/* Login Form - Visible on medium and large screens */}
            <div className="hidden md:flex flex-col w-full max-w-md p-6 sm:p-8 lg:p-10 bg-white shadow-2xl rounded-lg mx-auto">
                <h1 className="text-2xl sm:text-3xl font-bold text-center">Login</h1>
                <p className="text-gray-500 mt-2 mb-6 text-center text-sm sm:text-base">
                    Sign in to stay connected
                </p>
                <Formik
                    initialValues={initialValues}
                    validate={validate}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting, errors, touched }) => (
                        <Form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium mb-1">Email</label>
                                <Input 
                                    type="email" 
                                    name="email" 
                                    className="border border-gray-500 rounded-lg h-10 w-full px-4"
                                />
                                {errors.email && touched.email && (
                                    <div className="text-red-500 text-sm">{errors.email}</div>
                                )}
                            </div>
                            
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-1">Password</label>
                                <Password 
                                    name="password" 
                                    className="border border-gray-500 rounded-lg h-10 w-full px-4"
                                    error={errors.password && touched.password ? errors.password : undefined}
                                />
                            </div>

                            <div className="flex justify-center">
                                <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                                    Login
                                </Button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default LoginPage;
