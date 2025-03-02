import React, { useState } from "react";
import { View } from "react-native";
import AddEditPlace from "@/components/addEditPlace";
import { Card, FAB, Text } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Place } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [places, setPlaces] = useState<Place[]>([
    { id: 1, location: "Location", coords: { latitude: 0, longitude: 0 }, start: new Date(), end: new Date(), duration: 0 },
    { id: 2, location: "Location", coords: { latitude: 0, longitude: 0 }, start: new Date(), end: new Date(), duration: 0 },
    { id: 3, location: "Location", coords: { latitude: 0, longitude: 0 }, start: new Date(), end: new Date(), duration: 0 },
  ]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black"
        // alignItems: "center",
      }}
    >
      <FlashList
        data={places}
        renderItem={({ item }) => 
        <Card>
          <Card.Title title={item.location} />
          <Card.Content>
            <Text>Start: {item.start.toLocaleTimeString()}</Text>
            <Text>End: {item.end.toLocaleTimeString()}</Text>
            <Text>Duration: {item.duration}</Text>
          </Card.Content>
        </Card>}
        estimatedItemSize={200}
        // contentContainerStyle={{backgroundColor: "red" }}
      />
      <AddEditPlace
        // place={{name: 'Place', location: 'Location', start: new Date(), end: new Date(), duration: 0}}
        onSave={(place) => console.log(place)} visible={modalVisible} setVisible={setModalVisible} />
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        onPress={() => setModalVisible(!modalVisible)}
      />
    </SafeAreaView>
  );
}
