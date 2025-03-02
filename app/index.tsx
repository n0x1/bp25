import { Text, View } from "react-native";
import getSchedule from "@/utils/schedule";

export default function Index() {
  console.log(
    getSchedule(10, [{
      name: 'place',
      openingHour: 8,
      closingHour: 20,
      visitDuration: 1,
      travelDuration: 1,
    },
    {
      name: 'place2',
      openingHour: 5,
      closingHour: 20,
      visitDuration: 1,
      travelDuration: 1,
    },
    {
      name: 'place3',
      openingHour: 10,
      closingHour: 20,
      visitDuration: 1,
      travelDuration: 1,
    }]));

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
