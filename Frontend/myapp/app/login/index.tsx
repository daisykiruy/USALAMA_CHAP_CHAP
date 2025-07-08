import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('Member');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const API_URL = 'http://192.168.140.71:5000/api/auth';

  const handleAuth = async () => {
    if (!email || !password || (!isLogin && (!name || !phone))) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      const endpoint = isLogin ? `${API_URL}/login` : `${API_URL}/register`;
      const payload = isLogin
        ? { email, password }
        : { name, email, phone, password, role };

      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      if (isLogin) {
        await AsyncStorage.setItem('token', data.token);
        await AsyncStorage.setItem('user', JSON.stringify(data.user));
        await AsyncStorage.setItem('userId', String(data.user.id)); // ✅ store userId for use elsewhere
        Alert.alert('Success', 'Logged in!');
        router.replace('/home');
      } else {
        Alert.alert('Success', 'Registered! You can now log in.');
        setIsLogin(true);
        setName('');
        setEmail('');
        setPhone('');
        setPassword('');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Login' : 'Sign Up'}</Text>

      {!isLogin && (
        <>
          <TextInput
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
            keyboardType="phone-pad"
          />
        </>
      )}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={[styles.input, { flex: 1 }]}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.togglePassword}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Register'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin
            ? "Don't have an account? Register"
            : 'Already have an account? Login'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0f2f1',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    fontSize: 28,
    textAlign: 'center',
    marginBottom: 30,
    color: '#004d40',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#b2dfdb',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#b2dfdb',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    paddingRight: 10,
    backgroundColor: '#ffffff',
  },
  togglePassword: {
    color: '#00796b',
    paddingHorizontal: 8,
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#00796b',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  toggleText: {
    color: '#00796b',
    textAlign: 'center',
    marginTop: 20,
  },
});
