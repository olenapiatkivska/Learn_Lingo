import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebaseConfig.js';
import { toast } from 'react-toastify';
import css from './RegistrationForm.module.css';
import { useDispatch } from 'react-redux';
import { addToken } from '../../redux/SliceAuth.js';
import { FiEyeOff, FiEye } from 'react-icons/fi';

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters')
    .required('Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
});

const RegistrationForm = ({ onClose }) => {
  const [visibility, setVisibility] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const [error, setError] = useState(null);

  const onSubmit = async data => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      dispatch(addToken(userCredential.user.accessToken));
      toast.success('Registration successful!');
      onClose();
    } catch (error) {
      setError('Failed to register. Please try again.');
      console.error(error);
    }
  };

  return (
    <>
      <h2 className={css.registrationFormTitle}>Register</h2>
      <p className={css.registrationFormText}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information.
      </p>

      <form className={css.registrationForm} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={css.registrationInput}
          type="text"
          {...register('name')}
          placeholder="Name"
        />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}{' '}
        <input
          className={css.registrationInput}
          type="email"
          {...register('email')}
          placeholder="Email"
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}
        <div className={css.inputWrapper}>
          <input
            className={css.registrationInput}
            type={visibility ? 'text' : 'password'}
            {...register('password')}
            placeholder="Password"
          />
          <button
            className={css.registrFormBtnEye}
            type="button"
            onClick={() => setVisibility(!visibility)}
          >
            {visibility ? (
              <FiEyeOff className={css.eyeIconRegistr} />
            ) : (
              <FiEye className={css.eyeIconRegistr} />
            )}
          </button>
        </div>
        {errors.password && (
          <p className={css.error}>{errors.password.message}</p>
        )}
        {error && <p className={css.error}>{error}</p>}
        <button type="submit" className={css.registrationBtnSignUp}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default RegistrationForm;
