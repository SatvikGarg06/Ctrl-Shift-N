import { URL } from "./constants";

async function requestHandler(request, urlExt, data) {
  try {
    const response = await fetch(`${URL}${urlExt}`, {
      method: request,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    // Check for non-2xx status codes
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (err) {
    console.error("Error in requestHandler:", err);
    // Optionally, rethrow the error if you want further handling upstream.
    throw err;
  }
}
export default requestHandler






