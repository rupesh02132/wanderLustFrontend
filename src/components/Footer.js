const Footer = () => {
    return (
      <footer className="bg-dark text-white mt-5 p-4 text-center">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Wanderlust. All rights reserved.
          </p>
          <div className="mt-2">
            <a href="/contact" className="text-white mx-2">About</a>
            <a href="/contact" className="text-white mx-2">Contact</a>
            <a href="/" className="text-white mx-2">Terms of Service</a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;