import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';

const CocktailDetails = ({ cocktail }) => {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.title}>{cocktail.strDrink}</Text>
      <Image source={{ uri: cocktail.strDrinkThumb }} style={styles.image} />
      <Text style={styles.ingredientsTitle}>Ingredients:</Text>
      {Object.keys(cocktail)
        .filter(key => key.startsWith('strIngredient') && cocktail[key])
        .map(key => (
          <Text key={key} style={styles.ingredient}>
            {cocktail[`strMeasure${key.match(/\d+/)[0]}`]} {cocktail[key]}
          </Text>
        ))}
      <Text style={styles.instructionsTitle}>Instructions:</Text>
      <Text style={styles.instructions}>{cocktail.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
    borderRadius: 100,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 16,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  instructions: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default CocktailDetails;