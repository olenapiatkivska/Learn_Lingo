import FormBook from './FormBook.jsx';
import css from './BookLesson.module.css';

const BookLesson = ({ teacher, onClose }) => {
  return (
    <>
      <h2 className={css.bookLessonTitle}>Book trial lesson</h2>
      <p className={css.bookLessonText}>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>

      <div className={css.bookLessonImgWrapp}>
        <img
          src={teacher.avatar_url}
          className={css.bookLessonImg}
          width="44"
          height="44"
          alt="User profile photo"
        />
        <div className={css.bookLessonTeacherWrapp}>
          <p className={css.bookLessonTeacher}>Your teacher</p>
          <p className={css.bookLessonTeacherName}>
            {' '}
            {teacher.name + ' ' + teacher.surname}
          </p>
        </div>
      </div>
      <FormBook onClose={onClose} />
    </>
  );
};

export default BookLesson;
