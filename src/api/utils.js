export const post = async (url, data) => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`API Error: ${response.status} ${msg}`);
    }
    const responseData = await response.json();
    console.debug("response", responseData);
    return responseData;
  } catch (error) {
    console.error("Error posting data", error);
    throw error;
  }
};

export const get = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      const msg = await response.text();
      throw new Error(`API Error: ${response.status} ${msg}`);
    }
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error fetching event:", error);
    throw error; //Wichtig – wir lösen einen Fehler aus, um ihn in der Komponente abzufangen.
  }
};
