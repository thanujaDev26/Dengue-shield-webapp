import { useNavigate } from "react-router-dom";
export default function LandingPHI() {
  const navigate = useNavigate();

  const handleShowH544Table = () => {
    navigate("/h544-table"); // Redirect to H544Table page
  };

  const handleVisitInward = () => {
    navigate("/visit-inward"); // Redirect to H544Table page
  };

  const handleShowAcceptedRequests = () => {
    navigate("/accepted-requests"); // Redirect to AcceptedRequestsTable page
  };

  return (
    <div className="md:w-1/2 p-12 text-center md:text-left" id="PHI">
      <div>
        <div>
          <div className="flex flex-col md:flex-row items-center text-center">
            <button
              onClick={handleShowAcceptedRequests}
              className="md:m-4 m-4 rounded-3xl border-2 bg-emerald-500 border-emerald-600 md:w-full w-11/12 h-30 shadow-2xl transition duration-700 ease-in-out hover:scale-105"
            >
              <div className="flex-shrink-0 flex items-center justify-center p-3">
                <h1 className="p-1 text-xl font-bold text-white">
                  Continue Campaigns
                </h1>
              </div>
              <p className="py-1 px-10 text-md font-normal text-white">
                Continue received H544 Campaigns
              </p>
            </button>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center text-center">
          <button
            onClick={handleShowH544Table}
            className="md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/2 w-11/12 h-30 shadow-2xl transition duration-700 ease-in-out hover:scale-105"
          >
            <div className="flex-shrink-0 flex items-center justify-center p-3">
              <h1 className="p-1 text-xl font-bold text-gray-600">
                Check Received H544 Requests
              </h1>
            </div>
            <p className="py-1 px-10 text-md font-normal text-gray-600">
              Check received H544 from MOH
            </p>
          </button>

          <button
            className="md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/2 w-11/12 h-30 shadow-2xl transition duration-700 ease-in-out hover:scale-105"
            onClick={() => {
              navigate("/infections-diseases-table");
            }}
          >
            <div className="flex-shrink-0 flex items-center justify-center p-3">
              <h1 className="p-1 text-xl font-bold text-gray-600">
                Infectious Diseases Register
              </h1>
            </div>
            <p className="py-1 px-10 text-md font-normal text-gray-600">
              Check Infectious Diseases Register
            </p>
          </button>
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row items-center text-center">
          <button
            onClick={handleVisitInward}
            className="md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/2 w-11/12 h-30 shadow-2xl transition duration-700 ease-in-out hover:scale-105"
          >
            <div className="flex-shrink-0 flex items-center justify-center p-3">
              <h1 className="p-1 text-xl font-bold text-gray-600">
                View Document Inward
              </h1>
            </div>
            <p className="py-1 px-10 text-md font-normal text-gray-600">
              Check Inward Register
            </p>
          </button>

          <button
            className="md:m-4 m-4 rounded-3xl border-2 border-emerald-500 md:w-1/2 w-11/12 h-30 shadow-2xl transition duration-700 ease-in-out hover:scale-105"
            onClick={() => {
              navigate("/outwardform");
            }}
          >
            <div className="flex-shrink-0 flex items-center justify-center p-3">
              <h1 className="p-1 text-xl font-bold text-gray-600">
                View Document Outward
              </h1>
            </div>
            <p className="py-1 px-10 text-md font-normal text-gray-600">
              Check Outward Register
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}
