import FormBook from './FormBook.jsx';

const BookLesson = ({ teacher }) => {
  return (
    <>
      <h2>Book trial lesson</h2>
      <p>
        Our experienced tutor will assess your current language level, discuss
        your learning goals, and tailor the lesson to your specific needs.
      </p>
      <img
        src={teacher.avatar_url}
        // className={css.teachersListImg}
        width="44"
        height="44"
        alt="User profile photo"
      />
      <div>
        <p>Your teacher</p>
        <p> {teacher.name + ' ' + teacher.surname}</p>
      </div>
      <FormBook />
    </>
  );
};

export default BookLesson;
