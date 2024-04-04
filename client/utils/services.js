export const baseUrl = "https://moveotask-e3ib.onrender.com";

export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!data) {
    return console.log("Failed to get request");
  }

  return data;
};
