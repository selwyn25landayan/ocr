import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React from "react";
import ButtonImage1 from "./icons/scan.png";
import ButtonImage2 from "./icons/search.png";
import ButtonImage3 from "./icons/dashboard.png";
import ButtonImage4 from "./icons/user.png";

import { styles } from "./components/style";

export default function HistoryScreen({ navigation }) {
  const [text, onChangeText] = React.useState("");
  const [number, onchangeNumber] = React.useState("");

  const handleButtonPress = (buttonText) => {
    if (buttonText === 'Button 1') {
      navigation.navigate('OCR', { activateCamera: true });
    }
    // Handle other buttons if necessary
  };
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image style={styles.cardImage} source={require("./Images/National_Bookstore_logo.jpg")} />

        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <Image
              style={styles.cardIcon}
              source={require("./icons/calendar.png")}
            />

            <View style={styles.cardTextContent}>
              <Text style={styles.cardText}>National Book Store</Text>
              <Text style={styles.label}>10.25 21:00</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Image style={styles.cardImage} source={require("./Images/Beep_logo.png")} />
        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <Image
              style={styles.cardIcon}
              source={require("./icons/calendar.png")}
            />
            <Text style={styles.cardText}>Beep</Text>
            <Text style={styles.label}>10.25 21:00</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={require("./Images/Miniso_logo.png")}
        />
        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <Image
              style={styles.cardIcon}
              source={require("./icons/calendar.png")}
            />
            <Text style={styles.cardText}>Miniso</Text>
            <Text style={styles.label}>10.25 21:00</Text>
          </View>
        </View>
      </View>
      <View style={styles.card}>
        <Image
          style={styles.cardImage}
          source={require("./Images/kennyrogers.png")}
        />

        <View style={styles.cardContent}>
          <View style={styles.cardTextContainer}>
            <Image
              style={styles.cardIcon}
              source={require("./icons/calendar.png")}
            />

            <View style={styles.cardTextContent}>
              <Text style={styles.cardText}>Kenny Rogers Roasters</Text>
              <Text style={styles.label}>10.25 21:00</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => handleButtonPress("Button 1")}
        >
          <Image
            source={ButtonImage1}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable style={styles.buttonStyle}>
          <Image
            source={ButtonImage2}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("Dashboard Screen")}
        >
          <Image
            source={ButtonImage3}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => handleButtonPress("Button 4")}
        >
          <Image
            source={ButtonImage4}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}
