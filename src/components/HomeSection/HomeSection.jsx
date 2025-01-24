import { useNavigate } from 'react-router-dom';
import css from './HomeSection.module.css';

const HomeSection = () => {
  const nav = useNavigate();

  return (
    <div className={css.homeSectionrapp}>
      <h1 className={css.homeSectionTitle}>
        Unlock your potential with the best{' '}
        <span className={css.homeSectionSpan}>language</span> tutors
      </h1>
      <p className={css.homeSectionText}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <button
        type="button"
        className={css.btnGetStarted}
        onClick={() => nav('/teachers')}
      >
        Get started
      </button>
    </div>
  );
};

export default HomeSection;
