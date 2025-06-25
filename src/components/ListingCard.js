import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ListingCard = ({ listing }) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <Link to={`/listings/${listing._id}`} className="block group">
        {/* Image */}
        <div className="aspect-square rounded-xl overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Details */}
        <div className="mt-3 space-y-1">
          <div className="flex justify-between text-sm text-gray-600">
            <p className="font-medium">{listing.city}, {listing.country}</p>
            {listing.rating > 0 && (
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-500 text-sm" />
                <span>{listing.rating}</span>
              </div>
            )}
          </div>

          <h3 className="text-base font-semibold text-gray-800 truncate">
            {listing.title}
          </h3>

          <p className="text-sm text-gray-500">{listing.category}</p>

          <p className="text-sm text-gray-800">
            <span className="font-medium">₹{listing.price}</span> / night
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard;
