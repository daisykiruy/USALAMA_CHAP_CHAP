import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function SettingsPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [locationAccess, setLocationAccess] = useState(true);

  const handleLogout = () => {
    Alert.alert('Logout', 'You have been logged out.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>⚙️ Settings</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>👤 Account</Text>
        <SettingItem icon={<Feather name="user" size={22} color="#2e7d32" />} label="Edit Profile" />
        <SettingItem icon={<MaterialCommunityIcons name="lock-reset" size={22} color="#2e7d32" />} label="Change Password" />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🎛️ Preferences</Text>
        <ToggleItem
          label="Dark Mode"
          icon={<Ionicons name="moon" size={22} color="#6a1b9a" />}
          value={isDarkMode}
          onValueChange={setIsDarkMode}
        />
        <ToggleItem
          label="Notifications"
          icon={<Ionicons name="notifications" size={22} color="#6a1b9a" />}
          value={notificationsEnabled}
          onValueChange={setNotificationsEnabled}
        />
        <ToggleItem
          label="Location Access"
          icon={<Ionicons name="location" size={22} color="#6a1b9a" />}
          value={locationAccess}
          onValueChange={setLocationAccess}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🛠️ Support</Text>
        <SettingItem icon={<Feather name="help-circle" size={22} color="#0277bd" />} label="Help Center" />
        <SettingItem icon={<Ionicons name="document-text" size={22} color="#0277bd" />} label="Terms & Conditions" />
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <FontAwesome5 name="sign-out-alt" size={20} color="#fff" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const SettingItem = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <TouchableOpacity style={styles.settingItem}>
    {icon}
    <Text style={styles.settingLabel}>{label}</Text>
  </TouchableOpacity>
);

const ToggleItem = ({
  icon,
  label,
  value,
  onValueChange,
}: {
  icon: React.ReactNode;
  label: string;
  value: boolean;
  onValueChange: (val: boolean) => void;
}) => (
  <View style={styles.toggleItem}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {icon}
      <Text style={styles.settingLabel}>{label}</Text>
    </View>
    <Switch value={value} onValueChange={onValueChange} thumbColor={value ? '#4caf50' : '#f44336'} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e8f5e9',
    padding: 20,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1b5e20',
    marginBottom: 20,
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#388e3c',
    marginBottom: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  settingLabel: {
    marginLeft: 12,
    fontSize: 16,
    color: '#424242',
  },
  toggleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#d32f2f',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
    fontWeight: '600',
  },
});
