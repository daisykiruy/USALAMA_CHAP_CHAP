import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.2:5000';
const API_URL = 'http://192.168.1.2:5000/api/emergency-contacts';

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface IncomingAlert {
  alert: {
    id: string;
    location: string;
    timestamp: string;
  };
  contact: Contact;
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [editId, setEditId] = useState<string | null>(null);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [receivedAlerts, setReceivedAlerts] = useState<IncomingAlert[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      const id = await AsyncStorage.getItem('userId');
      if (!id) {
        Alert.alert('User not found', 'Please log in again.');
        return;
      }
      setUserId(id);
      fetchContacts(id);
    };

    initialize();
  }, []);

  const fetchContacts = async (uid: string) => {
    try {
      const res = await fetch(`${API_URL}/${uid}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to load contacts');
      setContacts(data);
    } catch (err: any) {
      Alert.alert('Error', err.message);
    }
  };

  useEffect(() => {
    const setupSocket = async () => {
      const storedPhone = await AsyncStorage.getItem('userPhone');
      if (!storedPhone) return;

      const socket = io(SOCKET_URL);

      socket.on('connect', () => {
        socket.emit('join-room', `contact-${storedPhone}`);
      });

      socket.on('contact-alert', (data: IncomingAlert) => {
        setReceivedAlerts((prev) => [data, ...prev]);
        Alert.alert(
          '🚨 Emergency Alert',
          `From: ${data.contact.name}\nAt: ${data.alert.location}`
        );
      });

      return () => socket.disconnect();
    };

    setupSocket();
  }, []);

  const handleAddOrEdit = async () => {
    if (!name || !phone) {
      Alert.alert('Missing Info', 'Please enter both name and phone.');
      return;
    }

    if (!userId) {
      Alert.alert('User not found', 'Please log in again.');
      return;
    }

    // Format phone to E.164 (for Twilio compatibility)
    const formattedPhone = phone.startsWith('+')
      ? phone
      : `+254${phone.replace(/^0/, '')}`;

    if (editId) {
      try {
        const res = await fetch(`${API_URL}/${editId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone: formattedPhone }),
        });

        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || 'Failed to update contact');
        }

        setContacts((prev) =>
          prev.map((c) =>
            c.id === editId ? { ...c, name, phone: formattedPhone } : c
          )
        );
        setEditId(null);
      } catch (err: any) {
        Alert.alert('Error', err.message);
        return;
      }
    } else {
      if (contacts.length >= 3) {
        Alert.alert('Limit Reached', 'You can only save up to 3 contacts.');
        return;
      }

      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, phone: formattedPhone, userId }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to save contact');

        setContacts((prev) => [...prev, data]);
        await AsyncStorage.setItem('userPhone', formattedPhone);
      } catch (err: any) {
        Alert.alert('Error', err.message);
        return;
      }
    }

    setName('');
    setPhone('');
    setShowOptions(null);
  };

  const handleEdit = (contact: Contact) => {
    setName(contact.name);
    setPhone(contact.phone);
    setEditId(contact.id);
    setShowOptions(null);
  };

  const handleDelete = async (id: string) => {
    Alert.alert('Confirm', 'Delete this contact?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Failed to delete');

            setContacts((prev) => prev.filter((c) => c.id !== id));
          } catch (err: any) {
            Alert.alert('Error', err.message);
          }
        },
      },
    ]);
    setShowOptions(null);
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
            {editId ? 'Update Contact' : 'Save Contact'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={contacts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No contacts added yet.</Text>
        }
        renderItem={({ item }) => {
          const isOptionsVisible = showOptions === item.id;
          return (
            <View style={styles.contactCard}>
              <View style={styles.cardHeader}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.contactName}>{item.name}</Text>
                  <Text style={styles.contactPhone}>{item.phone}</Text>
                </View>
                <TouchableOpacity
                  onPress={() =>
                    setShowOptions(isOptionsVisible ? null : item.id)
                  }
                >
                  <Ionicons
                    name="ellipsis-vertical"
                    size={20}
                    color="#6a1b9a"
                  />
                </TouchableOpacity>
              </View>
              {isOptionsVisible && (
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleEdit(item)}
                  >
                    <Ionicons name="create" size={18} color="#4caf50" />
                    <Text style={styles.actionText}>Edit</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Ionicons name="trash" size={18} color="#e53935" />
                    <Text style={styles.actionText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          );
        }}
      />

      {receivedAlerts.length > 0 && (
        <View style={{ marginTop: 30 }}>
          <Text style={styles.header}>🛎️ Received Alerts</Text>
          {receivedAlerts.map((item, index) => (
            <View key={index} style={styles.alertBox}>
              <Text>📍 {item.alert.location}</Text>
              <Text>
                🕒 {new Date(item.alert.timestamp).toLocaleString()}
              </Text>
              <Text>👤 From: {item.contact.name}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f3e5f5', padding: 20 },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6a1b9a',
    marginBottom: 10,
    textAlign: 'center',
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
  buttonText: { color: '#fff', fontWeight: 'bold' },
  contactCard: {
    backgroundColor: '#ede7f6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  contactName: { fontSize: 16, fontWeight: 'bold', color: '#4a148c' },
  contactPhone: { fontSize: 14, color: '#555' },
  actionButtons: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 15,
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 1,
  },
  actionText: { fontSize: 14, fontWeight: 'bold', color: '#333' },
  emptyText: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  alertBox: {
    backgroundColor: '#d1c4e9',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
});
