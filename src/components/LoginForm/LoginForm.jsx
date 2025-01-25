import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import css from './LoginForm.module.css';
import { toast, ToastContainer } from 'react-toastify';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig.js';
import { useState } from 'react';

const schema = yup.object().shape({
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const LoginForm = ({ onLoginSuccess }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async data => {
    setIsSubmitting(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log('User logged in (LoginForm):', userCredential.user);
      toast.success('Log In successful!');
      onLoginSuccess(userCredential.user);
    } catch (e) {
      setError('Invalid email or password. Please try again.');
      toast.error('Invalid credentials. Try again!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <h2 className={css.loginFormTitle}>Log In</h2>
      <p className={css.loginFormText}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>

      <form className={css.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={css.loginFormInput}
          type="email"
          {...register('email')}
          placeholder="Email"
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}

        <input
          className={css.loginFormInput}
          type="password"
          {...register('password')}
          placeholder="Password"
        />
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}

        {error && <p className={css.error}>{error}</p>}

        <button
          className={css.loginFormBtn}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Logging In...' : 'Log In'}
        </button>
      </form>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
};

export default LoginForm;
