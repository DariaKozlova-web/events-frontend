import { Link } from "react-router";
import notFoundImg from '../assets/error-pic.png'

export const NotFound=() =>{
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-evBg px-6 py-4 text-center font-sans">

      {/* Error picture*/}
      <img
        src={notFoundImg}
        alt="Not found illustration"
        className="w-60 h-auto mb-8 drop-shadow-lg"
      />

      {/* Title */}
      <h1 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        Oops! Page not found.
      </h1>

      {/* Description */}
      <p className="text-gray-600 text-base md:text-lg max-w-md mb-8">
        The page you are looking for appears to have disappeared or never existed.
      </p>

      {/* Button */}
      <Link
        to="/"
        className="px-6 py-3 rounded-xl bg-evGreen text-gray-900 font-semibold shadow-md hover:bg-evGreen-dark transition-all"
      >
       Back to homepage
      </Link>
    </div>
  );
}