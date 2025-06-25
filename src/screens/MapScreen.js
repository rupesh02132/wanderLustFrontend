import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllListings } from '../state/listing/Action';
import Map from '../components/Map';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useParams, useNavigate } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const MapScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: cityId } = useParams();
  const {  loading, error} = useSelector((state) => state.listings);
  const {listing}=useSelector(store=>store.listings);
  const listings=listing.listings;
console.log("listings./",listings);
console.log('loading',loading)
console.log('error',error)
console.log('cityId',cityId)



  useEffect(() => {
    dispatch(getAllListings(cityId));
  }, [cityId, dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          {cityId ? `Listings in ${decodeURIComponent(cityId)}` : 'All Vacation Rentals'}
        </h1>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        >
          <FaHome className="mr-2" /> Back to Listings
        </button>
      </div>
      
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Map listings={listings} />
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Showing {listings?.length || 0} listings on map
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default MapScreen;