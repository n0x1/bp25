import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { TextInput, Button, Modal, FAB, Card, Text } from 'react-native-paper';
import { Place } from '@/types';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddEditPlaceProps {
    place?: Place;
    onSave: (place: Place) => void;
}

// export interface Place {
//     name: string;
//     location: string;
//     start: Date;
//     end: Date;
//     duration: number; // in minutes
// }

const AddEditPlace: React.FC<AddEditPlaceProps> = ({ place, onSave }) => {
    const [name, setName] = useState(place?.name || '');
    const [location, setLocation] = useState(place?.location || '');
    const [start, setStart] = useState(place?.start || new Date());
    const [end, setEnd] = useState(place?.end || new Date());
    const [duration, setDuration] = useState(place?.duration || 0);

    const [modalVisible, setModalVisible] = useState(false);
    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);

    const handleSubmit = () => {
        onSave({ name, location, start, end, duration });
        setModalVisible(false);
    };

    return (
        <View style={{ padding: 16, flex: 1 }}>
            <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} style={{ padding: 16 }}>
                <Card style={{ paddingVertical: 16 }}>
                    <Card.Title title="Add Place" />
                    <Card.Content>
                        <TextInput
                            label="Name"
                            value={name}
                            onChangeText={setName}
                            style={{ marginBottom: 16 }}
                        />
                        <TextInput
                            label="Location"
                            value={location}
                            onChangeText={setLocation}
                            style={{ marginBottom: 16 }} />
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
                onPress={() => setModalVisible(!modalVisible)}
            />
        </View>
    );
};

export default AddEditPlace;
