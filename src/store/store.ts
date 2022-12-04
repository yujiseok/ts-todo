const API_CONFIG = {
  HEADERS: {
    "content-type": "application/json",
    apikey: import.meta.env.VITE_API_KEY,
    username: import.meta.env.VITE_USER_NAME,
  },
  BASEURL: "https://asia-northeast3-heropy-api.cloudfunctions.net/api/",
};

const container = document.getElementById("container") as HTMLDivElement;
const modalContainer = document.querySelector(
  ".modal-container"
) as HTMLDivElement;
export { API_CONFIG, container, modalContainer };
