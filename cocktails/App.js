import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Button, Switch, useColorScheme } from 'react-native';
import { fetchRandomCocktail } from './cocktailService';

export default function App() {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const systemTheme = useColorScheme();

  const getRandomCocktail = async () => {
    setLoading(true);
    const result = await fetchRandomCocktail();
    setCocktail(result);
    setLoading(false);
  };

  useEffect(() => {
    getRandomCocktail();
  }, []);

  const toggleDarkMode = () => setDarkMode((prevMode) => !prevMode);

  const isDarkMode = darkMode || systemTheme === 'dark'; 
  if (loading || !cocktail) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Switch
        value={darkMode}
        onValueChange={toggleDarkMode}
        thumbColor={isDarkMode ? '#fff' : '#000'}
      />
      <Text style={[styles.title, isDarkMode && styles.darkText]}>{cocktail.strDrink}</Text>
      <Image
        source={{ uri: `${cocktail.strDrinkThumb}/preview` }}
        style={styles.image}
      />
      <Text style={[styles.subTitle, isDarkMode && styles.darkText]}>Ingredients:</Text>
      <FlatList
        data={Object.keys(cocktail)
          .filter((key) => key.includes('strIngredient') && cocktail[key])
          .map((key) => cocktail[key])}
        renderItem={({ item }) => <Text style={[styles.text, isDarkMode && styles.darkText]}>{item}</Text>}
        keyExtractor={(item, index) => index.toString()}
      />

      {}
      <Button
        title="Refresh"
        onPress={getRandomCocktail}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  darkText: {
    color: '#fff',
  },
  subTitle: {
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
    color: '#000',
  },
  text: {
    fontSize: 16,
    color: '#000',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 20,
  },
});