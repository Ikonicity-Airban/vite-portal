import http from "./https";

export const baseGet = async (url: string) => {
  const response = await http.get(url);
  return response.data;
};
export const basePost = async <T>(url: string, data: T) => {
  const response = await http.post(url, data);
  return response.data;
};
export const baseUpdate = async <T>(url: string, data: T) => {
  const response = await http.patch(url, data);
  return response.data;
};
export const baseDelete = async (url: string) => {
  const response = await http.delete(url);
  return response.data;
};
