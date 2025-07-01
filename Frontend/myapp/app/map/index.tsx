import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Dimensions, ActivityIndicator, Alert as RNAlert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type AlertType = {
  id: number;
  location: string;
  timestamp: string;
  userId: number;
  type: string;
};

export default function MapsPage() {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(true);

  // 👇 Use your backend's local IP address directly
  const API_URL = 'http://192.168.1.2:5000/api/security-alerts';

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(`${API_URL}/recent`);
        const text = await response.text();

        let data: any;
        try {
          data = JSON.parse(text);
        } catch (err) {
          console.error("❌ JSON parse error:", err);
          throw new Error("Invalid JSON response from server.");
        }

        if (!Array.isArray(data)) {
          console.error('❌ Expected array, got:', data);
          throw new Error('Expected a list of alerts, but got something else.');
        }

        const validAlerts = data.filter(
          (alert: AlertType) =>
            typeof alert.location === 'string' &&
            alert.location.includes(',') &&
            !isNaN(parseFloat(alert.location.split(',')[0])) &&
            !isNaN(parseFloat(alert.location.split(',')[1]))
        );

        setAlerts(validAlerts);
      } catch (error: any) {
        console.error('⚠️ Error fetching alerts:', error.message);
        RNAlert.alert('Error', 'Failed to fetch alert locations.');
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#00796b" style={{ marginTop: 50 }} />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: alerts[0]?.location
              ? parseFloat(alerts[0].location.split(',')[0])
              : -1.286389,
            longitude: alerts[0]?.location
              ? parseFloat(alerts[0].location.split(',')[1])
              : 36.817223,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {alerts.map((alert) => {
            const [latStr, lonStr] = alert.location.split(',');
            const latitude = parseFloat(latStr);
            const longitude = parseFloat(lonStr);

            if (isNaN(latitude) || isNaN(longitude)) return null;

            return (
              <Marker
                key={alert.id}
                coordinate={{ latitude, longitude }}
                pinColor="red"
                title={`Alert: ${alert.type}`}
                description={`Sent: ${new Date(alert.timestamp).toLocaleString()}`}
              />
            );
          })}
        </MapView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
