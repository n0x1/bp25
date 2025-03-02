import React, { useState, useEffect } from 'react';
import Map from "@/components/map";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const vehicle = 'car'; // Change this to 'car', 'bike', or 'foot' as needed

  const geoapifyApiKey = 'b75c0428362b4b0f973d03d2638cb08c';

  const fetchCoordinates = async (address: string) => {
    const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(address)}&apiKey=${geoapifyApiKey}`);
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const { lat, lon } = data.features[0].properties;
      return { latitude: lat, longitude: lon };
    }
    return null;
  };

  useEffect(() => {
    const fetchAddresses = async () => {
      const originAddress = '1600 Amphitheatre Parkway, Mountain View, CA';
      const destinationAddress = '75 Amherst Street, Cambridge, MA';
      const originCoords = await fetchCoordinates(originAddress);
      const destinationCoords = await fetchCoordinates(destinationAddress);
      setOrigin(originCoords);
      setDestination(destinationCoords);
    };

    fetchAddresses();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Travel Planner</Text>
      </View>
      <View style={styles.mapContainer}>
        {origin && destination && (
          <Map origin={origin} destination={destination} vehicle={vehicle} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Add padding to move the content down
  },
  header: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a background color with some transparency
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  mapContainer: {
    flex: 1,
  },
});