import { useEffect, useState } from "react";
import { Card, CardContent, Button } from "@mui/material";
import PropTypes from "prop-types";
import ComplainService from "../../../service/ComplainService";

const ComplaintsPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [expandedComplaint, setExpandedComplaint] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [complaintsPerPage] = useState(5); // Change the number of complaints per page

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await ComplainService.getAllComplains();
        if (res.code === 200 && res.data) {
          const formattedComplaints = res.data.map((c) => ({
            id: c.complaintId,
            title: c.type,
            sender: `${c.fName} ${c.lName}`,
            date: new Date(c.complaintTime).toISOString().split("T")[0],
            address: c.location,
            image: JSON.parse(c.images)[0],
            description: c.complain,
            phiAreas: ["Colombo Central", "Colombo North", "Colombo South"],
          }));
          setComplaints(formattedComplaints);
        }
      } catch (err) {
        console.error("Failed to fetch complaints:", err);
      }
    };

    fetchComplaints();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await ComplainService.deleteById(id);
      if (response.code === 200) {
        // Remove the deleted complaint from the state
        setComplaints((prevComplaints) =>
          prevComplaints.filter((complaint) => complaint.id !== id)
        );
      } else {
        console.error("Failed to delete complaint:", response.message);
      }
    } catch (error) {
      console.error("Error deleting complaint:", error);
    }
  };

  const ComplaintCard = ({ complaint }) => (
    <Card
      key={complaint.id}
      className="mb-4 shadow-lg rounded-3xl transition duration-1000 ease-in-out hover:bg-gray-300"
    >
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          {/* Left Section */}
          <div className="col-span-2">
            <h3 className="text-xl font-bold text-emerald-600 mb-2">
              {complaint.title}
            </h3>
            <div className="space-y-1 mb-4">
              <div className="flex w-full justify-between">
                <p className="text-gray-600">
                  <span className="font-medium">From:</span> {complaint.sender}
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">Date:</span> {complaint.date}
                </p>
              </div>
              <p className="text-gray-600">
                <span className="font-medium">Address:</span>{" "}
                {complaint.address}
              </p>
            </div>

            {expandedComplaint === complaint.id && (
              <p className="text-gray-700 mb-4">{complaint.description}</p>
            )}

            <div className="flex gap-4 mt-4">
              <button
                onClick={() => {
                  setExpandedComplaint(
                    expandedComplaint === complaint.id ? null : complaint.id
                  );
                }}
                className="bg-emerald-500 text-white px-4 py-2 rounded hover:bg-emerald-600"
              >
                {expandedComplaint === complaint.id ? "View Less" : "View More"}
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleDelete(complaint.id)}
              >
                Delete
              </button>
            </div>
          </div>

          {/* Right Section - Image */}
          <div className="flex justify-center items-start">
            <img
              src={complaint.image}
              alt="Complaint evidence"
              className="w-48 h-48 object-cover rounded-lg"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );

  ComplaintCard.propTypes = {
    complaint: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      sender: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      phiAreas: PropTypes.arrayOf(PropTypes.string),
    }).isRequired,
  };

  // Calculate which complaints to display on the current page
  const indexOfLastComplaint = currentPage * complaintsPerPage;
  const indexOfFirstComplaint = indexOfLastComplaint - complaintsPerPage;
  const currentComplaints = complaints.slice(
    indexOfFirstComplaint,
    indexOfLastComplaint
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-4">
      <div className="space-y-4">
        {currentComplaints.map((complaint) => (
          <ComplaintCard key={complaint.id} complaint={complaint} />
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-4">
        <Button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="mr-2"
        >
          Previous
        </Button>
        <Button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastComplaint >= complaints.length}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default ComplaintsPage;
