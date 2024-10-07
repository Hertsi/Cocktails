import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { fetchRandomCocktail } from './cocktailService';

export default function App() {
  const [cocktail, setCocktail] = useState(null);

  useEffect(() => {
    // Fetch random cocktail when the app loads
    async function getRandomCocktail() {
      const result = await fetchRandomCocktail();
      setCocktail(result);
    }
    getRandomCocktail();
  }, []);

  if (!cocktail) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cocktail.strDrink}</Text>
      <Image
        source={{ uri: `${cocktail.strDrinkThumb}/preview` }}
        style={styles.image}
      />
      <Text style={styles.subTitle}>Ingredients:</Text>
      <FlatList
        data={Object.keys(cocktail)
          .filter((key) => key.includes('strIngredient') && cocktail[key])
          .map((key) => cocktail[key])}
        renderItem={({ item }) => <Text style={styles.text}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});