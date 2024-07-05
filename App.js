import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Vibration } from 'react-native';
import axios from 'axios';
import { Accelerometer } from 'expo-sensors';
import CocktailDetails from './components/CocktailDetails';
import Loading from './components/Loading';

export default function App() {
  const [cocktail, setCocktail] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCocktail = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php');
      setCocktail(response.data.drinks[0]);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCocktail();

    let lastShake = 0;
    const subscription = Accelerometer.addListener(accelerometerData => {
      const { x, y, z } = accelerometerData;
      const magnitude = Math.sqrt(x * x + y * y + z * z);

      if (magnitude > 1.5) {
        const now = Date.now();
        if (now - lastShake > 1000) {
          lastShake = now;
          Vibration.vibrate();
          fetchCocktail();
        }
      }
    });

    return () => {
      subscription && subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <Loading />
      ) : (
        cocktail && <CocktailDetails cocktail={cocktail} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },
});