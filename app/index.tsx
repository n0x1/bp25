import { Text, View } from "react-native";
import AddEditPlace from "@/components/addEditPlace";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <AddEditPlace
        // place={{name: 'Place', location: 'Location', start: new Date(), end: new Date(), duration: 0}}
        onSave={(place) => console.log(place)}/>
    </View>
  );
}
