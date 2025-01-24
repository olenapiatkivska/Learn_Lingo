import css from './HomeStats.module.css';

const HomeStats = () => {
  return (
    <section className={css.homeStatsWrapp}>
      <ul className={css.homeStatsList}>
        <li className={css.homeStatsItem}>
          <p className={css.homeStatsNumber}>32,000 +</p>
          <p className={css.homeStatsText}>Experienced tutors</p>
        </li>
        <li className={css.homeStatsItem}>
          <p className={css.homeStatsNumber}>300,000 +</p>
          <p className={css.homeStatsText}>5-star tutor reviews</p>
        </li>
        <li className={css.homeStatsItem}>
          <p className={css.homeStatsNumber}>120 +</p>
          <p className={css.homeStatsText}>Subjects taught</p>
        </li>
        <li className={css.homeStatsItem}>
          <p className={css.homeStatsNumber}>200 +</p>
          <p className={css.homeStatsText}>Tutor nationalities</p>
        </li>
      </ul>
    </section>
  );
};

export default HomeStats;
