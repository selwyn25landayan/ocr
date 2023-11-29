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
                  type: 'DOCUMENT_TEXT_DETECTION',
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
    // Regular expressions to match numeric values (both integers and decimals)
    const numericValuePattern = /(\d{1,3}(?:,\d{3})*(?:\.\d{0,2})?|\.\d{1,2})/g;
  
    // Regular expressions for identifying specific patterns in the text
    const merchantNamePattern = /^[A-Z\s]*(?:INC|LLC|GROUP|CORP|COMPANY|LIMITED|LTD|AG|KG|GMBH)\b/mi;
    const datePattern = /\b(\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4})\b/;
    const totalAmountPattern = /TOTAL(?:\sAMOUNT)?(?:\sDUE)?\s*[:$]*\s*(\d{1,3}(?:,\d{3})*(\.\d{0,2})?|\.\d{1,2})/i;
  
    let merchantName = '';
    let date = '';
    let totalAmount = '';
    let linesWithNumericValues = [];
  
    // Split the text by lines for easier processing
    const lines = text.split('\n');
  
    lines.forEach(line => {
      if (!merchantName && merchantNamePattern.test(line)) {
        merchantName = line.match(merchantNamePattern)[0].trim();
      }
    
      if (!date && datePattern.test(line)) {
        date = line.match(datePattern)[0];
      }
    
      if (totalAmountPattern.test(line)) {
        const totalAmountMatch = totalAmountPattern.exec(line);
        if (totalAmountMatch) {
          totalAmount = totalAmountMatch[1].replace(/,/g, ''); // Remove commas for thousands
        }
      }
    
      // Find lines containing numeric values
      const numericMatches = line.match(numericValuePattern);
      if (numericMatches) {
        // Check if there's only one numeric value in the line
        if (numericMatches.length === 1) {
          linesWithNumericValues.push(numericMatches);
        }
      }
    });
    
  
    // Sort lines with numeric values in ascending order
    linesWithNumericValues.sort((a, b) => {
      const sumA = a.reduce((acc, val) => acc + parseFloat(val.replace(',', '')), 0);
      const sumB = b.reduce((acc, val) => acc + parseFloat(val.replace(',', '')), 0);
      return sumA - sumB;
    });
  
    // Identify the total amount due
    if (linesWithNumericValues.length >= 2) {
      // The second to the last numeric line is considered the total amount due
      const totalAmountLine = linesWithNumericValues[linesWithNumericValues.length - 2];
      totalAmount = totalAmountLine.reduce((acc, val) => acc + parseFloat(val.replace(',', '')), 0);
    }
  
    // Log the extracted details
    console.log(`Merchant Name: ${merchantName}`);
    console.log(`Date: ${date}`);
    console.log(`Total Amount: ${totalAmount}`);
    console.log('Lines with Numeric Values:');
    linesWithNumericValues.forEach((line, index) => {
      console.log(`Line ${index + 1}: ${line.join(', ')}`);
  });
    return { merchantName, date, totalAmount };
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
