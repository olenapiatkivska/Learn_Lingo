import css from './TeachersList.module.css';
import Icon from '../../shared/Icon.jsx';
import TeacherLevels from '../TeacherLevels/TeacherLevels.jsx';

import { GoBook } from 'react-icons/go';
import Container from '../Container/Container.jsx';

const TeachersList = ({ item }) => {
  return (
    <section className={css.teachersListSection}>
      <Container>
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
                  <div className={css.teachersLanguagesWrapp}>
                    <p className={css.teachersLanguagesText}>Languages</p>
                    <ul className={css.teachersRatingList}>
                      <li className={css.teachersRatingItem}>
                        <GoBook className={css.iconBookOpen} />
                        <span>Lessons done: {teacher.lessons_done}</span>
                      </li>
                      <li className={css.teachersRatingItem}>
                        <Icon
                          id="star"
                          className={css.iconRating}
                          width="16"
                          height="16"
                          ariaLabel="Rating"
                        />
                        <span>Rating: {teacher.rating}</span>
                      </li>
                      <li className={css.teachersRatingItem}>
                        <p>
                          Price / 1 hour:{' '}
                          <span className={css.teachersPrice}>
                            {teacher.price_per_hour}$
                          </span>
                        </p>
                      </li>
                      {/* <li className={css.teachersRatingItem}>
                      <Icon
                        id="favorite"
                        className={css.iconFavorite}
                        width="26"
                        height="26"
                        ariaLabel="Favorite"
                      />
                    </li> */}
                    </ul>
                    <Icon
                      id="favorite"
                      className={css.iconFavorite}
                      width="26"
                      height="26"
                      ariaLabel="Favorite"
                    />
                  </div>

                  <p className={css.teachersListName}>
                    {teacher.name + ' ' + teacher.surname}
                  </p>

                  <ul className={css.teachersListTextList}>
                    <li>
                      <p className={css.teachersListText}>
                        <span className={css.teachersListSpan}>Speaks: </span>
                        {teacher.languages ? teacher.languages.join(', ') : ''}
                      </p>
                    </li>
                    <li>
                      <p className={css.teachersListText}>
                        <span className={css.teachersListSpan}>
                          Lesson Info:{' '}
                        </span>
                        {teacher.lesson_info}
                      </p>
                    </li>
                    <li>
                      <p className={css.teachersListText}>
                        <span className={css.teachersListSpan}>
                          Conditions:{' '}
                        </span>
                        {teacher.conditions ? teacher.conditions.join(' ') : ''}
                      </p>
                    </li>
                  </ul>

                  <button className={css.buttonReadMore} type="button">
                    Read more
                  </button>

                  <TeacherLevels levels={teacher.levels} />
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
};

export default TeachersList;
