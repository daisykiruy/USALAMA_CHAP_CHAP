import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from 'react-native';

interface Report {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
}

export default function AdminReports() {
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('http://192.168.1.2:5000/api/reports');
        const data = await response.json();

        if (response.ok) {
          // Updated line: use data directly because backend returns an array, not an object
          setReports(data);
        } else {
          console.error('Error fetching reports:', data.error || 'Unknown error');
        }
      } catch (error) {
        console.error('Failed to fetch reports:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#33691e" />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>📁 Admin - User Reports</Text>

      {reports.length === 0 ? (
        <Text style={styles.noReports}>No reports submitted yet.</Text>
      ) : (
        <FlatList
          data={reports}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.reportCard}>
              <Text style={styles.reportText}>🆔 Report ID: {item.id}</Text>
              <Text style={styles.reportText}>👤 User ID: {item.userId}</Text>
              <Text style={styles.reportContent}>📝 {item.content}</Text>
              <Text style={styles.reportDate}>📅 {new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          )}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fffde7',
    flex: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#827717',
    textAlign: 'center',
    marginBottom: 20,
  },
  reportCard: {
    backgroundColor: '#f1f8e9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderColor: '#cddc39',
    borderWidth: 1,
  },
  reportText: {
    fontSize: 14,
    color: '#33691e',
    marginBottom: 4,
  },
  reportContent: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#37474f',
    marginBottom: 6,
  },
  reportDate: {
    fontSize: 12,
    color: '#757575',
  },
  noReports: {
    textAlign: 'center',
    fontSize: 16,
    color: '#9e9e9e',
    marginTop: 50,
  },
});
