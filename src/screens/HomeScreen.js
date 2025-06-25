import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import ListingCard from '../components/ListingCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import SearchBar from '../components/SearchBar';
import { findListing } from '../state/listing/Action';
import { FaMap } from 'react-icons/fa';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { listings } = useSelector((store) => store);
  console.log('listings from home',listings);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchCity, setSearchCity] = useState('');
  
  const listingsPerPage = 16;
  const [totalListings, setTotalListings] = useState(0);
  const totalPages = Math.ceil(totalListings / listingsPerPage);
  const {totalCount}=listings.listing;
  const listing=listings.listing.listings;
  
  const { loading, error  } = listings; 

 useEffect(() => {
    dispatch(findListing({ 
      city: searchCity,
      skip: (currentPage - 1) * listingsPerPage,
      limit: listingsPerPage
    }));
  }, [dispatch, currentPage, searchCity]);

  // Update total listings when data changes
  useEffect(() => {
    if (totalCount !== undefined) {
      setTotalListings(totalCount);
    }
  }, [totalCount]);

  // Search handler
  const searchHandler = (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    setSearchCity(city);
    setCurrentPage(1);
    dispatch(findListing({ 
      city, 
      skip: 0,
      limit: listingsPerPage
    }));
  };

  // View all listings on map
  const viewAllOnMap = () => {
    const mapUrl = searchCity ? `/map/${encodeURIComponent(searchCity)}` : '/map';
    navigate(mapUrl);
  };

  // Pagination handlers
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Get current page listings
  const currentListings = Array.isArray(listing) ? listing : [];

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">Vacation Rentals</h1>

      {/* Search Bar */}
      <div className="mb-8 max-w-2xl mx-auto">
        <SearchBar searchHandler={searchHandler} />
      </div>

      {/* View All on Map Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={viewAllOnMap}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <FaMap />
          View All on Map
        </button>
      </div>

      {/* Loading or Error */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="error">{error}</Message>
      ) : (
        <div className="mt-6">
          {/* Results Count */}
          <div className="mb-4 text-sm md:text-base">
            {currentListings.length > 0 ? (
              <p>
                Page {currentPage} of {totalPages} - 
                Showing {currentListings.length} of {totalListings} listings
                {searchCity && ` in ${searchCity}`}
              </p>
            ) : (
              <p>No results found</p>
            )}
          </div>

          {/* Listings Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {currentListings.map((listing) => (
              <Link 
                to={`/listing/${listing._id}`}
                key={listing._id} 
                className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <ListingCard listing={listing} />
              </Link>
            ))}
          </div>

          {/* No Results Message */}
          {currentListings.length === 0 && !loading && (
            <div className="text-center py-12">
              <p className="text-gray-500 text-xl">No listings match your search criteria</p>
              <button 
                onClick={() => {
                  setSearchCity('');
                  setCurrentPage(1);
                  dispatch(findListing({ skip: 0, limit: listingsPerPage }));
                }}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Reset Search
              </button>
            </div>
          )}

          {/* Pagination Controls - FIXED CONDITION */}
          {totalPages > 1 && (
  <div className="flex flex-col sm:flex-row justify-center items-center mt-8 gap-4 sm:gap-6">
    <button
      onClick={prevPage}
      disabled={currentPage === 1}
      className={`w-full sm:w-auto px-5 py-2 rounded-lg font-medium transition duration-200 text-center
        ${currentPage === 1
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
    >
      ← Previous
    </button>

    <span className="text-sm sm:text-base text-gray-800 font-semibold">
      Page <span className="text-indigo-600">{currentPage}</span> of <span className="text-indigo-600">{totalPages}</span>
    </span>

    <button
      onClick={nextPage}
      disabled={currentPage === totalPages}
      className={`w-full sm:w-auto px-5 py-2 rounded-lg font-medium transition duration-200 text-center
        ${currentPage === totalPages
          ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
          : 'bg-indigo-600 text-white hover:bg-indigo-700'
        }`}
    >
      Next →
    </button>
  </div>
)}

        </div>
      )}
    </div>
  );
};

export default HomeScreen;