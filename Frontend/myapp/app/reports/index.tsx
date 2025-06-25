import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Define the Report type
interface Report {
  id: string;
  title: string;
  description: string;
  type: string;
  date: string;
}

export default function ReportsPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [reports, setReports] = useState<Report[]>([
    {
      id: '1',
      title: 'Suspicious Vehicle',
      description: 'Unknown vehicle parked for hours near gate.',
      type: 'Suspicious Activity',
      date: '2025-06-10',
    },
  ]);

  const handleAddReport = () => {
    if (!title || !description || !type || !date) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    const newReport: Report = {
      id: Date.now().toString(),
      title,
      description,
      type,
      date,
    };

    setReports([newReport, ...reports]);
    setTitle('');
    setDescription('');
    setType('');
    setDate('');
    Alert.alert('Success', 'Report submitted!');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>📋 Report an Issue</Text>

      <TextInput
        style={styles.input}
        placeholder="Report Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Type (e.g., Missing Person, Suspicious Activity)"
        value={type}
        onChangeText={setType}
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g., 2025-06-11)"
        value={date}
        onChangeText={setDate}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddReport}>
        <Text style={styles.buttonText}>Submit Report</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>📝 Submitted Reports</Text>
      <FlatList
        data={reports}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reportCard}>
            <MaterialCommunityIcons name="alert-decagram" size={24} color="#f57f17" />
            <View style={styles.reportContent}>
              <Text style={styles.reportTitle}>{item.title}</Text>
              <Text style={styles.reportDesc}>{item.description}</Text>
              <Text style={styles.reportType}>📌 {item.type}</Text>
              <Text style={styles.reportDate}>📅 {item.date}</Text>
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
    backgroundColor: '#f1f8e9',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#33691e',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderColor: '#c5e1a5',
    borderWidth: 1,
  },
  button: {
    backgroundColor: '#558b2f',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 10,
    color: '#33691e',
  },
  reportCard: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    marginBottom: 12,
    alignItems: 'center',
    elevation: 2,
  },
  reportContent: {
    marginLeft: 10,
    flex: 1,
  },
  reportTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#827717',
  },
  reportDesc: {
    color: '#424242',
    marginVertical: 4,
  },
  reportType: {
    fontSize: 13,
    color: '#1b5e20',
  },
  reportDate: {
    fontSize: 12,
    color: '#757575',
  },
});
