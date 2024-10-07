import axios from 'axios';

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';
//laitoin tarjolle useemman, mutta ajattelin käyttää randomia :)
export const fetchCocktailByName = async (name) => {
  try {
    const response = await axios.get(`${BASE_URL}/search.php?s=${name}`);
    return response.data.drinks;
  } catch (error) {
    console.error("Error fetching cocktail by name:", error);
    return [];
  }
};

export const fetchRandomCocktail = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/random.php`);
    return response.data.drinks[0];
  } catch (error) {
    console.error("Error fetching random cocktail:", error);
    return null;
  }
};

export const fetchCocktailsByIngredient = async (ingredient) => {
  try {
    const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
    return response.data.drinks;
  } catch (error) {
    console.error("Error fetching cocktails by ingredient:", error);
    return [];
  }
};