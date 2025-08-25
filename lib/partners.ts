export const fetchPartners = async () => {
  try {
    const response = await fetch('/json/partners.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parse the JSON
    return data;
  } catch (error) {
    console.error('Error fetching partners:', error);
    throw error;
  }
};