import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function ReportsPage() {
  const router = useRouter();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmitReport = async () => {
    if (!content) {
      Alert.alert('Missing Fields', 'Please enter your report details.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://192.168.140.71:5000/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: 1, // TODO: Replace with dynamic user ID if logged in
          content: content,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Report submitted!');
        setContent('');
      } else {
        Alert.alert('Error', data.error || 'Failed to submit report.');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
      Alert.alert('Network Error', 'Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.header}>📋 Report an Issue</Text>

      <Text style={styles.instructionsHeading}>
        <Text style={{ fontWeight: 'bold' }}>
          Please include the following details in your report to help authorities respond effectively:
        </Text>
      </Text>

      <Text style={styles.instructions}>
        • Location of the incident{'\n'}
        • Your phone number (for follow-up){'\n'}
        • Clear description of what happened{'\n'}
        • Approximate time and date of the incident{'\n'}
        • Any other relevant observations or information
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your report details here..."
        value={content}
        onChangeText={setContent}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmitReport} disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Submit Report</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/home')}>
        <Text style={styles.backText}>← Back to Home</Text>
      </TouchableOpacity>
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
    marginBottom: 16,
    textAlign: 'center',
  },
  instructionsHeading: {
    fontSize: 18,
    color: '#33691e',
    marginBottom: 6,
  },
  instructions: {
    fontSize: 18,
    color: '#455a64',
    backgroundColor: '#e6ee9c',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    lineHeight: 22,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    height: 140,
    textAlignVertical: 'top',
    borderColor: '#c5e1a5',
    borderWidth: 1,
    marginBottom: 20,
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
  backText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#33691e',
    textDecorationLine: 'underline',
  },
});
