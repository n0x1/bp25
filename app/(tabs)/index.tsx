import Map from "@/components/map";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  const origin = { latitude: 42.78825, longitude: -71.4324 };
  const destination = { latitude: 37.75825, longitude: -122.4624 };
  const vehicle = 'bike'; // Change this to 'car', 'bike', or 'foot' as needed

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Travel Planner</Text>
      </View>
      <View style={styles.mapContainer}>
        <Map origin={origin} destination={destination} vehicle={vehicle} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100, // Add padding to move the content down
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