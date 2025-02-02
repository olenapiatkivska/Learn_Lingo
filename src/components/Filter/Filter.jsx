import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { onValue, orderByChild, query, ref } from 'firebase/database';
import { database } from '../../services/firebaseConfig.js';
import { useCallback, useEffect, useState } from 'react';
import {
  addFilter,
  addFilterName,
  deleteFilter,
} from '../../redux/SlicefFlter.js';
import TeachersList from '../TeachersList/TeachersList.jsx';
import { TiDelete } from 'react-icons/ti';
import { FormControl, MenuItem, Select } from '@mui/material';
import { styled } from '@mui/material/styles';
import css from './Filter.module.css';

const levels = [
  'A1 Beginner',
  'A2 Elementary',
  'B1 Intermediate',
  'B2 Upper-Intermediate',
  'C1 Advanced',
  'C2 Proficient',
];

const price = ['15', '20', '25', '30', '35'];

const languages = [
  'French',
  'German',
  'Mandarin Chinese',
  'English',
  'Spanish',
  'Italian',
  'Korean',
  'Vietnamese',
];

const Input = styled(Select)(() => ({
  fontFamily: '"Roboto", sans-serif',
  borderRadius: '14px',
  backgroundColor: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    border: 'none',
  },
}));

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.filter.filterTeachers);
  const { pathname } = useLocation();
  const dbRef = ref(database, 'teachers');

  const [options, setOptions] = useState({
    language: '',
    levels: '',
    price: '',
  });
  const [item, setItem] = useState({
    language: [],
    levels: [],
  });
  const [search, setSearch] = useState(false);

  const handleClickLanguage = useCallback(
    event => {
      const selectedLanguage = event.target.value;

      setOptions(prev => ({
        ...prev,
        language: selectedLanguage,
        price: '',
        levels: '',
      }));

      setSearch(true);

      const queryPar = query(dbRef, orderByChild('languages'));

      if (options.language !== selectedLanguage) {
        setOptions(prev => ({ ...prev, price: '', levels: '' }));
      }

      onValue(queryPar, snapshot => {
        const teachers = snapshot.val();

        if (!teachers || typeof teachers !== 'object') {
          console.error('Invalid data structure for teachers:', teachers);
          return;
        }

        const language = Object.keys(teachers)
          .filter(key => teachers[key].languages.includes(selectedLanguage))
          .map(key => ({ ...teachers[key] }));

        setItem(prev => ({ ...prev, language }));

        dispatch(addFilterName(selectedLanguage));
        return dispatch(addFilter(language));
      });
    },
    [dbRef, dispatch, options.language],
  );

  const handleClickLevel = useCallback(
    event => {
      const selectedLevels = event.target.value;
      setOptions(prev => ({ ...prev, levels: selectedLevels }));
      setSearch(true);

      if (options.price !== '') {
        setOptions(prev => ({ ...prev, price: '' }));
      }

      const levels = item.language.filter(teacher =>
        teacher.levels.includes(selectedLevels),
      );

      setItem(prev => ({ ...prev, levels }));

      return dispatch(addFilter(levels));
    },
    [options.price, item, dispatch],
  );

  const handleClickPrice = useCallback(
    event => {
      const selectedPrice = event.target.value;
      setOptions(prev => ({ ...prev, price: selectedPrice }));
      setSearch(true);

      const filterByLevel =
        item.levels.length !== 0 ? item.levels : item.language;

      const teachers = filterByLevel.filter(
        teacher => teacher.price_per_hour >= Number(selectedPrice),
      );

      const teacherSort = [...teachers].sort(
        (a, b) => a.price_per_hour - b.price_per_hour,
      );

      return dispatch(addFilter(teacherSort));
    },
    [item, dispatch],
  );

  useEffect(() => {
    if (pathname !== '/teacher') {
      dispatch(deleteFilter());
    }
  }, [dispatch, pathname]);

  const clearFilter = () => {
    setOptions({
      language: '',
      levels: '',
      price: '',
    });

    setSearch(false);
    return dispatch(deleteFilter());
  };

  return (
    <>
      <div className={css.filterContainer}>
        <FormControl sx={{ marginRight: '20px', minWidth: 221 }} size="small">
          <p className={css.formControlTitle}>Language</p>
          <Input value={options.language} onChange={handleClickLanguage}>
            {languages.map((options, index) => (
              <MenuItem value={options} key={index}>
                {options}
              </MenuItem>
            ))}
          </Input>
        </FormControl>
        <FormControl sx={{ marginRight: '20px', minWidth: 198 }} size="small">
          <p className={css.formControlTitle}>Levels of knowledge</p>
          <Input value={options.levels} onChange={handleClickLevel}>
            {levels.map((options, index) => (
              <MenuItem value={options} key={index}>
                {options}
              </MenuItem>
            ))}
          </Input>
        </FormControl>
        <FormControl sx={{ marginRight: '20px', minWidth: 124 }} size="small">
          <p className={css.formControlTitle}>Price</p>
          <Input value={options.price || ''} onChange={handleClickPrice}>
            {price.map((options, index) => (
              <MenuItem value={options} key={index}>
                {options}
              </MenuItem>
            ))}
          </Input>
        </FormControl>

        {Object.values(options).join('') !== '' && (
          <button
            type="button"
            className={css.filterContainerBtnClear}
            onClick={clearFilter}
          >
            <TiDelete className={css.filterContainerBtnSvg} />
          </button>
        )}
      </div>
      {filter.length === 0 && search && (
        <p className={css.filterContainerFound}>
          Unfortunately, we did not find any teachers according to the specified
          criteria.
        </p>
      )}

      <TeachersList item={filter} />
    </>
  );
};

export default Filter;
