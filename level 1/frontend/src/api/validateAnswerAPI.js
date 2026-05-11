async function validateAnswerAPI(
  questionId,
  answer,
  handleResponse,
  handleError,
  setLoading,
) {
  try {
    setLoading(true);
    const baseUrl = import.meta.env.VITE_APP_BASE_URL;
    const endpoint = "/v1/questions/validate-answer";
    const url = new URL(endpoint, baseUrl);
    const requestBody = JSON.stringify({
      id: questionId,
      answer,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: requestBody,
    };

    const response = await fetch(url, requestOptions);

    const jsonData = await response.json();

    if (!response.ok) {
      const errorMessage = jsonData.message || "unknown error occured";
      throw new Error(errorMessage);
    }

    handleResponse(jsonData);
  } catch (error) {
    handleError(error);
  } finally {
    setLoading(false);
  }
}
export default validateAnswerAPI;
