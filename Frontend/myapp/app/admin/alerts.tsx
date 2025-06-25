import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';

// Replace with your backend IP
const SOCKET_URL = 'http://10.110.41.12:5000';

interface Alert {
  id: string;
  userId?: number;
  title?: string;
  message?: string;
  location?: string;
  timestamp?: string;
  urgency?: string;
}

export default function ViewAlertsScreen() {
  const [alerts, setAlerts] = useState<Alert[]>([]);

  useEffect(() => {
    const fetchStoredAlerts = async () => {
      try {
        const storedAlerts = await AsyncStorage.getItem('alerts');
        if (storedAlerts) {
          setAlerts(JSON.parse(storedAlerts));
        }
      } catch (error) {
        console.error('Failed to load alerts:', error);
      }
    };

    const fetchInitialFromAPI = async () => {
      try {
        const response = await fetch(`${SOCKET_URL}/api/security-alerts/alerts`);
        const data = await response.json();
        setAlerts(data.reverse());
        await AsyncStorage.setItem('alerts', JSON.stringify(data));
      } catch (error) {
        console.error('Failed to fetch from API:', error);
      }
    };

    const socket = io(SOCKET_URL);

    socket.on('connect', () => {
      console.log('Connected to alert socket server.');
    });

    socket.on('new-alert', async (newAlert: Alert) => {
      console.log('Received new alert:', newAlert);
      setAlerts((prev) => [newAlert, ...prev]);

      try {
        const current = await AsyncStorage.getItem('alerts');
        const parsed = current ? JSON.parse(current) : [];
        const updated = [newAlert, ...parsed];
        await AsyncStorage.setItem('alerts', JSON.stringify(updated));
      } catch (e) {
        console.error('Failed to store new alert:', e);
      }
    });

    fetchStoredAlerts();
    fetchInitialFromAPI();

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>📣 Community Alerts</Text>
      {alerts.length === 0 ? (
        <Text style={styles.noAlerts}>No alerts have been sent yet.</Text>
      ) : (
        <FlatList
          data={alerts}
          keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Ionicons name="alert-circle" size={24} color="#d84315" />
              <View style={styles.content}>
                <Text style={styles.title}>
                  {item.title || 'New Alert'}
                </Text>
                <Text style={styles.message}>
                  {item.message || `Location: ${item.location || 'Unknown'}`}
                </Text>
                <Text style={styles.info}>
                  🕒 {item.timestamp ? new Date(item.timestamp).toLocaleString() : 'No time'}
                </Text>
                <Text style={styles.info}>
                  🚨 Urgency: {item.urgency || 'Unknown'}
                </Text>
              </View>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff8e1',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#e65100',
    marginBottom: 20,
  },
  noAlerts: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff3e0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  content: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#bf360c',
  },
  message: {
    fontSize: 14,
    marginVertical: 4,
    color: '#444',
  },
  info: {
    fontSize: 12,
    color: '#757575',
  },
});
