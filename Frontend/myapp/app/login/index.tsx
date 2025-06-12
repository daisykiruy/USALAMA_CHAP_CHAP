import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';

export default function Login() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Load stored credentials to display in placeholders
  useEffect(() => {
    const loadStoredCredentials = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('user');
        if (savedUser) {
          const parsed = JSON.parse(savedUser);
          setUsername(parsed.username || '');
          setPassword(parsed.password || '');
        }
      } catch (error) {
        console.error('Error loading saved user:', error);
      }
    };

    loadStoredCredentials();
  }, []);

  const handleSubmit = async () => {
    if (!username || !password) {
      Alert.alert('Error', 'Please enter both fields');
      return;
    }

    if (isLogin) {
      const savedUser = await AsyncStorage.getItem('user');
      if (savedUser) {
        const { username: savedUsername, password: savedPassword } = JSON.parse(savedUser);
        if (username === savedUsername && password === savedPassword) {
          router.replace('/home');
        } else {
          Alert.alert('Invalid Credentials');
        }
      } else {
        Alert.alert('No user found. Please sign up.');
      }
    } else {
      await AsyncStorage.setItem('user', JSON.stringify({ username, password }));
      Alert.alert('Success', 'Account created! You can now log in.');
      setIsLogin(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{isLogin ? 'Login' : 'Sign Up'}</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          secureTextEntry={!showPassword}
          style={[styles.input, { flex: 1 }]}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
          <Text style={styles.togglePassword}>
            {showPassword ? 'Hide' : 'Show'}
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>{isLogin ? 'Login' : 'Sign Up'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.toggleText}>
          {isLogin
            ? "Don't have an account? Sign up"
            : 'Already have an account? Log in'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  header: {
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 30,
    color: '#00796b',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 6,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 6,
    marginBottom: 15,
    paddingRight: 10,
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
