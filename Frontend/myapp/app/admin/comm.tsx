import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';

export default function CreateAlertPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSendAlert = async () => {
    if (!title || !message) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://192.168.1.2:5000/api/comalerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, message }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Community alert sent!');
        setTitle('');
        setMessage('');
      } else {
        Alert.alert('Error', data.error || 'Failed to send alert.');
      }
    } catch (error) {
      console.error('Send Alert Error:', error);
      Alert.alert('Network Error', 'Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>📢 Create Community Alert</Text>

      <TextInput
        style={styles.input}
        placeholder="Alert Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={[styles.input, { height: 120 }]}
        placeholder="Alert Message"
        value={message}
        onChangeText={setMessage}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSendAlert} disabled={loading}>
        <Text style={styles.buttonText}>
          {loading ? 'Sending...' : 'Send Alert'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff3e0',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e65100',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    borderColor: '#ffcc80',
    borderWidth: 1,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#ef6c00',
    padding: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
