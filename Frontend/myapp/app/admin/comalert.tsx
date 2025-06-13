import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CreateCommunityAlert() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');

  const handleAddAlert = () => {
    if (!title || !description || !date) {
      Alert.alert('Missing Fields', 'Please fill in all fields.');
      return;
    }

    // Later, you'll handle backend or state updates here
    Alert.alert('Success', 'Community alert added!');
    setTitle('');
    setDescription('');
    setDate('');
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>📢 Create Community Alert</Text>

      <TextInput
        style={styles.input}
        placeholder="Alert Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Alert Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Date (e.g., 2025-06-12)"
        value={date}
        onChangeText={setDate}
      />

      <TouchableOpacity style={styles.button} onPress={handleAddAlert}>
        <Ionicons name="add-circle" size={22} color="#fff" />
        <Text style={styles.buttonText}>Add Alert</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff3e0',
    padding: 20,
    borderRadius: 12,
    elevation: 3,
    marginTop: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#d84315',
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#ef6c00',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
