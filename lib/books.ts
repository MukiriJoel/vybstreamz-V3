//tbd
export const fetchBooks = async () => {
  try {
    const response = await fetch('/json/books.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json(); // Parse the JSON
    return data;
  } catch (error) {
    console.error('Error fetching music:', error);
    throw error;
  }
};