import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";
import NewsService from "../../../service/NewsService";
import toast from "react-hot-toast";

const NewsManagement = () => {
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    date: "",
    venue: "",
    type: "",
    image: null,
    preview: null,
  });

  const eventTypes = [
    "Blood Donation Camp",
    "Medical Camp",
    "Health Screening",
    "Vaccination Drive",
    "Dengue Prevention Campaign",
    "Free Eye Check-up",
    "COVID-19 Awareness & Testing",
    "Mental Health Camp",
    "Nutrition Awareness Program",
    "Non-Communicable Diseases (NCD) Awareness",
    "Reproductive Health & Hygiene Education",
    "Substance Abuse Awareness",
    "Water Sanitation & Hygiene (WASH) Program",
    "Family Planning Awareness",
    "STD/HIV Prevention Awareness",
    "Anti-Smoking Campaign",
    "Charity Program for Low-Income Families",
    "Distribution of Free Medicines",
    "Mobile Health Clinic for Rural Areas",
    "Elderly Care Initiative",
    "Women & Child Welfare Camp",
    "Cleanliness and Sanitation Drive",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  const handleRemoveImage = () => {
    URL.revokeObjectURL(formData.preview);
    setFormData((prev) => ({
      ...prev,
      image: null,
      preview: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const submission = new FormData();
    submission.append("title", formData.title);
    submission.append("message", formData.message);
    submission.append("type", formData.type);
    submission.append("venue", formData.venue);
    submission.append("date", formData.date);
    if (formData.image) {
      submission.append("image", formData.image);
    }

    console.log("FormData to submit:", formData);

    try {
      const response = await NewsService.saveNews(submission);
      console.log(response.data);
      toast.success("succesfully post the news to public :)");
    } catch (error) {
      console.log(error);
      toast.error("something went wrong");
    }

    setFormData({
      title: "",
      message: "",
      date: "",
      venue: "",
      type: "",
      image: null,
      preview: null,
    });
  };

  useEffect(() => {
    return () => {
      if (formData.preview) {
        URL.revokeObjectURL(formData.preview);
      }
    };
  }, [formData.preview]);

  return (
    <div className="p-4 space-y-6">
      <Card>
        <CardHeader
          title="Post New MOH Event"
          subheader="Fill in the details to publish an official event"
        />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Venue */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Venue</label>
                <input
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Date & Time */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Date & Time</label>
                <input
                  type="datetime-local"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Event Type */}
              <div className="space-y-2">
                <label className="block text-sm font-medium">Event Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select type</option>
                  {eventTypes.map((type, idx) => (
                    <option key={idx} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium">
                  Message / Description
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  className="w-full p-2 border rounded"
                />
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2 space-y-2">
                <label className="block text-sm font-medium">
                  Upload Image
                </label>
                {!formData.preview ? (
                  <label className="flex items-center justify-center px-4 py-6 border-2 border-dashed rounded cursor-pointer">
                    <span className="text-gray-500">Click to upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                  </label>
                ) : (
                  <div className="relative inline-block group">
                    <img
                      src={formData.preview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-0 right-0 bg-red-600 text-white rounded-full px-2 py-0.5 text-xs"
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4 border-t">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded font-medium"
              >
                Publish Event
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsManagement;
