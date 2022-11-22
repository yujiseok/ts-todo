import { API_CONFIG } from "../store/store";

export const request = async (endpoint, method, body = null) => {
  if (body !== null) {
    body = JSON.stringify(body);
  }
  try {
    const res = await fetch(`${API_CONFIG.BASEURL}${endpoint}`, {
      method,
      headers: API_CONFIG.HEADERS,
      body,
    });

    const json = await res.json();

    // console.log(json);
    return json;
  } catch (error) {
    console.log(error);
  }
};
