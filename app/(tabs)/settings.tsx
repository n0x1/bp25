import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import useSettingsStore from '@/store';

export default function SettingsScreen() {
  // const [vehicle, setVehicle] = useState('foot');
  const { vehicle, setVehicle } = useSettingsStore();
  const [modalVisible, setModalVisible] = useState(false);

  const vehicleOptions = [
    { label: 'Foot', value: 'foot' },
    { label: 'Car', value: 'car' },
    { label: 'Bike', value: 'bike' },
  ];

  const handleSelectVehicle = (value: string) => {
    setVehicle(value);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Settings</Text>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Vehicle:</Text>
        <TouchableOpacity style={styles.picker} onPress={() => setModalVisible(true)}>
          <Text style={styles.pickerText}>{vehicleOptions.find(option => option.value === vehicle)?.label}</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <FlatList
              data={vehicleOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.modalItem} onPress={() => handleSelectVehicle(item.value)}>
                  <Text style={styles.modalItemText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'gray', // Match background color with explore.tsx
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'darkblue',
    fontSize: 24,
    marginBottom: 20,
  },
  pickerContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
  },
  pickerText: {
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalItemText: {
    fontSize: 18,
  },
});