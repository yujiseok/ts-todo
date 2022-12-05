import axios from "axios";
import { API_CONFIG } from "../store/store";
import { ResponseValue } from "../typing";

export const request = async (
  endpoint: string,
  method: string,
  data?: {
    title: string;
    done?: boolean;
  }
): Promise<ResponseValue> => {
  try {
    const todo = await axios(`${API_CONFIG.BASEURL}${endpoint}`, {
      method,
      headers: API_CONFIG.HEADERS,
      data,
    }).then((res) => res.data);

    return todo;
  } catch (error) {
    throw error;
  }
};
