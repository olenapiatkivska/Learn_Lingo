import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import css from './LoginForm.module.css';
import { toast } from 'react-toastify';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig.js';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToken } from '../../redux/SliceAuth.js';

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

const LoginForm = ({ onClose }) => {
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      dispatch(addToken(userCredential.user.accessToken));
      toast.success('Log In successful!');
      onClose();
      return userCredential.user;
    } catch (e) {
      toast.error('Invalid credentials. Try again!');
      console.error(e);
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

        <div className={css.inputWrapper}>
          <input
            className={css.loginFormInput}
            type={visibility ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
          />
          <button
            className={css.loginFormBtnEye}
            type="button"
            onClick={() => setVisibility(!visibility)}
          >
            {visibility ? (
              <FiEyeOff className={css.eyeIcon} />
            ) : (
              <FiEye className={css.eyeIcon} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}

        <button
          className={css.loginFormBtn}
          type="submit"
          // disabled={isSubmitting}
        >
          Log In
        </button>
      </form>
    </>
  );
};

export default LoginForm;
