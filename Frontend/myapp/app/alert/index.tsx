import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

export default function AlertPage() {
  const [communityAlerts, setCommunityAlerts] = useState([
    { id: '1', title: 'Power Outage', description: 'Scheduled outage at 10PM', date: '2025-06-10' },
  ]);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>🚨 Alerts Dashboard</Text>

      <View style={styles.summaryContainer}>
        <View style={[styles.summaryBox, { backgroundColor: '#ff7043' }]}>
          <Ionicons name="time" size={24} color="#fff" />
          <Text style={styles.summaryText}>5 Alerts Today</Text>
        </View>
        <View style={[styles.summaryBox, { backgroundColor: '#5c6bc0' }]}>
          <Ionicons name="calendar" size={24} color="#fff" />
          <Text style={styles.summaryText}>22 This Week</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>📝 Community Alerts</Text>
      <FlatList
        data={communityAlerts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.alertCard}>
            <MaterialIcons name="campaign" size={24} color="#ff7043" />
            <View style={styles.alertContent}>
              <Text style={styles.alertTitle}>{item.title}</Text>
              <Text style={styles.alertDesc}>{item.description}</Text>
              <Text style={styles.alertDate}>📅 {item.date}</Text>
            </View>
          </View>
        )}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f5fc',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 20,
    textAlign: 'center',
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  summaryBox: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  summaryText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#333',
  },
  alertCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    elevation: 2,
  },
  alertContent: {
    marginLeft: 10,
    flex: 1,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d84315',
  },
  alertDesc: {
    color: '#555',
    marginVertical: 4,
  },
  alertDate: {
    fontSize: 12,
    color: '#888',
  },
});
