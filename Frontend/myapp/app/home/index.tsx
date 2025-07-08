import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const sendAlert = async () => {
    setLoading(true);
    try {
      const userData = await AsyncStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      if (!user) {
        Alert.alert('Error', 'User not found');
        setLoading(false);
        return;
      }

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location access is required.');
        setLoading(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const payload = {
        userId: user.id,
        type: 'Emergency',
        location: `${location.coords.latitude},${location.coords.longitude}`,
        timestamp: new Date().toISOString(),
      };

      const token = await AsyncStorage.getItem('token');
      console.log("📦 Payload being sent:", payload);
      const response = await fetch('http://192.168.140.71:5000/api/security-alerts/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
      console.log('❌ Backend error response:', data);
      throw new Error(data?.error || 'Failed to send alert');

      }

      Alert.alert('✅ Alert sent successfully!');
    } catch (error: any) {
      console.error(error);
      Alert.alert('Error', error.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.title}>Welcome to Usalama Chap Chap</Text>
      <Text style={styles.subtitle}>Your discreet personal and community safety app</Text>

      <Text style={styles.sectionHeader}>How it Works:</Text>
      <View style={styles.instructions}>
        <Text style={styles.instruction}>
          📍 Long press the Alert button for 10 seconds to trigger an emergency alert.
        </Text>
        <Text style={styles.instruction}>
          👮 Your emergency contacts and local authorities are notified instantly.
        </Text>
        <Text style={styles.instruction}>
          📊 Authorities can analyze alert patterns from the dashboard.
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Explore Features</Text>
      <View style={styles.grid}>
        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#EF6C00' }]}
          onPress={() => router.push('/alert')}
        >
          <Ionicons name="alert-circle" size={30} color="#fff" />
          <Text style={styles.cardText}>Community alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#3949ab' }]}
          onPress={() => router.push('/analytics')}
        >
          <MaterialCommunityIcons name="chart-line" size={30} color="#fff" />
          <Text style={styles.cardText}>Analytics</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#f9a825' }]}
          onPress={() => router.push('/map')}
        >
          <Ionicons name="map" size={30} color="#fff" />
          <Text style={styles.cardText}>Map</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.card, { backgroundColor: '#4db6ac' }]}
          onPress={() => router.push('/reports')}
        >
          <Ionicons name="document-text-outline" size={30} color="#fff" />
          <Text style={styles.cardText}>Reports</Text>
        </TouchableOpacity>
      </View>

      {/* ALERT BUTTON */}
      <TouchableOpacity
        style={styles.alertButton}
        onLongPress={sendAlert}
        delayLongPress={3000}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.alertText}>🚨 Hold for 10s to Send Alert</Text>
        )}
      </TouchableOpacity>

      {/* Back to Splash Screen */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.push('/')}
      >
        <Text style={styles.backButtonText}>← Back to Splash Screen</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f8f6',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#00796b',
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 18,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 20,
    color: '#00796b',
  },
  instructions: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 25,
    elevation: 10,
  },
  instruction: {
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 20,
    color: '#444',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '47%',
    height: 100,
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    marginTop: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  alertButton: {
    backgroundColor: '#d32f2f',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
  },
  alertText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    marginTop: 20,
    marginBottom: 40,
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
