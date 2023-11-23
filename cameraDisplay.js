import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Platform, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import CameraIcon from './icons/shutterButton.png';

export default function CameraDisplay({ route }) {
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  useEffect(() => {
    if (route.params?.activateCamera && hasCameraPermission) {
      setIsCameraActive(true);
    }
  }, [route.params?.activateCamera, hasCameraPermission]);

  const requestCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(status === 'granted');
  };

  const takePicture = async () => {
    if (cameraRef.current && hasCameraPermission) {
      try {
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Photo taken:', photo);
        // Handle the taken photo as needed
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture.');
      }
    }
  };

  if (hasCameraPermission === null) {
    return <View style={styles.container}><Text>Requesting camera permission...</Text></View>;
  }

  if (hasCameraPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  if (!isCameraActive) {
    return <View style={styles.container}><Text>Camera is not active</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={Camera.Constants.Type.back}
        ref={cameraRef}
      >
        <TouchableOpacity style={styles.cameraButton} onPress={takePicture}>
          <Image source={CameraIcon} style={styles.cameraIcon} />
        </TouchableOpacity>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  cameraIcon: {
    width: 50,
    height: 50,
  },
});