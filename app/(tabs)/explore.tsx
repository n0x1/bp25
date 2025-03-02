import React, { useState } from "react";
import { View, FlatList, Platform } from "react-native";
import AddEditPlace from "@/components/addEditPlace";
import { TextInput, Button, Modal, FAB, Card, Text } from 'react-native-paper';
import { FlashList } from "@shopify/flash-list";
import { Place } from "@/types";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "react-native-paper";
import DateTimePicker from '@react-native-community/datetimepicker';
import useSettingsStore from "@/store";

export default function Index() {
  const colorScheme = useTheme();

  const [modalVisible, setModalVisible] = useState(false);
  const {places, setPlaces} = useSettingsStore();

  const [id, setId] = useState(-1);
  const [location, setLocation] = useState('');
  const [start, setStart] = useState(new Date());
  const [end, setEnd] = useState(new Date());
  const [duration, setDuration] = useState<string>("");

  const [startVisible, setStartVisible] = useState(false);
  const [endVisible, setEndVisible] = useState(false);

  function handleAdd() {
    setId(-1);
    setLocation('');
    setStart(new Date(new Date().setHours(7, 0, 0, 0))); //7 am
    setEnd(new Date(new Date().setHours(21, 0, 0, 0))); //21 am
    setDuration('');
    setModalVisible(true);
  }

  function handleEdit(item: Place) {
    setId(item.id);
    setLocation(item.location);
    setStart(item.start);
    setEnd(item.end);
    setDuration(item.duration.toString());
    setModalVisible(true)
  }

  const handleSubmit = () => {
    if (id == -1) {
      let newId = id == -1 ? Math.random() : id
      setPlaces(places.concat({ id: newId, location, coords: { latitude: 0, longitude: 0 }, start, end, duration: parseInt(duration) }));
    }
    else {
      let newPlaces = places.map(place => place.id == id ? { id, location, coords: { latitude: 0, longitude: 0 }, start, end, duration: parseInt(duration) } : place);
      setPlaces(newPlaces);
    }

    setModalVisible(false);
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <FlatList
        data={places}
        style={{ flex: 1 }}
        renderItem={({ item }) =>
          <Card style={{ margin: 16 }} key={item.id} onPress={() => handleEdit(item)}>
            <Card.Title title={item.location} />
            <Card.Content>
              <Text>Avalible: {item.start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} to {item.end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
              <Text>Duration: {item.duration} minutes</Text>
            </Card.Content>
          </Card>}
      // contentContainerStyle={{backgroundColor: "red" }}
      />
      <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} style={{ padding: 16, marginHorizontal: 8 }}>
        <Card style={{ paddingVertical: 16 }}>
          <Card.Title title={id == -1 ? "Add Place" : "Edit Place"} />
          <Card.Content>
            {/* Get possible locations from map api */}
            <TextInput
              label="Location"
              value={location}
              onChangeText={setLocation}
              style={{ marginBottom: 16 }} />
            <TextInput
              label="Duration (minutes)"
              value={duration}
              placeholder='60'
              onChangeText={(text) => setDuration(text)}
              style={{ marginBottom: 16 }}
              keyboardType='numeric'
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginBottom: 16 }}>
              <Text>Avalible times:</Text>
              <Button mode={'outlined'} onPress={() => setStartVisible(!startVisible)}>
                {start.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Button>
              <Text>to</Text>
              <Button mode={'outlined'} onPress={() => setEndVisible(!endVisible)}>
                {end.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Button>
            </View>
            {startVisible &&
              <DateTimePicker
                value={start}
                mode="time"
                display="default"
                onChange={(event, selectedDate) => {
                  // Use the selected date if provided, otherwise retain start value.
                  if (selectedDate) {
                    setStart(selectedDate);
                  }
                  if (Platform.OS !== 'ios') {
                    setStartVisible(false);
                  }
                }}
              />}
            {endVisible &&
              <DateTimePicker
                value={end}
                mode="time"
                display="default"
                onChange={(event, selectedDate) => {
                  if (selectedDate) {
                    setEnd(selectedDate);
                  }
                  if (Platform.OS !== 'ios') {
                    setEndVisible(false);
                  }
                }}
              />}
            <Button mode="contained" onPress={handleSubmit}>
              Save
            </Button>
          </Card.Content>
        </Card>
      </Modal>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 0,
          bottom: 0,
        }}
        icon="plus"
        onPress={() => handleAdd()}
      />
    </SafeAreaView>
  );
}
