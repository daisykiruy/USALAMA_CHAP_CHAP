import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';

interface ComAlert {
  id: number;
  title: string;
  message: string;
  createdAt: string;
}

export default function AlertPage() {
  const [communityAlerts, setCommunityAlerts] = useState<ComAlert[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('http://192.168.140.71:5000/api/comalerts');
        const data = await response.json();

        if (response.ok) {
          setCommunityAlerts(data || []);
        } else {
          console.error('Error fetching alerts:', data.error);
        }
      } catch (error) {
        console.error('Failed to load alerts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>📢 Community Alerts</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#d32f2f" style={{ marginTop: 30 }} />
      ) : communityAlerts.length === 0 ? (
        <Text style={styles.noAlerts}>No community alerts available.</Text>
      ) : (
        <FlatList
          data={communityAlerts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.alertCard}>
              <Text style={styles.alertTitle}>{item.title}</Text>
              <Text style={styles.alertMessage}>{item.message}</Text>
              <Text style={styles.alertDate}>
                📅 {new Date(item.createdAt).toLocaleString()}
              </Text>
            </View>
          )}
        />
      )}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#d32f2f',
    marginBottom: 20,
    textAlign: 'center',
  },
  alertCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#bf360c',
    marginBottom: 4,
  },
  alertMessage: {
    fontSize: 14,
    color: '#424242',
    marginBottom: 6,
  },
  alertDate: {
    fontSize: 12,
    color: '#757575',
  },
  noAlerts: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 40,
  },
});
