import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';

interface MapProps {
  origin: { latitude: number; longitude: number };
  destination: { latitude: number; longitude: number };
}

export default function Map({ origin, destination }: MapProps) {
  const [route, setRoute] = useState<{ latitude: number; longitude: number }[]>([]);

  useEffect(() => {
    const fetchRoute = async () => {
      const apiKey = '4656ba98-d1fe-4878-b44d-560b001f327a';
      const response = await fetch(
        `https://graphhopper.com/api/1/route?point=${origin.latitude},${origin.longitude}&point=${destination.latitude},${destination.longitude}&vehicle=car&locale=en&key=${apiKey}&points_encoded=false`
      );
      const data = await response.json();
      const points = data.paths[0].points.coordinates.map((point: [number, number]) => ({
        latitude: point[1],
        longitude: point[0],
      }));
      setRoute(points);
    };

    fetchRoute();
  }, [origin, destination]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={origin} title="Origin" />
        <Marker coordinate={destination} title="Destination" />
        <Polyline coordinates={route} strokeColor="#000" strokeWidth={6} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});