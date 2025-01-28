import css from './TeacherLevels.module.css';

const TeacherLevels = ({ levels }) => {
  return (
    <div className={css.teacherLevels}>
      {levels.map((level, index) => {
        return (
          <p className={css.teacherLevelsText} key={index}>
            {level}
          </p>
        );
      })}
    </div>
  );
};

export default TeacherLevels;
