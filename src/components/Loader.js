import { ClipLoader } from 'react-spinners';

const Loader = () => {
  return (
    <div className="text-center my-4">
      <ClipLoader color="#0d6efd" size={50} />
    </div>
  );
};

export default Loader;