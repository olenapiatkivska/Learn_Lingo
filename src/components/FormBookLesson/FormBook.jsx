import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { ref, push } from 'firebase/database';
import { auth } from '../../services/firebaseConfig.js';
import { database } from '../../services/firebaseConfig.js';

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
      <h2>Book trial lesson</h2>
      <p>Оберіть основну причину вивчення англійської:</p>

      <label>
        <input
          type="radio"
          value="Career and business"
          {...register('reason')}
        />
        Career and business
      </label>
      <label>
        <input type="radio" value="Lesson for kids" {...register('reason')} />
        Lesson for kids
      </label>
      <label>
        <input type="radio" value="Living abroad" {...register('reason')} />
        Living abroad
      </label>
      <label>
        <input
          type="radio"
          value="Exams and coursework"
          {...register('reason')}
        />
        Exams and coursework
      </label>
      <label>
        <input
          type="radio"
          value="Culture, travel or hobby"
          {...register('reason')}
        />
        Culture, travel or hobby
      </label>
      <p>{errors.reason?.message}</p>

      <input type="text" placeholder="Full Name" {...register('fullName')} />
      <p>{errors.fullName?.message}</p>

      <input type="email" placeholder="Email" {...register('email')} />
      <p>{errors.email?.message}</p>

      <input type="tel" placeholder="Phone number" {...register('phone')} />
      <p>{errors.phone?.message}</p>

      <button type="submit">Book</button>
    </form>
  );
};

export default FormBook;
