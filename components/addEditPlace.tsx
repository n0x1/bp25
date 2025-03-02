import React, { useState } from 'react';
import { View, Platform } from 'react-native';
import { TextInput, Button, Modal, FAB, Card, Text } from 'react-native-paper';
import { Place } from '@/types';
import DateTimePicker from '@react-native-community/datetimepicker';

interface AddEditPlaceProps {
    place?: Place;
    onSave: (place: Place) => void;
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

// export interface Place {
//     name: string;
//     location: string;
//     start: Date;
//     end: Date;
//     duration: number; // in minutes
// }

const AddEditPlace: React.FC<AddEditPlaceProps> = ({ place, onSave, visible, setVisible }) => {
    const [id, setId] = useState(place?.id || -1);
    const [name, setName] = useState(place?.name || '');
    const [location, setLocation] = useState(place?.location || '');
    const [start, setStart] = useState(place?.start || new Date());
    const [end, setEnd] = useState(place?.end || new Date());
    const [duration, setDuration] = useState<string>(place?.duration.toString() || "");

    const [startVisible, setStartVisible] = useState(false);
    const [endVisible, setEndVisible] = useState(false);

    const handleSubmit = () => {
        let newId = id==-1?Math.random():id
        onSave({ id: newId, location, coords: {latitude: 0, longitude: 0}, start, end, duration: parseInt(duration) });
        setVisible(false);
    };

    return (
        // <View style={{ padding: 16, flex: 1 }}>
            <Modal visible={visible} onDismiss={() => setVisible(false)} style={{ padding: 16, marginHorizontal: 8 }}>
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
        // </View>
    );
};

export default AddEditPlace;
