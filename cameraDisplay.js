import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, Text, Alert, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import axios from 'axios';
import CameraIcon from './icons/shutterButton.png'; // Ensure this path is correct

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
        const photo = await cameraRef.current.takePictureAsync({ base64: true });
        console.log('Photo taken:', photo.uri);
        processReceiptImage(photo.base64);
      } catch (error) {
        console.error('Error taking picture:', error);
        Alert.alert('Error', 'Failed to take picture.');
      }
    }
  };

  const processReceiptImage = async (base64Image) => {
    try {
      const response = await axios.post(
        'https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAnihVavAvhQDTgI1kr2B0P3TKdED-0Xxw',
        {
          requests: [
            {
              image: {
                content: base64Image,
              },
              features: [
                {
                  type: 'TEXT_DETECTION',
                },
              ],
            },
          ],
        }
      );

      const detectedText = response.data.responses[0].fullTextAnnotation.text;
      extractReceiptDetails(detectedText);
    } catch (error) {
      console.error(error);
    }
  };

  const extractReceiptDetails = (text) => {
    // Robust pattern to match a variety of merchant names including uppercase, potentially including "INC" or other corporate designations
    const merchantNamePattern = /^(?:.*?)([A-Z\s]+(?:INC|LLC|GROUP|CORP|COMPANY|LIMITED|LTD|AG|KG|GMBH))\b/mi;
    
    // General date pattern to match a variety of date formats (e.g., MM/DD/YYYY, DD-MM-YYYY, etc.)
    const datePattern = /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/;
    
    // General pattern to match a variety of ways that a total amount may be indicated
    const totalAmountPattern = /(?:SUB TOTAL|TOTAL|TOTAL AMOUNT DUE|AMOUNT DUE|TOTAL DUE)\s*(?:DUE|PAID)?\s*[:$]*\s*([$€£]?\s*\d+[.,]?\d{0,2})/i;

    let merchantName = '';
    let date = '';
    let totalAmount = '';
  
    // Split the text by lines for easier processing
    const lines = text.split('\n');
  
    // Attempt to find the merchant name
    for (const line of lines) {
      const merchantMatch = merchantNamePattern.exec(line);
      if (merchantMatch) {
        merchantName = merchantMatch[1].trim();
        break; // Stop after finding the first match
      }
    }
  
    // Attempt to find the date and total amount using the lines
    for (const line of lines) {
      if (!date) {
        const dateMatch = datePattern.exec(line);
        if (dateMatch) {
          date = dateMatch[0];
        }
      }
      if (!totalAmount) {
        const totalAmountMatch = totalAmountPattern.exec(line);
        if (totalAmountMatch) {
          totalAmount = totalAmountMatch[1].replace(/[.,\s]/g, ''); // Remove any punctuation or white spaces in the captured amount
        }
      }
      
      // Stop searching if both date and total amount are found
      if (date && totalAmount) break;
    }
  
    console.log(`Merchant Name: ${merchantName}, Date: ${date}, Total Amount: ${totalAmount}`);
    // ... additional processing logic
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
    width: 100,
    height: 100,
  },
});
