export const chartData = [
    {
      name: "School",
      population: 45,
      color: "#FFD700", // Gold color
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Food",
      population: 28,
      color: "#FFA500", // Orange color (a shade of gold)
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Savings",
      population: 80,
      color: "#FFC0CB", // Pink color (another shade of gold)
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Transport",
      population: 99,
      color: "#FF4500", // Red-Orange color (another shade of gold)
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
    {
      name: "Other",
      population: 20,
      color: "#FF8C00", // Dark Orange color (another shade of gold)
      legendFontColor: "#7F7F7F",
      legendFontSize: 15,
    },
  ];
  
  export const barChartData = {
    labels: ["Mon", "Tue", "Wed", "Thurs", "Fri", "Sat", "Sun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43, 30],
      },
    ],
  };
  
  export const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(255, 165, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };
  
  // Function to format Y-axis labels as integers
  export const formatYLabel = (value) => {
    return Math.round(value); // Round to the nearest integer
  };