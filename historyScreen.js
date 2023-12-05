import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  useWindowDimensions,
} from "react-native";

import ButtonImage1 from "./icons/scan.png";
import ButtonImage2 from "./icons/search.png";
import ButtonImage3 from "./icons/dashboard.png";
import ButtonImage4 from "./icons/user.png";

export default function HistoryScreen({ navigation }) {
  const [text, onChangeText] = useState("");
  const [number, onchangeNumber] = useState("");
  const { width: screenWidth } = useWindowDimensions();

  const handleButtonPress = (buttonText) => {
    if (buttonText === 'Button 1') {
      navigation.navigate('OCR', { activateCamera: true });
    }
  };

  return (
    <View style={styles.container(screenWidth)}>
      <View style={styles.card(screenWidth)}>
        <Image style={styles.cardImage} source={require("./Images/National_Bookstore_logo.jpg")} />

        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <View style={styles.cardTextContent}>
              <Text style={styles.cardText}>National Book Store</Text>
              <Text style={styles.label}>10.25 21:00</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.card(screenWidth)}>
        <Image style={styles.cardImage} source={require("./Images/Beep_logo.png")} />
        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>Beep</Text>
            <Text style={styles.label}>10.25 21:00</Text>
          </View>
        </View>
      </View>
      <View style={styles.card(screenWidth)}>
        <Image
          style={styles.cardImage}
          source={require("./Images/Miniso_logo.png")}
        />
        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <Text style={styles.cardText}>Miniso</Text>
            <Text style={styles.label}>10.25 21:00</Text>
          </View>
        </View>
      </View>
      <View style={styles.card(screenWidth)}>
        <Image
          style={styles.cardImage}
          source={require("./Images/kennyrogers.png")}
        />

        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <View style={styles.cardTextContent}>
              <Text style={styles.cardText}>Kenny Rogers Roasters</Text>
              <Text style={styles.label}>10.25 21:00</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={styles.buttonContainer}>
          {/* Button views */}
          <Pressable
            style={styles.buttonStyle(screenWidth)}
            onPress={() => handleButtonPress("Button 1")}
          >
            <Image
              source={ButtonImage1}
              style={styles.buttonImage(screenWidth)}
              resizeMode="contain"
            />
          </Pressable>

          <Pressable style={styles.buttonStyle(screenWidth)}>
            <Image
              source={ButtonImage2}
              style={styles.buttonImage(screenWidth)}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={styles.buttonStyle(screenWidth)}
            onPress={() => navigation.navigate("DashboardScreen")}
          >
            <Image
              source={ButtonImage3}
              style={styles.buttonImage(screenWidth)}
              resizeMode="contain"
            />
          </Pressable>
          <Pressable
            style={styles.buttonStyle(screenWidth)}
            onPress={() => navigation.navigate("UserScreen")}
          >
            <Image
              source={ButtonImage4}
              style={styles.buttonImage(screenWidth)}
              resizeMode="contain"
            />
          </Pressable>
      
        </View>
      </View>
    </View>
  );
}

const styles = {
  container: (screenWidth) => ({
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
  }),
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  buttonStyle: (screenWidth) => ({
    alignItems: "center",
    backgroundColor: "gray",
    padding: screenWidth * 0.02, // Responsive padding
    borderRadius: 5,
  }),
  buttonImage: (screenWidth) => ({
    width: screenWidth * 0.08, // Responsive size
    height: screenWidth * 0.08,
    resizeMode: "contain",
  }),
  card: (screenWidth) => ({
    flexDirection: "row",
    width: screenWidth * 0.9, // Responsive width
    height: 130,
    backgroundColor: "#312f2f",
    borderRadius: 10,
    marginTop: 30,
  }),
  cardImage: {
    width: 100,
    height: "100%",
    resizeMode: "contain",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardContent: {
    flex: 1,
    padding: 20,
  },
  cardTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginRight: 10,
  },
  cardIcon: {
    width: 10,
    height: 10,
    resizeMode: "contain",
    tintColor: "white",
  },
  label: {
    fontSize: 12,
    color: "white",
  },
  cardTextContent: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  // ... include any additional styles you might need
};