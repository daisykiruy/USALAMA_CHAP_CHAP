import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AdminDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>👮 Admin Dashboard</Text>
      <Text style={styles.subheading}>Select an action below</Text>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#64b5f6' }]}
        onPress={() => router.push('/admin/reports')}
      >
        <Ionicons name="document-text-outline" size={32} color="#fff" />
        <Text style={styles.cardText}>View Reports</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#f06292' }]}
        onPress={() => router.push('/admin/comm')}
      >
        <Ionicons name="megaphone-outline" size={32} color="#fff" />
        <Text style={styles.cardText}>Create Community Alert</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.card, { backgroundColor: '#81c784' }]}
        onPress={() => router.push('/admin/alerts')}
      >
        <Ionicons name="notifications-outline" size={32} color="#fff" />
        <Text style={styles.cardText}>View Sent Alerts</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5f5',
    padding: 20,
    justifyContent: 'center',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4a148c',
    textAlign: 'center',
    marginBottom: 10,
  },
  subheading: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginBottom: 30,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    color: '#fff',
    marginLeft: 15,
    fontWeight: 'bold',
  },
});
