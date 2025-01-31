import css from './TeachersList.module.css';
import Icon from '../../shared/Icon.jsx';
import TeacherLevels from '../TeacherLevels/TeacherLevels.jsx';
import { GoBook } from 'react-icons/go';
import Container from '../Container/Container.jsx';
import { useState } from 'react';
import TeacherDetails from '../TeacherDetails/TeacherDetails.jsx';
import Modal from '../../shared/Modal/Modal.jsx';
import BookLesson from '../FormBookLesson/BookLesson.jsx';
import { auth, database } from '../../services/firebaseConfig.js';
import { ref, remove, set } from 'firebase/database';
import { toast } from 'react-toastify';
import { useFavorite } from '../../services/favorite.js';
import { LuHeart } from 'react-icons/lu';

const TeachersList = ({ item }) => {
  const [visibility, setVisibility] = useState({});
  const [teacher, setTeacher] = useState();
  const [modalState, setModalState] = useState({ isOpen: false, name: '' });
  const authUser = auth.currentUser;
  const favorite = useFavorite(database);

  const openModal = modalName => {
    setModalState({ isOpen: true, name: modalName });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, name: '' });
  };

  const onClickModal = id => {
    const detailsTeacher = item.find(teacher => teacher.id === id);
    setTeacher(detailsTeacher);
    openModal('bookLesson');
    setVisibility({ ...visibility, [id]: false });
  };

  const deleteFavorite = id => {
    const favRef = ref(database, `/favorite/${auth.currentUser.uid}/${id}`);
    return remove(favRef);
  };

  const addFavorite = id => {
    const favoriteTeacher = item.find(teacher => teacher.id === id);

    const userRef = ref(database, `/favorite/${auth.currentUser.uid}/${id}`);

    set(userRef, favoriteTeacher);
  };

  const handelClick = id => {
    if (!authUser) {
      toast.warning('This feature is available only for authorized users.');
    }

    const isFavorite = favorite.find(item => item.id === id);

    if (isFavorite) {
      return deleteFavorite(id);
    } else {
      return addFavorite(id);
    }
  };

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
                  <span className={css.teachersListImgSpan}></span>
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
                    </ul>

                    <button
                      type="button"
                      className={css.favoriteButton}
                      onClick={() => handelClick(teacher.id)}
                    >
                      <LuHeart
                        className={`${css.iconFavorite} ${
                          favorite.some(fav => fav.id === teacher.id)
                            ? css.iconFavoriteActive
                            : ''
                        }`}
                      />
                    </button>
                  </div>

                  <h3 className={css.teachersListName}>
                    {teacher.name + ' ' + teacher.surname}
                  </h3>

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

                  {!visibility[teacher.id] && (
                    <button
                      className={css.buttonReadMore}
                      type="button"
                      onClick={() => {
                        setVisibility({ ...visibility, [teacher.id]: true });
                      }}
                    >
                      Read more
                    </button>
                  )}

                  {visibility[teacher.id] && (
                    <TeacherDetails teacher={teacher} />
                  )}

                  <TeacherLevels levels={teacher.levels} />

                  {visibility[teacher.id] && (
                    <button
                      className={css.buttonBookTrialLesson}
                      type="button"
                      onClick={() => onClickModal(teacher.id)}
                    >
                      Book trial lesson
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {modalState.isOpen && modalState.name === 'bookLesson' && (
          <Modal isOpen={modalState.isOpen} onClose={closeModal}>
            <BookLesson teacher={teacher} />
          </Modal>
        )}
      </Container>
    </section>
  );
};

export default TeachersList;
