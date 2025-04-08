import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@mui/material";

const NewsManagement = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    author: "",
    image: null,
    preview: null,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    return () => {
      if (formData.preview) {
        URL.revokeObjectURL(formData.preview);
      }
    };
  }, [formData.preview]);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    console.log("News Submitted:", formData);
    // Reset form
    setFormData({
      title: "",
      date: "",
      author: "",
      image: null,
      preview: null,
    });
  };

  return (
    <div className="p-4 space-y-6">
      {/* News Submission Form */}
      <Card>
        <CardHeader
          title="Post New Article"
          subheader="Fill in the details below to publish a new news article"
        />
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  required
                />
              </div>

              {/* Date Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Author Field */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Author Name
                </label>
                <input
                  type="text"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-emerald-500"
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Upload a Image
                </label>
                <div className="flex items-center gap-4">
                  {!formData.preview ? (
                    <label className="flex flex-col items-center px-4 py-6 border-2 border-dashed rounded cursor-pointer hover:border-emerald-500">
                      <svg
                        className="w-8 h-8 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="mt-2 text-sm text-gray-600">
                        Click to upload
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative group">
                      <img
                        src={formData.preview}
                        alt="Preview"
                        className="w-20 h-20 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t pt-6">
              <button
                type="submit"
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-3 rounded-lg font-medium transition-colors"
              >
                Publish Article
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewsManagement;
