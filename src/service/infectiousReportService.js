import Apiclient from "./apiClient.js";
const API_URL = "/api/v1/report";

const getReportById = async () => {
  try {
    const response = await Apiclient.get(API_URL + `/getAllReports`);
    //console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching reports:", error);
    throw error;
  }
};

export default { getReportById };
