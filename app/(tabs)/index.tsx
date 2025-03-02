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
  const vehicle = 'car'; // Change this to 'car', 'bike', or 'foot' as needed
  const {places, setPlaces} = useSettingsStore();
  const scheduledLocations: ScheduleItem[] = createSchedule(new Date(), places, places[0], places[places.length - 1]);

  const [startLocation, setStartLocation] = useState<Place | null>(places[0]);
  const [endLocation, setEndLocation] = useState<Place | null>(places[places.length - 1]);

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
        {startLocation && endLocation && (
          <Map origin={startLocation.coords} destination={endLocation.coords} vehicle={vehicle} />
        )}
      </View>
      <FlatList
        data={scheduledLocations}
        style={{ flex: 1 }}
        renderItem={({ item, index }) =>
          <Card style={{ margin: 16 }} key={item.place.id} onPress={() => {setStartLocation(item.place); setEndLocation(scheduledLocations[index+1]?.place??scheduledLocations[0].place)}}>
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
