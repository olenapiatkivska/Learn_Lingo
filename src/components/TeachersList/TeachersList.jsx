import css from './TeachersList.module.css';
import Icon from '../../shared/Icon.jsx';

const TeachersList = ({ item }) => {
  return (
    <ul className={css.teachersList}>
      {item.map(teacher => {
        return (
          <li key={teacher.id} className={css.teachersListItem}>
            <div className={css.teachersListImgWrapp}>
              <img
                src={teacher.avatar_url}
                className={css.teachersListImg}
                width="96"
                height="96"
                alt="User profile photo"
              />
            </div>
            <div className={css.teachersDescription}>
              <p>Languages</p>
              <p>{teacher.name + ' ' + teacher.surname}</p>
              <p>
                Speaks: {teacher.languages ? teacher.languages.join(', ') : ''}
              </p>
              <p>Lesson Info:{teacher.lesson_info}</p>
              <p>
                Conditions:
                {teacher.conditions ? teacher.conditions.join(' ') : ''}
              </p>
              <button type="button">Read More</button>
              <Icon
                id="book-open"
                className={css.iconBookOpen}
                // stroke="#121417"
                width="16"
                height="16"
                ariaLabel="Book open"
              />
              <p>Lessons done: {teacher.lessons_done}</p>
              <Icon
                id="star"
                className={css.iconRating}
                fill="#FFC531"
                width="16"
                height="16"
                ariaLabel="Rating"
              />
              <p>Rating: {teacher.rating}</p>
              <p>
                Price / 1 hour: <span>{teacher.price_per_hour}</span>
              </p>
              <Icon
                id="favorite"
                className={css.iconFavorite}
                width="26"
                height="26"
                ariaLabel="Favorite"
              />
              {teacher.levels.map((level, index) => {
                return <p key={index}>{level}</p>;
              })}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default TeachersList;
