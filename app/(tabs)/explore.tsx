import React, { useState } from "react";
import { View, FlatList } from "react-native";
import AddEditPlace from "@/components/addEditPlace";
import { Card, FAB, Text } from "react-native-paper";
import { FlashList } from "@shopify/flash-list";
import { Place } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(false);
  const [places, setPlaces] = useState<Place[]>([
    { id: 1, location: "Central Park", coords: { latitude: 40.785091, longitude: -73.968285 }, start: new Date(), end: new Date(), duration: 120 },
    { id: 2, location: "Eiffel Tower", coords: { latitude: 48.858844, longitude: 2.294351 }, start: new Date(), end: new Date(), duration: 90 },
    { id: 3, location: "Great Wall of China", coords: { latitude: 40.431908, longitude: 116.570374 }, start: new Date(), end: new Date(), duration: 180 },
  ]);
  const [editPlace, setEditPlace] = useState<Place | undefined>(undefined);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        backgroundColor: "black"
        // alignItems: "center",
      }}
    >
      <FlatList
        data={places}
        style={{ flex: 1 }}
        renderItem={({ item }) => 
        <Card style={{ margin: 16 }} key={item.id} onPress={()=>{setEditPlace(item); setModalVisible(true)}}>
          <Card.Title title={item.location} />
          <Card.Content>
            <Text>Avalible: {item.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to {item.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            <Text>Duration: {item.duration} minutes</Text>
          </Card.Content>
        </Card>}
        // contentContainerStyle={{backgroundColor: "red" }}
      />
      <AddEditPlace
        // place={{name: 'Place', location: 'Location', start: new Date(), end: new Date(), duration: 0}}
        onSave={(place) => setPlaces(places.concat(place))} visible={modalVisible} setVisible={setModalVisible} place={editPlace} />
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
