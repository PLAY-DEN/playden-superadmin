import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Input from '../../components/forms/input';
import Password from '../../components/forms/password';
import Button from '../../components/forms/button';
import { logo, AuthBg } from '../../assets/images';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/authSlice';
import { RootState } from '../../redux/store';
import { useNavigate } from 'react-router-dom';
import { setAdmin } from '../../redux/adminSlice';

const LoginValidationSchema = Yup.object({
    user_id: Yup.string()
      .required('User ID is required')
      .test('is-valid-id', 'Invalid user ID format', (value) => {
        // Check if it's a valid email
        const isEmail = Yup.string().email().isValidSync(value);
        if (isEmail) return true;
        
        // Check if it's a valid phone number (simple regex for this example)
        const phoneRegex = /^[+]?[0-9]{10,15}$/;  // Allow international numbers (10-15 digits)
        const isPhone = phoneRegex.test(value);
        if (isPhone) return true;
  
        // Check if it's a valid username (just a string with no special characters)
        const isUsername = /^[a-zA-Z0-9_]+$/.test(value); // Alphanumeric or underscores
        if (isUsername) return true;
  
        // If it's neither an email, phone number, nor username, it's invalid
        return false;
      }),
    
    password: Yup.string().required('Password is required'),
  });
  
  
  const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state: RootState) => state.auth);
  
    const initialValues = { user_id: '', password: '' };
  
    const handleSubmit = async (values: typeof initialValues) => {
      const credentials = {
        user_id: values.user_id,  // user_id could be email, phone number, or username
        password: values.password,  // password field
      };

      const adminData = {
        name: values.user_id,
      };
  
      try {
        await dispatch(loginUser(credentials)).unwrap();
        const adminData = {
          name: values.user_id,
        };
        dispatch(setAdmin(adminData));
        // Redirect user or dashboard   
        navigate('/')

      } catch (error) {
        console.error("Login error:", error);
        // Error handling 
      }
    };
  
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div
          className="p-8 max-w-md mx-auto shadow-2xl rounded-md bg-cover bg-center md:hidden"
          style={{ backgroundImage: `url(${AuthBg})`, height: 'auto' }}
        >
          <img src={logo} alt="Logo" className="mb-4 mx-auto" />
          <div className="w-full max-w-md p-6 sm:p-8 lg:p-10 bg-white shadow-2xl rounded-lg mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-center">Login</h1>
            <p className="text-gray-500 mt-2 mb-6 text-center text-sm sm:text-base">
              Sign in to stay connected
            </p>
            <Formik
              initialValues={initialValues}
              validationSchema={LoginValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">User ID</label>
                    <Field
                      name="user_id"
                      type="text"
                      as={Input}
                      className="border border-gray-500 rounded-lg h-10 w-full px-4"
                    />
                    {errors.user_id && touched.user_id && (
                      <div className="text-red-500 text-sm">{errors.user_id}</div>
                    )}
                  </div>
  
                  <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Password</label>
                    <Field
                      name="password"
                      type="password"
                      as={Password}
                      className="border border-gray-500 rounded-lg h-10 w-full px-4"
                    />
                    {errors.password && touched.password && (
                      <div className="text-red-500 text-sm">{errors.password}</div>
                    )}
                  </div>
  
                  {error && <p className="text-red-500 text-center">{error}</p>}
                  <div className="flex justify-center">
                    <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                      {loading ? 'Logging in...' : 'Login'}
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
  
        {/* Large screen container */}
        <div className="hidden md:flex flex-col w-full max-w-md p-6 sm:p-8 lg:p-10 bg-white shadow-2xl rounded-lg mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-center">Login</h1>
          <p className="text-gray-500 mt-2 mb-6 text-center text-sm sm:text-base">
            Sign in to stay connected
          </p>
          <Formik
            initialValues={initialValues}
            validationSchema={LoginValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">User ID</label>
                  <Field
                    name="user_id"
                    type="text"
                    as={Input}
                    className="border border-gray-500 rounded-lg h-10 w-full px-4"
                  />
                  {errors.user_id && touched.user_id && (
                    <div className="text-red-500 text-sm">{errors.user_id}</div>
                  )}
                </div>
  
                <div className="mb-6">
                  <label className="block text-sm font-medium mb-1">Password</label>
                  <Field
                    name="password"
                    type="password"
                    as={Password}
                    className="border border-gray-500 rounded-lg h-10 w-full px-4"
                  />
                  {errors.password && touched.password && (
                    <div className="text-red-500 text-sm">{errors.password}</div>
                  )}
                </div>
  
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="flex justify-center">
                  <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                    {loading ? 'Logging in...' : 'Login'}
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
  