import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome5, MaterialIcons, Ionicons } from '@expo/vector-icons';
import CreateCommunityAlert from './comalert'; // ✅ Import the component

export default function AdminPage() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>👮 Admin Dashboard</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>🔧 Manage Users</Text>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="users-cog" size={20} color="#fff" />
          <Text style={styles.buttonText}>User Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📊 View Reports</Text>
        <TouchableOpacity style={styles.button}>
          <MaterialIcons name="assessment" size={20} color="#fff" />
          <Text style={styles.buttonText}>Security Reports</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📢 Send Alerts</Text>
        <TouchableOpacity style={styles.button}>
          <Ionicons name="alert-circle" size={20} color="#fff" />
          <Text style={styles.buttonText}>Send Emergency Alert</Text>
        </TouchableOpacity>
      </View>

      {/* ✅ Add CreateCommunityAlert form below */}
      <CreateCommunityAlert />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3f2fd',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1565c0',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 18,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#0288d1',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
});
