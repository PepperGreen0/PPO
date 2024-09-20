import { Image, StyleSheet, Text, View, Button } from "react-native"; // นำเข้าโมดูลที่จำเป็นจาก React Native
import React from "react"; // นำเข้า React

// สร้างคอมโพเนนต์ LoginScreen
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}> {/* กล่องหลักที่มีสไตล์ */}
      <View style={styles.topImageContainer}> {/* กล่องสำหรับภาพด้านบน */}
        <Image
          source={require("../assets/topVector.png")} // ใช้ภาพจาก assets
          style={styles.topImage} // ใช้สไตล์จาก topImage
        />
      </View>
      <View style={styles.HomeContainer}> {/* กล่องสำหรับข้อความ "HomeScreen" */}
        <Text style={styles.HomeText}>HomeScreen</Text> {/* ข้อความ "HomeScreen" */}
      </View>
      <View style={{ flex: 1, alignItems: "center" }}> {/* กล่องสำหรับปุ่ม */}
        <Text style={styles.divider}>=================================</Text> {/* เส้นแบ่ง */}
        <Button
          title="Go to insert" // ชื่อปุ่ม
          onPress={() => navigation.navigate("insert")} // นำไปยังหน้าที่ชื่อ "insert" เมื่อกด
          color="#A3C1DA" // สีปุ่ม
        />
        <Text style={styles.divider}>=================================</Text> {/* เส้นแบ่ง */}
        <Button 
          title="Go to JsonS" // ชื่อปุ่ม
          onPress={() => navigation.navigate("JsonS")} // นำไปยังหน้าที่ชื่อ "JsonS" เมื่อกด
          color="#A3C1DA" // สีปุ่ม
        />   
        <Text style={styles.divider}>=================================</Text> {/* เส้นแบ่ง */}
        <Button 
          title="Go to Search" // ชื่อปุ่ม
          onPress={() => navigation.navigate("Contact")} // นำไปยังหน้าที่ชื่อ "Contact" เมื่อกด
          color="#A3C1DA" // สีปุ่ม
        />   
        <Text style={styles.divider}>=================================</Text> {/* เส้นแบ่ง */}
      </View>
    </View>
  );
};

export default LoginScreen; // ส่งออกคอมโพเนนต์ LoginScreen

// สไตล์ของคอมโพเนนต์
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F5F5", // สีพื้นหลัง
    flex: 1, // ขยายให้เต็มพื้นที่
  },
  topImageContainer: {}, // กล่องสำหรับภาพด้านบน (ไม่มีสไตล์เพิ่มเติม)
  topImage: {
    width: "100%", // ความกว้าง 100%
    height: 200, // ความสูง 200
  },
  HomeContainer: {}, // กล่องสำหรับข้อความ "HomeScreen" (ไม่มีสไตล์เพิ่มเติม)
  HomeText: {
    textAlign: "center", // จัดตำแหน่งข้อความกลาง
    fontSize: 50, // ขนาดฟอนต์ 50
    fontWeight: "500", // น้ำหนักฟอนต์ 500
    color: "#4A90E2", // สีฟ้าเข้ม
  },
  divider: {
    textAlign: "center", // จัดตำแหน่งข้อความกลาง
    fontSize: 16, // ขนาดฟอนต์ 16
    color: "#A3C1DA", // สีฟ้าอ่อน
  },
  signInText: {
    textAlign: "center", // จัดตำแหน่งข้อความกลาง
    fontSize: 18, // ขนาดฟอนต์ 18
    color: "#262626" // สีข้อความ
  },
});
