// import sprite from './sprite.svg';

// export default function Icon({ className, width, height, id }) {
//   return (
//     <>
//       <svg className={className} width={width} height={height}>
//         <use href={`${sprite}#${id}`} />
//       </svg>
//     </>
//   );
// }

const Icon = ({ id, className, width, height }) => {
  return (
    <svg className={className} width={width} height={height}>
      <use href={`/Icons/sprite.svg#${id}`} />
    </svg>
  );
};

export default Icon;
