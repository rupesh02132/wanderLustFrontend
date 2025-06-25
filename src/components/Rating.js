import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const Rating = ({ value, text }) => {

  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="text-xl">
          {value >= i + 1 ? (
            <FaStar className="text-yellow-400 transition-transform hover:scale-110" />
          ) : value >= i + 0.5 ? (
            <FaStarHalfAlt className="text-yellow-400 transition-transform hover:scale-110" />
          ) : (
            <FaRegStar className="text-gray-300" />
          )}
        </span>
      ))}
      {text && (
        <span className="ml-2 text-sm font-medium text-muted text-gray-700">
          {text}
        </span>
      )}
    </div>
  );
};

export default Rating;
