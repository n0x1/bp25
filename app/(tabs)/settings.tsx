import React, { useState } from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity, FlatList } from 'react-native';
import useSettingsStore from '@/store';
import { useTheme } from 'react-native-paper';

export default function SettingsScreen() {
  const theme = useTheme();
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
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
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
            <Text style={styles.modalTitle}>Select Vehicle</Text>
            <FlatList
              data={vehicleOptions}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity 
                  style={[
                    styles.modalItem, 
                    item.value === vehicle && styles.selectedItem
                  ]} 
                  onPress={() => handleSelectVehicle(item.value)}
                >
                  <Text style={[
                    styles.modalItemText,
                    item.value === vehicle && styles.selectedItemText
                  ]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
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
    borderColor: '#3a86ff',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#f8f9fa',
  },
  pickerText: {
    fontSize: 18,
    color: '#333',
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
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalItem: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#f8f9fa',
  },
  selectedItem: {
    backgroundColor: '#3a86ff',
    borderColor: '#0056b3',
  },
  modalItemText: {
    fontSize: 18,
    textAlign: 'center',
  },
  selectedItemText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  closeButton: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#6c757d',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});