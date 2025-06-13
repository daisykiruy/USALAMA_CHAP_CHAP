import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function MapsPage() {
  const handleMockAction = () => {
    alert('This will show real-time map data when integrated with Google Maps.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📍 Community Alert Map</Text>

      <View style={styles.mapPlaceholder}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/684/684908.png' }}
          style={styles.mapIcon}
        />
        <Text style={styles.mapText}>Map will appear here</Text>
        <Text style={styles.mapSubText}>Google Maps integration coming soon...</Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={[styles.button, { backgroundColor: '#43a047' }]} onPress={handleMockAction}>
          <MaterialIcons name="location-searching" size={24} color="#fff" />
          <Text style={styles.buttonText}>Find Nearby Alerts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, { backgroundColor: '#f4511e' }]} onPress={handleMockAction}>
          <Ionicons name="alert-circle" size={24} color="#fff" />
          <Text style={styles.buttonText}>View Active Hotspots</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#e3f2fd',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0d47a1',
    textAlign: 'center',
    marginBottom: 20,
  },
  mapPlaceholder: {
    backgroundColor: '#fff8e1',
    borderRadius: 12,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#ffd54f',
  },
  mapIcon: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f57f17',
  },
  mapSubText: {
    fontSize: 14,
    color: '#616161',
    marginTop: 5,
  },
  actions: {
    marginTop: 10,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 10,
    marginBottom: 15,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 10,
    fontSize: 16,
  },
});
