import axios from "axios";

const apiRequest = axios.create({
  baseURL: "https://jp-qa.cityremit.global/web-api/",
  timeout: 30000,
});

export default apiRequest;
