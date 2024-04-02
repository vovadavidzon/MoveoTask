export const baseUrl = "http://localhost:5001";

export const getRequest = async (url) => {
  const response = await fetch(url);

  const data = await response.json();

  if (!data) {
    return error;
  }

  return data;
};
