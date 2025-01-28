import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import css from './BookLesson.jsx';
import { toast } from 'react-toastify';

const schemaBook = yup.object().shape({
  fullName: yup.string().min(3).max(50).required('Full name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  number: yup
    .string()
    .min(17, 'Number must be at least 17 characters')
    .required('Number is required'),
});

const FormBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schemaBook),
  });

  const onSubmit = data => {
    console.log(data);
    toast.success('Форма відправлена успішно!');
  };

  return (
    <>
      <h3>What is your main reason for learning English?</h3>

      <form className={css.formBook} onSubmit={handleSubmit(onSubmit)}>
        <input
          className={css.formBookInput}
          type="text"
          {...register('fullName')}
          placeholder="Full Name"
        />
        {errors.text && <p className={css.error}>{errors.text.message}</p>}

        <input
          className={css.formBookInput}
          type="email"
          {...register('email')}
          placeholder="Email"
        />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}

        <input
          className={css.formBookInput}
          type="tel"
          {...register('number')}
          placeholder="Phone number"
        />
        {errors.password && (
          <p className={css.error}>{errors.number.message}</p>
        )}

        {/* {error && <p className={css.error}>{error}</p>} */}

        <button
          className={css.formBookBtn}
          type="submit"
          //   disabled={isSubmitting}
        >
          Book
        </button>
      </form>
    </>
  );
};

export default FormBook;
