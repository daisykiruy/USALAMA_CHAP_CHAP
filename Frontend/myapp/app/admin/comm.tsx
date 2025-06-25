import React, { useState } from 'react';
import {
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateAlertPage() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');

  const handleSendAlert = async () => {
    if (!title || !message) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    const newAlert = {
      id: Date.now().toString(),
      title,
      message,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const storedAlerts = await AsyncStorage.getItem('community_alerts');
      const parsedAlerts = storedAlerts ? JSON.parse(storedAlerts) : [];

      const updatedAlerts = [newAlert, ...parsedAlerts];
      await AsyncStorage.setItem('community_alerts', JSON.stringify(updatedAlerts));

      Alert.alert('Success', 'Community alert sent!');
      setTitle('');
      setMessage('');
    } catch (error) {
      Alert.alert('Error', 'Failed to save alert.');
      console.error(error);
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

      <TouchableOpacity style={styles.button} onPress={handleSendAlert}>
        <Text style={styles.buttonText}>Send Alert</Text>
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
