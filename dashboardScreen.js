import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Dimensions,
  Pressable,
  Image,
  StyleSheet,
} from "react-native";
import { PieChart, BarChart, LineChart } from "react-native-chart-kit";
import {
  chartData,
  barChartData,
  lineChartData,
  formatYLabel,
} from "./components/ChartData";
import { styles } from "./components/style";

import ButtonImage1 from "./icons/scan.png";
import ButtonImage2 from "./icons/search.png";
import ButtonImage3 from "./icons/dashboard.png";
import ButtonImage4 from "./icons/user.png";

const screenWidth = Dimensions.get("window").width;

export default function DashboardScreen({ navigation }) {
  const [currentDate, setCurrentDate] = useState("");

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
      <Text style={styles.title}>Dashboard</Text>
      <View>
        <Text style={styles.date}>{currentDate}</Text>
      </View>
      
      <PieChart
        data={chartData}
        width={screenWidth * 0.9} 
        height={screenWidth * 0.4} 
        chartConfig={{
          backgroundGradientFrom: "black",
          backgroundGradientTo: "black",
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft={screenWidth * 0.05} 
        absolute
      />

      <View>
        <Text style={styles.chartDateTitle}>Week</Text>
        <BarChart
          data={barChartData}
          width={screenWidth * 0.95} 
          height={screenWidth * 0.4}
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
        <Text style={styles.chartDateTitle}>Month</Text>
        <LineChart
          data={lineChartData}
          width={screenWidth * 0.95} 
          height={screenWidth * 0.4} 
          chartConfig={{
            backgroundGradientFrom: "black",
            backgroundGradientTo: "black",
            color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`,
          }}
          formatYLabel={formatYLabel}
          bezier
        />
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
        <Pressable
          style={styles.buttonStyle}
          onPress={() => navigation.navigate("History Screen")}
        >
          <Image
            source={ButtonImage2}
            style={styles.buttonImage}
            resizeMode="contain"
          />
        </Pressable>
        <Pressable
          style={styles.buttonStyle}
          onPress={() => handleButtonPress("Button 3")}
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
