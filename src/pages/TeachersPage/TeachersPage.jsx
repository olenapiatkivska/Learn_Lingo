import { useEffect, useState } from 'react';
import TeachersList from '../../components/TeachersList/TeachersList.jsx';
import { database } from '../../services/firebaseConfig.js';
import { child, get, ref } from 'firebase/database';
import Container from '../../components/Container/Container.jsx';
import css from './TeachersPage.module.css';

const TEACHERS_COLLECTION = 'teachers';
const TEACHERS_PER_PAGE = 4;

const TeachersPage = () => {
  const [teachers, setTeachers] = useState([]);
  const [count, setCount] = useState(TEACHERS_PER_PAGE);
  const dbRef = ref(database);
  const [isLoading, setIsLoading] = useState(false);

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
    if (count >= teachers.length) return;
    setCount(prevCount => prevCount + TEACHERS_PER_PAGE);
  };

  const limitedTeachers = teachers.slice(0, count);

  return (
    <section className={css.teachersPage}>
      <Container>
        <TeachersList item={limitedTeachers} />
        {count <= teachers.length && (
          <button
            className={css.teachersPageLoadMore}
            type="button"
            onClick={handleMoreButtonClick}
          >
            {isLoading ? 'Loading...' : 'Load more'}
          </button>
        )}
      </Container>
    </section>
  );
};

export default TeachersPage;
