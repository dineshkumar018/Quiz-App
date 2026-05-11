async function fetchQuestionAPI(handleResponse, handleError, setLoading) {
  setLoading(true);
  try {
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const endpoint = "/v1/questions";

    const url = new URL(endpoint, baseUrl);

    const response = await fetch(url);

    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "unknown error occured"
      throw new Error(errorMessage);
    }

    handleResponse(jsonData);
  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
}
export default fetchQuestionAPI;