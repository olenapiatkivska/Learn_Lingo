import girlImage from '../../shared/images/girl.png';
import macImage from '../../shared/images/mac.png';

import css from './HomeImg.module.css';

const HomeImg = () => {
  return (
    <div className={css.homeImgWrapp}>
      <img src={girlImage} className={css.homeImgGirl} width="339" alt="Girl" />
      <img
        src={macImage}
        className={css.homeImgMac}
        width="391"
        alt="Mac laptop"
      />
    </div>
  );
};

export default HomeImg;
