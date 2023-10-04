import axios from "axios";

const BASE_URL = "http://localhost:6986/api/v1";

export default axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  signal: new AbortController().signal,
  timeoutErrorMessage: "Retry, Your request is taking too long",
});

export const httpPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json", Accept: "application/json" },
  withCredentials: true,
  timeout: 10000,

  timeoutErrorMessage: "Retry, Your request is taking too long",
});
