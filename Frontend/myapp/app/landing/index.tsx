import React from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function LandingPage() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#00bfa5', '#1de9b6', '#a7ffeb']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* 🔙 Back Arrow */}
        <TouchableOpacity onPress={() => router.push('/')} style={styles.backArrow}>
          <Ionicons name="arrow-back" size={28} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Welcome to Usalama Chap Chap 👮‍♂️</Text>
        <Text style={styles.subtitle}>Your Personal Community Safety Companion</Text>

        <Text style={styles.instructions}>
          With Usalama Chap Chap, you can:
          {'\n\n'}✔️ Instantly send discreet alerts to emergency contacts & authorities
          {'\n'}✔️ Share your location for faster response
          {'\n'}✔️ Get real-time updates and safety tips
          {'\n'}✔️ Keep your community secure together!
        </Text>

        <Text style={styles.callToAction}>Who are you logging in as?</Text>

        <TouchableOpacity
          onPress={() => router.push('/login')}
          style={styles.userButton}
        >
          <Text style={styles.buttonText}>🚶‍♀️ I am a User</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push('/admin')}
          style={styles.adminButton}
        >
          <Text style={styles.buttonText}>🛡️ I am an Admin</Text>
        </TouchableOpacity>

        <Text style={styles.footerNote}>
          Together, we can make our neighborhoods safer. Let us protect each other.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 50,
    paddingHorizontal: 25,
    alignItems: 'center',
  },
  backArrow: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#e0f2f1',
    marginBottom: 20,
    textAlign: 'center',
  },
  instructions: {
    fontSize: 16,
    color: '#004d40',
    marginBottom: 30,
    backgroundColor: '#ffffffcc',
    padding: 20,
    borderRadius: 12,
    textAlign: 'left',
    width: '100%',
  },
  callToAction: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#004d40',
    marginBottom: 20,
  },
  userButton: {
    backgroundColor: '#00695c',
    padding: 15,
    width: width * 0.7,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  adminButton: {
    backgroundColor: '#1b5e20',
    padding: 15,
    width: width * 0.7,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footerNote: {
    fontSize: 14,
    color: '#004d40',
    marginTop: 40,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});
