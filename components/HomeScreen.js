import { Image, StyleSheet, Text, View, Button } from "react-native";
import React from "react";

const HomeScreen = ({ navigation }) => {
  const [time, setTime] = React.useState(''); 

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString()); 
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topImageContainer}>
        <Image
          source={require("../assets/topVector.png")}
          style={styles.topImage}
        />
      </View>
      <View style={styles.HomeContainer}>
        <Text style={styles.HomeText}>HomeScreen</Text>
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.clock}>{time}</Text> 
        <Text style={styles.divider}>=================================</Text>
        <Button
          title="Go to insert"
          onPress={() => navigation.navigate("insert")}
          color="#A3C1DA"
        />
        <Text style={styles.divider}>=================================</Text>
        <Button 
          title="Go to JsonS"
          onPress={() => navigation.navigate("JsonS")}
          color="#A3C1DA"
        />   
        <Text style={styles.divider}>=================================</Text>
        <Button 
          title="Go to Search"
          onPress={() => navigation.navigate("Search")}
          color="#A3C1DA"
        />   
        <Text style={styles.divider}>=================================</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5",
    flex: 1,
  },
  topImageContainer: {}, 
  topImage: {
    width: "100%",
    height: 200,
  },
  HomeContainer: {}, 
  HomeText: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "500",
    color: "#4A90E2", // สีฟ้าเข้ม
  },
  clock: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#4A90E2", // สีฟ้าเข้ม
    marginVertical: 20,
  },
  divider: {
    textAlign: "center",
    fontSize: 16,
    color: "#A3C1DA", // สีฟ้าอ่อน
  },
  signInText: {
    textAlign: "center",
    fontSize: 18,
    color: "#262626"
  },
});
