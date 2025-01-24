import Container from '../../components/Container/Container.jsx';
import HomeImg from '../../components/HomeImg/HomeImg.jsx';
import HomeSection from '../../components/HomeSection/HomeSection.jsx';
import HomeStats from '../../components/HomeStats/HomeStats.jsx';

import css from './HomePage.module.css';

const HomePage = () => {
  return (
    <section>
      <Container>
        <div className={css.heroWrapp}>
          <HomeSection />
          <HomeImg />
        </div>

        <HomeStats />
      </Container>
    </section>
  );
};

export default HomePage;
