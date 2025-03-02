import RouteOptimizer from "@/components/map";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Travel Planner</Text>
      </View>
      <RouteOptimizer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    position: 'absolute',
    top: 50, // Move the text down more
    width: '100%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Optional: Add a background color with some transparency
    zIndex: 1,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});