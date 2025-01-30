import Container from '../../components/Container/Container.jsx';
import TeachersList from '../../components/TeachersList/TeachersList.jsx';
import { database } from '../../services/firebaseConfig.js';
import { useFavorite } from '../../services/favorite.js';
import css from './FavoritesPage.module.css';

const FavoritesPage = () => {
  const favorite = useFavorite(database);

  return (
    <section className={css.favoritesPage}>
      <Container>
        <TeachersList item={favorite} />

        {favorite.length === 0 && (
          <p className={css.noFavorites}>
            No favorite teachers yet. <br />
            Access for authorized users only.
          </p>
        )}
      </Container>
    </section>
  );
};

export default FavoritesPage;
