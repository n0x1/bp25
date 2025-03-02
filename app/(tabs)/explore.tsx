import React, { useState } from "react";
import { Text, View } from "react-native";
import AddEditPlace from "@/components/addEditPlace";
import { FAB } from "react-native-paper";

export default function Index() {
  const [modalVisible, setModalVisible] = useState(true);

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
        onSave={(place) => console.log(place)} visible={modalVisible} setVisible={setModalVisible}/>
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
      <Text>Explorer</Text>
    </View>
  );
}
