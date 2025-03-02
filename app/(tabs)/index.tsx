import RouteOptimizer from "@/components/map";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Travel Planner</Text>
      <RouteOptimizer />
    </View>
  );
}
