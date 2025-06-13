import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editId, setEditId] = useState<string | null>(null);

  const handleAddOrEdit = () => {
    if (!name || !phone) {
      Alert.alert('Missing Info', 'Please enter both name and phone.');
      return;
    }

    if (editId) {
      setContacts(prev =>
        prev.map(contact =>
          contact.id === editId ? { ...contact, name, phone } : contact
        )
      );
      setEditId(null);
    } else {
      if (contacts.length >= 3) {
        Alert.alert('Limit Reached', 'You can only save up to 3 contacts.');
        return;
      }

      setContacts(prev => [
        ...prev,
        { id: Date.now().toString(), name, phone },
      ]);
    }

    setName('');
    setPhone('');
  };

  const handleEdit = (contact: Contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditId(contact.id);
  };

  const handleDelete = (id: string) => {
    Alert.alert('Confirm', 'Are you sure you want to delete this contact?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setContacts(prev => prev.filter(c => c.id !== id)),
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>📇 Emergency Contacts</Text>

      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
          style={styles.input}
        />
        <TouchableOpacity style={styles.button} onPress={handleAddOrEdit}>
          <Text style={styles.buttonText}>
            {editId ? 'Update Contact' : 'Add Contact'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts added yet.</Text>
        }
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(item)}>
              <Ionicons name="create" size={24} color="#4caf50" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Ionicons name="trash" size={24} color="#e53935" style={{ marginLeft: 10 }} />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3e5f5',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6a1b9a',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputGroup: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#9c27b0',
    marginBottom: 15,
    fontSize: 16,
    paddingVertical: 6,
  },
  button: {
    backgroundColor: '#8e24aa',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ede7f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4a148c',
  },
  contactPhone: {
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
});
