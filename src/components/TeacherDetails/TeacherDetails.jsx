import Icon from '../../shared/Icon.jsx';
import avatar from '../../shared/images/group.png';
import css from './TeacherDetails.module.css';

const TeacherDetails = ({ teacher }) => {
  return (
    <div>
      <p className={css.teacherDetailsText}>{teacher.experience}</p>
      <ul className={css.teacherDetailsList}>
        {teacher.reviews.map((review, reviewIndex) => (
          <li key={reviewIndex}>
            <div className={css.teacherDetailsImgWrapp}>
              <img
                className={css.teacherDetailsImg}
                src={avatar}
                width="44"
                height="44"
                alt="Reviews avatar"
              />
              <div>
                <p className={css.teacherDetailsName}>{review.reviewer_name}</p>
                <p className={css.teacherDetailsRating}>
                  <span>
                    <Icon id="star" width="16" height="16" ariaLabel="Rating" />
                  </span>
                  {review.reviewer_rating.toFixed(1)}
                </p>
              </div>
            </div>
            <p className={css.teacherDetailsComment}>{review.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeacherDetails;
