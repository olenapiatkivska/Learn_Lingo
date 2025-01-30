import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ref, push } from 'firebase/database';
import { auth } from '../../services/firebaseConfig.js';
import { database } from '../../services/firebaseConfig.js';
import css from './FormBook.module.css';

const schema = yup.object().shape({
  reason: yup.string().required('Please select a reason'),
  fullName: yup.string().required('Full Name is required'),
  email: yup
    .string()
    .email('Invalid email format')
    .required('Email is required'),
  phone: yup
    .string()
    .matches(/^\+?\d{10,14}$/, 'Invalid phone number')
    .required('Phone number is required'),
});

const FormBook = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async data => {
    const user = auth.currentUser;

    if (!user) {
      alert('Будь ласка, увійдіть у систему, щоб забронювати урок.');
      return;
    }

    try {
      const userBookingsRef = ref(database, `users/${user.uid}/bookings`);
      await push(userBookingsRef, data);

      alert('Запис успішний!');
    } catch (error) {
      console.error('Помилка запису:', error);
      alert('Помилка бронювання, спробуйте ще раз.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2 className={css.formBookTitle}>Book trial lesson</h2>

      <div className={css.formBookRadioWrapp}>
        <label className={css.formBookRadioLabel}>
          <input
            className={css.formBookRadioInput}
            type="radio"
            value="Career and business"
            {...register('reason')}
          />
          <span className={css.formBookRadioSpan}></span>
          Career and business
        </label>

        <label className={css.formBookRadioLabel}>
          <input
            className={css.formBookRadioInput}
            type="radio"
            value="Lesson for kids"
            {...register('reason')}
          />
          <span className={css.formBookRadioSpan}></span>
          Lesson for kids
        </label>

        <label className={css.formBookRadioLabel}>
          <input
            className={css.formBookRadioInput}
            type="radio"
            value="Living abroad"
            {...register('reason')}
          />
          <span className={css.formBookRadioSpan}></span>
          Living abroad
        </label>

        <label className={css.formBookRadioLabel}>
          <input
            className={css.formBookRadioInput}
            type="radio"
            value="Exams and coursework"
            {...register('reason')}
          />
          <span className={css.formBookRadioSpan}></span>
          Exams and coursework
        </label>

        <label className={css.formBookRadioLabel}>
          <input
            className={css.formBookRadioInput}
            type="radio"
            value="Culture, travel or hobby"
            {...register('reason')}
          />
          <span className={css.formBookRadioSpan}></span>
          Culture, travel or hobby
        </label>

        <p className={css.errorFormBook}>{errors.reason?.message}</p>
      </div>

      <div className={css.formBookInputWrapp}>
        <input
          className={css.formBookInput}
          type="text"
          placeholder="Full Name"
          {...register('fullName')}
        />
        <p className={css.errorFormBook}>{errors.fullName?.message}</p>

        <input
          className={css.formBookInput}
          type="email"
          placeholder="Email"
          {...register('email')}
        />
        <p className={css.errorFormBook}>{errors.email?.message}</p>

        <input
          className={css.formBookInput}
          type="tel"
          placeholder="Phone number"
          {...register('phone')}
        />
        <p className={css.errorFormBook}>{errors.phone?.message}</p>
      </div>

      <button className={css.formBookBtn} type="submit">
        Book
      </button>
    </form>
  );
};

export default FormBook;
