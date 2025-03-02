import React, { useState, useEffect } from 'react';
import Map from "@/components/map";
import { View, StyleSheet, FlatList } from "react-native";
import { Place } from '@/types';
import { Text, Card } from 'react-native-paper';
import { ScheduleItem } from '@/components/schedule';
import useSettingsStore from '@/store';
import { useTheme } from 'react-native-paper';
import { createSchedule } from '@/components/schedule';

export default function Index() {
  const [origin, setOrigin] = useState<{ latitude: number; longitude: number } | null>(null);
  const [destination, setDestination] = useState<{ latitude: number; longitude: number } | null>(null);
  const vehicle = 'car'; // Change this to 'car', 'bike', or 'foot' as needed
  const {places, setPlaces} = useSettingsStore();
  // const places: Place[] = [
  //   { id: 1, location: "Central Park", coords: { latitude: 40.785091, longitude: -73.968285 }, start: new Date(), end: new Date(), duration: 120 },
  //   { id: 2, location: "Eiffel Tower", coords: { latitude: 48.858844, longitude: 2.294351 }, start: new Date(), end: new Date(), duration: 90 },
  //   { id: 3, location: "Great Wall of China", coords: { latitude: 40.431908, longitude: 116.570374 }, start: new Date(), end: new Date(), duration: 180 },
  // ];
  const scheduledLocations: ScheduleItem[] = createSchedule(new Date(), places, places[0], places[places.length - 1]);

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

  const colorScheme = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 50, // Add padding to move the content down
      backgroundColor: colorScheme.colors.background,
    },
    header: {
      alignItems: 'center',
      padding: 16,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    }
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Travel Planner</Text>
      </View>
      <View style={{ flex: 2 }}>
        {origin && destination && (
          <Map origin={scheduledLocations[0].place.coords} destination={scheduledLocations[1].place.coords} vehicle={vehicle} />
        )}
      </View>
      <FlatList
        data={scheduledLocations}
        style={{ flex: 1 }}
        renderItem={({ item }) =>
          <Card style={{ margin: 16 }} key={item.place.id} onPress={() => { }}>
            <Card.Title title={item.place.location} />
            <Card.Content>
              <Text>Time: {item.arrivalTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to {item.departureTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </Card.Content>
          </Card>}
      // contentContainerStyle={{backgroundColor: "red" }}
      />
    </View>
  );
}
