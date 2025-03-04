import { useState } from "react";
import PatientSearchBar from "./PatientSearchBar.jsx";

const PatientSearchPage = () => {
  const [results, setResults] = useState([]);

  const handleSearch = async (searchCriteria) => {
    console.log("Searching with criteria:", searchCriteria);

    // Call the API or perform the search logic here
    try {
      const response = await fetch("/api/searchPatients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchCriteria),
      });

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="p-8">
      <h2>Find Patient ...</h2>
      <PatientSearchBar onSearch={handleSearch} />
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Search Results:</h2>
        {results.length > 0 ? (
          <ul>
            {results.map((patient) => (
              <li key={patient.id} className="p-2 border-b">
                {patient.name} - Age: {patient.age} - Address: {patient.address}{" "}
                - Mobile: {patient.mobileNumber}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found.</p>
        )}
      </div>
    </div>
  );
};

export default PatientSearchPage;
