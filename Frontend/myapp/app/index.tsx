import React, { useEffect } from 'react';
import {Text, StyleSheet, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import LottieView from 'lottie-react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/landing');
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <LinearGradient colors={['#00bfa5', '#1de9b6', '#a7ffeb']} style={styles.container}>
      <Text style={styles.title}>USALAMA CHAP CHAP</Text>
      <Text style={styles.tagline}>Secure Our Lives</Text>

      <LottieView
        source={require('../assets/loading.json')}
        autoPlay
        loop
        style={styles.lottie}
      />

      <Text style={styles.loading}>Loading...</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    paddingRight: 0, // ✅ Add this
    textShadowColor: '#004d40',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#046307',
    marginBottom: 20,
  },
  lottie: {
    width: width * 0.6,
    height: width * 0.6,
  },
  loading: {
    fontWeight: 'bold',
    marginTop: 20,
    fontSize: 22,
    color: '#046307',
   
  },
});
