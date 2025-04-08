import Apiclient from "./apiClient.js";
const API_URL = "/api/v1/events";

const saveNews = async (formData) => {
  try {
    const response = await Apiclient.post(API_URL + `/saveNews`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Ensure this header is set, but axios will set it automatically when you pass FormData
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { saveNews };
