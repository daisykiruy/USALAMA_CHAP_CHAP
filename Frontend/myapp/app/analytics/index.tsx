import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

type TownStat = {
  town: string;
  count: number;
};

export default function Analytics() {
  const router = useRouter();
  const [counts, setCounts] = useState({ today: 0, week: 0, year: 0 });
  const [topTowns, setTopTowns] = useState<TownStat[]>([]);
  const [loading, setLoading] = useState(true);

  const [showTodayDetails, setShowTodayDetails] = useState(false);
  const [showWeekDetails, setShowWeekDetails] = useState(false);
  const [showYearDetails, setShowYearDetails] = useState(false);

  useFocusEffect(
    useCallback(() => {
      const fetchStats = async () => {
        try {
          const res = await fetch('http://192.168.140.71:5000/api/security-alerts/stats');
          const data = await res.json();
          setCounts({
            today: data.today,
            week: data.week,
            year: data.year,
          });
          setTopTowns(data.topTowns as TownStat[]);
        } catch (error) {
          console.error('❌ Failed to fetch stats:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchStats();
    }, [])
  );

  const chartConfig = {
    backgroundGradientFrom: '#fff',
    backgroundGradientTo: '#fff',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(55, 71, 79, ${opacity})`,
    labelColor: () => '#37474f',
    style: { borderRadius: 16 },
    propsForDots: { r: '6', strokeWidth: '2', stroke: '#ffa726' },
  };

  if (loading) {
    return <ActivityIndicator style={{ marginTop: 50 }} size="large" color="#673ab7" />;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 60 }}>
      <Text style={styles.title}>📊 Analytics Dashboard</Text>
      <Text style={styles.introText}>View the trend of alerts below:</Text>

      {/* Stat Cards */}
      <TouchableOpacity
        style={[styles.statCard, { backgroundColor: '#f06292' }]}
        onPress={() => setShowTodayDetails(!showTodayDetails)}
      >
        <View style={styles.cardContent}>
          <Ionicons name="sunny" size={30} color="#fff" />
          <View style={styles.cardText}>
            <Text style={styles.statNumber}>{counts.today}</Text>
            <Text style={styles.statLabel}>Alerts Today</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.statCard, { backgroundColor: '#64b5f6' }]}
        onPress={() => setShowWeekDetails(!showWeekDetails)}
      >
        <View style={styles.cardContent}>
          <MaterialIcons name="calendar-today" size={30} color="#fff" />
          <View style={styles.cardText}>
            <Text style={styles.statNumber}>{counts.week}</Text>
            <Text style={styles.statLabel}>Alerts This Week</Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.statCard, { backgroundColor: '#81c784' }]}
        onPress={() => setShowYearDetails(!showYearDetails)}
      >
        <View style={styles.cardContent}>
          <FontAwesome5 name="calendar" size={30} color="#fff" />
          <View style={styles.cardText}>
            <Text style={styles.statNumber}>{counts.year}</Text>
            <Text style={styles.statLabel}>Alerts This Year</Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Expandable Sections */}
      {showTodayDetails && (
        <View style={styles.detailBox}>
          <Text style={styles.detailHeader}>📍 Todays Breakdown:</Text>
          <Text style={styles.detailItem}>Detailed breakdown coming soon...</Text>
        </View>
      )}

      {showWeekDetails && (
        <View style={styles.detailBox}>
          <Text style={styles.detailHeader}>🗓 Weekly Breakdown:</Text>
          <Text style={styles.detailItem}>Top towns and trends below.</Text>
        </View>
      )}

      {showYearDetails && (
        <View style={styles.detailBox}>
          <Text style={styles.detailHeader}>📆 Yearly Summary:</Text>
          <Text style={styles.detailItem}>Analytics for the year coming soon...</Text>
        </View>
      )}

      {/* Top Towns Graph */}
      {topTowns.length > 0 && (
        <View style={{ marginTop: 20 }}>
          <Text style={styles.chartTitle}>🏙️ Top Towns by Alert Frequency</Text>
          <BarChart
            data={{
              labels: topTowns.map(t => t.town),
              datasets: [{ data: topTowns.map(t => t.count) }],
            }}
            width={screenWidth - 40}
            height={240}
            fromZero
            showValuesOnTopOfBars
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            style={{ borderRadius: 16, marginBottom: 30 }}
          />
        </View>
      )}

      <TouchableOpacity style={styles.backButton} onPress={() => router.push('/home')}>
        <Text style={styles.backButtonText}>← Back to Home</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#673ab7',
    textAlign: 'center',
    marginBottom: 10,
  },
  introText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '500',
  },
  statCard: {
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 15,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  statLabel: {
    color: '#fff',
    fontSize: 16,
  },
  detailBox: {
    backgroundColor: '#e0f7fa',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
  },
  detailHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#006064',
    marginBottom: 8,
  },
  detailItem: {
    fontSize: 14,
    color: '#004d40',
    marginLeft: 10,
    marginBottom: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 10,
    color: '#37474f',
  },
  backButton: {
    backgroundColor: '#ccc',
    padding: 12,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 50,
  },
  backButtonText: {
    fontSize: 16,
    color: '#333',
  },
});
