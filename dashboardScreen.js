import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Pressable,
  Image,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";

import ButtonImage1 from "./icons/scan.png";
import ButtonImage2 from "./icons/search.png";
import ButtonImage3 from "./icons/dashboard.png";
import ButtonImage4 from "./icons/user.png";

import {
  chartData,
  barChartData,
  lineChartData,
  formatYLabel,
} from "./components/ChartData";

export default function DashboardScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState("");
  const { width: screenWidth } = useWindowDimensions();

  useEffect(() => {
    const updateCurrentDate = () => {
      const now = new Date();
      const formattedDate = now.toDateString();
      setCurrentDate(formattedDate);
    };

    updateCurrentDate();
    const intervalId = setInterval(updateCurrentDate, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const handleButtonPress = (buttonText) => {
    if (buttonText === 'Button 1') {
      navigation.navigate('OCR', { activateCamera: true });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { fontSize: screenWidth * 0.05 }]}>Dashboard</Text>
      <Text style={[styles.date, { fontSize: screenWidth * 0.03 }]}>{currentDate}</Text>
      
      <PieChart
        data={chartData}
        width={screenWidth * 0.9} 
        height={170} 
        chartConfig={{
          backgroundGradientFrom: "black",
          backgroundGradientTo: "black",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="15"
        absolute
      />
      
      <BarChart
        data={barChartData}
        width={screenWidth * 0.95}
        height={200}
        yAxisSuffix="%"
        chartConfig={{
          backgroundGradientFrom: "black",
          backgroundGradientTo: "black",
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
          strokeWidth: 2,
        }}
        formatYLabel={formatYLabel}
        showValuesOnTopOfBars={true}
      />

      <LineChart
        data={lineChartData}
        width={screenWidth * 0.95}
        height={200}
        chartConfig={{
          backgroundGradientFrom: "black",
          backgroundGradientTo: "black",
          color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
        }}
        formatYLabel={formatYLabel}
        bezier
      />

      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
          onPress={() => handleButtonPress("Button 1")}
        >
          <Image
            source={ButtonImage1}
            style={[styles.buttonImage, { width: 30, height: 30 }]}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
          onPress={() => navigation.navigate("HistoryScreen")}
        >
          <Image
            source={ButtonImage2}
            style={[styles.buttonImage, { width: 30, height: 30 }]}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
          onPress={() => handleButtonPress("Button 3")}
        >
          <Image
            source={ButtonImage3}
            style={[styles.buttonImage, { width: 30, height: 30 }]}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={[styles.buttonStyle, { padding: screenWidth * 0.02 }]}
          onPress={() => handleButtonPress("Button 4")}
        >
          <Image
            source={ButtonImage4}
            style={[styles.buttonImage, { width: 30, height: 30 }]}
            resizeMode="contain"
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    padding: 10,
  },
  title: {
    margin: 10,
    fontWeight: "bold",
    color: "white",
  },
  date: {
    marginBottom: 10,
    color: "white",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  buttonStyle: {
    alignItems: "center",
    backgroundColor: "gray",
    borderRadius: 5,
  },
  buttonImage: {
    resizeMode: "contain",
  },
  // Add any additional styles you might need
});
