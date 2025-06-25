import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  createListing,
  updateListing,
  getListingById,
} from '../state/listing/Action';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ListingFormScreen = () => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    price: '',
    city: '',
    country: '',
    guests: '',
    bedrooms: '',
    beds: '',
    baths: '',
    amenities: '',
    category: 'Apartment',
    images: [''],
    location: {
      type: 'Point',
      coordinates: ['', ''],
    },
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, success, currentListing } = useSelector(
    (state) => state.listings
  );

  useEffect(() => {
    if (id) dispatch(getListingById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (id && currentListing) {
      setFormData({
        ...currentListing,
        amenities: currentListing.amenities?.join(', ') || '',
        images: currentListing.images || [''],
        location: {
          type: 'Point',
          coordinates: currentListing.location?.coordinates || [0, 0],
        },
      });
    }
  }, [currentListing, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };

  const addImageField = () => {
    setFormData({ ...formData, images: [...formData.images, ''] });
  };

  const handleCoordinateChange = (index, value) => {
    const updatedCoordinates = [...formData.location.coordinates];
    updatedCoordinates[index] = parseFloat(value);
    setFormData({
      ...formData,
      location: {
        ...formData.location,
        coordinates: updatedCoordinates,
      },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const preparedData = {
      ...formData,
      price: Number(formData.price),
      guests: Number(formData.guests),
      bedrooms: Number(formData.bedrooms),
      beds: Number(formData.beds),
      baths: Number(formData.baths),
      amenities: formData.amenities.split(',').map((a) => a.trim()),
      location: {
        type: 'Point',
        coordinates: formData.location.coordinates.map(Number),
      },
    };

    if (id) {
      dispatch(updateListing({ id, listingData: preparedData }));
      navigate('/host');
    } else {
      dispatch(createListing(preparedData));
      navigate('/');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">
        {id ? 'Edit Listing' : 'Create Listing'}
      </h1>

      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-gray-200"
      >
        {/* Title & Address */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            name="title"
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            name="address"
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <textarea
          name="description"
          className="form-control w-full p-2 border border-gray-300 rounded"
          placeholder="Description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          required
        />

        {/* Price, City, Country */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input
            name="price"
            type="number"
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            required
          />
          <input
            name="city"
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
          />
          <input
            name="country"
            className="form-control w-full p-2 border border-gray-300 rounded"
            placeholder="Country"
            value={formData.country}
            onChange={handleChange}
            required
          />
        </div>

        {/* Guests, Bedrooms, Beds, Baths */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <input
            name="guests"
            type="number"
            className="form-control p-2 border border-gray-300 rounded"
            placeholder="Guests"
            value={formData.guests}
            onChange={handleChange}
          />
          <input
            name="bedrooms"
            type="number"
            className="form-control p-2 border border-gray-300 rounded"
            placeholder="Bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
          />
          <input
            name="beds"
            type="number"
            className="form-control p-2 border border-gray-300 rounded"
            placeholder="Beds"
            value={formData.beds}
            onChange={handleChange}
          />
          <input
            name="baths"
            type="number"
            className="form-control p-2 border border-gray-300 rounded"
            placeholder="Baths"
            value={formData.baths}
            onChange={handleChange}
          />
        </div>

        {/* Amenities */}
        <input
          name="amenities"
          className="form-control w-full p-2 border border-gray-300 rounded"
          placeholder="Amenities (comma separated)"
          value={formData.amenities}
          onChange={handleChange}
        />

        {/* Category */}
        <select
          name="category"
          className="form-select w-full p-2 border border-gray-300 rounded"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="Apartment">Apartment</option>
          <option value="House">House</option>
          <option value="Cabin">Cabin</option>
          <option value="Villa">Villa</option>
        </select>

        {/* Image URLs */}
        <div>
          <label className="block font-medium mb-2">Image URLs:</label>
          <div className="space-y-2">
            {formData.images.map((img, index) => (
              <input
                key={index}
                name={`image-${index}`}
                className="form-control w-full p-2 border border-gray-300 rounded"
                placeholder={`Image URL ${index + 1}`}
                value={img}
                onChange={(e) => handleImageChange(index, e.target.value)}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={addImageField}
            className="text-blue-600 hover:underline mt-2"
          >
            + Add More Images
          </button>
        </div>

        {/* Location Coordinates */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="number"
            step="any"
            placeholder="Longitude"
            className="form-control p-2 border border-gray-300 rounded"
            value={formData.location.coordinates[0]}
            onChange={(e) => handleCoordinateChange(0, e.target.value)}
            required
          />
          <input
            type="number"
            step="any"
            placeholder="Latitude"
            className="form-control p-2 border border-gray-300 rounded"
            value={formData.location.coordinates[1]}
            onChange={(e) => handleCoordinateChange(1, e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-primary w-full py-2 bg-blue-600 hover:bg-blue-700 text-white rounded shadow-sm transition"
        >
          {id ? 'Update Listing' : 'Create Listing'}
        </button>
      </form>
    </div>
  );
};

export default ListingFormScreen;
