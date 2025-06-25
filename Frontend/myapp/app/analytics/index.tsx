import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function Analytics() {
  const router = useRouter();

  const [showTodayDetails, setShowTodayDetails] = useState(false);
  const [showWeekDetails, setShowWeekDetails] = useState(false);
  const [showYearDetails, setShowYearDetails] = useState(false);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>
      <Text style={styles.title}>📊 Analytics Dashboard</Text>

      <Text style={styles.introText}>
        View the trend of alerts. Tap a card for more detailed insights.
      </Text>
      <Text style={styles.arrow}>👇</Text>

      {/* Alert Summary Cards */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.statCard, { backgroundColor: '#f06292' }]}
          onPress={() => setShowTodayDetails(!showTodayDetails)}
        >
          <Ionicons name="sunny" size={30} color="#fff" />
          <Text style={styles.statNumber}>17</Text>
          <Text style={styles.statLabel}>Alerts today</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.statCard, { backgroundColor: '#64b5f6' }]}
          onPress={() => setShowWeekDetails(!showWeekDetails)}
        >
          <MaterialIcons name="calendar-today" size={30} color="#fff" />
          <Text style={styles.statNumber}>89</Text>
          <Text style={styles.statLabel}>This Week</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.statCard, { backgroundColor: '#81c784', marginBottom: 15 }]}
        onPress={() => setShowYearDetails(!showYearDetails)}
      >
        <FontAwesome5 name="calendar" size={30} color="#fff" />
        <Text style={styles.statNumber}>312</Text>
        <Text style={styles.statLabel}>This Year</Text>
      </TouchableOpacity>

      {/* Today Details */}
      {showTodayDetails && (
        <View style={styles.detailBox}>
          <Text style={styles.detailHeader}>📍 Places With Most Alerts Today:</Text>
          <Text style={styles.detailItem}>• Umoja Estate - 6 alerts</Text>
          <Text style={styles.detailItem}>• CBD - 4 alerts</Text>

          <Text style={styles.detailHeader}>📍 Least Alerts Today:</Text>
          <Text style={styles.detailItem}>• Eldoville - 1 alert</Text>
        </View>
      )}

      {/* Week Details */}
      {showWeekDetails && (
        <View style={styles.detailBox}>
          <Text style={styles.detailHeader}>🗓 Weekly Breakdown:</Text>
          <Text style={styles.detailItem}>• Monday - 10</Text>
          <Text style={styles.detailItem}>• Tuesday - 15</Text>
          <Text style={styles.detailItem}>• Wednesday - 12</Text>
          <Text style={styles.detailItem}>• Thursday - 8</Text>
          <Text style={styles.detailItem}>• Friday - 18</Text>
          <Text style={styles.detailItem}>• Saturday - 6</Text>
          <Text style={styles.detailItem}>• Sunday - 20 (🔺 Most)</Text>

          <Text style={styles.detailHeader}>📍 Top Alert Area This Week:</Text>
          <Text style={styles.detailItem}>• Kibera</Text>

          <Text style={styles.detailHeader}>📍 Least Alert Area:</Text>
          <Text style={styles.detailItem}>• Karen</Text>
        </View>
      )}

      {/* Year Details */}
      {showYearDetails && (
        <View style={styles.detailBox}>
          <Text style={styles.detailHeader}>📆 Yearly Summary:</Text>
          <Text style={styles.detailItem}>• January - 22</Text>
          <Text style={styles.detailItem}>• February - 18</Text>
          <Text style={styles.detailItem}>• March - 35</Text>
          <Text style={styles.detailItem}>• April - 41 (🔺 Most)</Text>
          <Text style={styles.detailItem}>• May - 9 (🔻 Least)</Text>

          <Text style={styles.detailHeader}>📍 Top Alert Area This Year:</Text>
          <Text style={styles.detailItem}>• Mathare</Text>

          <Text style={styles.detailHeader}>📍 Least Alert Area:</Text>
          <Text style={styles.detailItem}>• Runda</Text>
        </View>
      )}

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
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 5,
    fontWeight: '500',
    paddingHorizontal: 10,
  },
  arrow: {
    fontSize: 24,
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
    elevation: 3,
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
    textAlign: 'center',
  },
  detailBox: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006064',
    marginTop: 10,
    marginBottom: 5,
  },
  detailItem: {
    fontSize: 14,
    color: '#004d40',
    marginLeft: 10,
    marginBottom: 3,
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
