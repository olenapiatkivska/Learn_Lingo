import { useEffect, useState } from 'react';
import TeachersList from '../../components/TeachersList/TeachersList.jsx';
import { database } from '../../services/firebaseConfig.js';
import { child, get, ref } from 'firebase/database';
import Container from '../../components/Container/Container.jsx';
import css from './TeachersPage.module.css';
import Filter from '../../components/Filter/Filter.jsx';
import { useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader.jsx';

const TEACHERS_COLLECTION = 'teachers';
const TEACHERS_PER_PAGE = 4;

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const filter = useSelector(state => state.filter.filterTeachers);
  const [count, setCount] = useState(TEACHERS_PER_PAGE);
  const dbRef = ref(database);
  const [isLoading, setIsLoading] = useState(false);
  const [isDebouncing, setIsDebouncing] = useState(false);

  useEffect(() => {
    async function fetchTeachers() {
      try {
        setIsLoading(true);
        const data = await get(child(dbRef, TEACHERS_COLLECTION));
        if (data.exists()) {
          setTeachers(data.val());
          setIsLoading(false);
        } else {
          console.log('No data available for teachers');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    fetchTeachers();
  }, [dbRef]);

  const handleMoreButtonClick = () => {
    if (isDebouncing || count >= teachers.length) return;
    setIsDebouncing(true);
    setCount(prevCount => prevCount + TEACHERS_PER_PAGE);

    setTimeout(() => {
      setIsDebouncing(false);
    }, 300);
  };

  const limitedTeachers = teachers.slice(0, count);

  return (
    <section className={css.teachersPage}>
      <Container>
        <Filter />
        {isLoading && <Loader />}
        {!isLoading && filter.length === 0 && (
          <>
            <TeachersList item={limitedTeachers} />

            {count <= teachers.length && (
              <button
                className={css.teachersPageLoadMore}
                type="button"
                onClick={handleMoreButtonClick}
              >
                Load more
              </button>
            )}
          </>
        )}
      </Container>
    </section>
  );
};

export default TeachersPage;
