import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Analytics() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.title}>📊 Analytics Dashboard</Text>

      <View style={styles.row}>
        <View style={[styles.statCard, { backgroundColor: '#f06292' }]}>
          <Ionicons name="alert" size={30} color="#fff" />
          <Text style={styles.statNumber}>124</Text>
          <Text style={styles.statLabel}>Total Alerts</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#64b5f6' }]}>
          <MaterialIcons name="local-hospital" size={30} color="#fff" />
          <Text style={styles.statNumber}>35</Text>
          <Text style={styles.statLabel}>Medical</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={[styles.statCard, { backgroundColor: '#81c784' }]}>
          <MaterialIcons name="security" size={30} color="#fff" />
          <Text style={styles.statNumber}>65</Text>
          <Text style={styles.statLabel}>Security</Text>
        </View>

        <View style={[styles.statCard, { backgroundColor: '#ffb74d' }]}>
          <FontAwesome5 name="fire" size={30} color="#fff" />
          <Text style={styles.statNumber}>24</Text>
          <Text style={styles.statLabel}>Fire</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>🕒 Alert Trends</Text>
      <View style={styles.trendBox}>
        <Text style={styles.trendText}>
          Most alerts are sent between <Text style={{ fontWeight: 'bold' }}>7 PM - 9 PM</Text>.
        </Text>
        <Text style={styles.trendText}>
          🔺 14% increase compared to last week.
        </Text>
      </View>

      <Text style={styles.sectionTitle}>📈 Weekly Summary</Text>
      <View style={styles.barChart}>
        <Text style={styles.barItem}>Mon - ▓▓▓▓▓▓</Text>
        <Text style={styles.barItem}>Tue - ▓▓▓▓▓▓▓▓</Text>
        <Text style={styles.barItem}>Wed - ▓▓▓▓▓</Text>
        <Text style={styles.barItem}>Thu - ▓▓▓▓▓▓▓</Text>
        <Text style={styles.barItem}>Fri - ▓▓▓▓▓▓▓▓▓</Text>
        <Text style={styles.barItem}>Sat - ▓▓▓</Text>
        <Text style={styles.barItem}>Sun - ▓▓▓▓▓▓▓</Text>
      </View>

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#673ab7',
    textAlign: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    width: '48%',
    borderRadius: 12,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 5,
  },
  statLabel: {
    color: '#fff',
    fontSize: 14,
    marginTop: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginTop: 25,
    marginBottom: 10,
  },
  trendBox: {
    backgroundColor: '#e1bee7',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  trendText: {
    fontSize: 14,
    color: '#4a148c',
    marginBottom: 5,
  },
  barChart: {
    backgroundColor: '#fff8e1',
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },
  barItem: {
    fontSize: 14,
    fontFamily: 'monospace',
    marginBottom: 5,
    color: '#333',
  },
  backButton: {
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
