import Apiclient from "./apiClient.js";
const API_URL = "/api/v1/complain";

const getAllComplains = async () => {
  try {
    const response = await Apiclient.get(API_URL + `/getAllComplains`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const deleteById = async (id) => {
  try {
    const response = await Apiclient.delete(API_URL + `/deleteComplains/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default { getAllComplains, deleteById };
