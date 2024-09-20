import React, { useState } from 'react'; // นำเข้า React และ useState
import { View, TextInput, Button, FlatList, Text, StyleSheet, ImageBackground } from 'react-native'; // นำเข้าโมดูลที่จำเป็นจาก React Native

// สร้างคอมโพเนนต์ ContactScreen
export default function ContactScreen() {
  const [searchTerm, setSearchTerm] = useState(''); // สเตตัสสำหรับเก็บคำค้นหา
  const [results, setResults] = useState([]); // สเตตัสสำหรับเก็บผลลัพธ์การค้นหา

  // ฟังก์ชันจัดการการค้นหา
  const handleSearch = () => {
    fetch(`http://172.21.12.103/mobileapp/PP/search.php?user_id=${searchTerm}`) // ส่งคำค้นหาไปยังเซิร์ฟเวอร์
      .then((response) => response.json()) // แปลงผลลัพธ์เป็น JSON
      .then((json) => {
        console.log('Search Results:', json); // แสดงผลลัพธ์ในคอนโซล
        setResults(json); // อัปเดตผลลัพธ์การค้นหา
      })
      .catch((error) => {
        console.error('Error:', error); // แสดงข้อผิดพลาดในคอนโซล
      });
  };

  return (
    <View style={styles.container}> {/* กำหนดสไตล์ของ container */}
      <View style={styles.topImageContainer}>
        <ImageBackground
          source={require('../assets/topVector.png')} // ใช้ภาพเป็นพื้นหลัง
          style={styles.topImage} // กำหนดสไตล์ของภาพ
        />
      </View>
      <TextInput
        placeholder="Enter User ID" // ข้อความ placeholder
        value={searchTerm} // แสดงค่าปัจจุบันของ searchTerm
        onChangeText={(text) => setSearchTerm(text)} // อัปเดต searchTerm เมื่อมีการเปลี่ยนแปลง
        style={styles.input} // ใช้สไตล์จาก input
      />
      <Button title="Search" onPress={handleSearch} color="#A3C1DA" /> {/* ปุ่มค้นหา */}
      <FlatList
        data={results} // ใช้ข้อมูลที่ค้นหาได้
        keyExtractor={(item) => item.id.toString()} // กำหนด key สำหรับแต่ละรายการ
        renderItem={({ item }) => ( // วิธีการ render รายการ
          <View style={styles.resultContainer}>
            <Text style={styles.resultText}>ID: {item.id}</Text> // แสดง ID
            <Text style={styles.resultText}>User ID: {item.user_id}</Text> // แสดง User ID
            <Text style={styles.resultText}>User Name: {item.user_name}</Text> // แสดง User Name
            <Text style={styles.resultText}>Password: {item.passwd}</Text> // แสดง Password
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20, // กำหนด padding ของ container
    flex: 1, // ทำให้ container ขยายเต็มพื้นที่
    backgroundColor: "#F5F5F5", // สีพื้นหลัง
  },
  topImageContainer: {
    width: "100%", // ความกว้าง 100%
    height: 200, // ความสูง 200
  },
  topImage: {
    width: "100%", // ความกว้าง 100%
    height: "100%", // ความสูง 100%
  },
  input: {
    borderBottomWidth: 1, // ขนาดเส้นขอบด้านล่าง
    marginBottom: 10, // ระยะห่างด้านล่าง
    borderColor: "#A3C1DA", // สีเส้นขอบ
    padding: 10, // เพิ่ม padding
    color: "#4A90E2", // สีตัวอักษร
  },
  resultContainer: {
    padding: 10, // เพิ่ม padding
    borderBottomWidth: 1, // ขนาดเส้นขอบด้านล่าง
    borderColor: "#A3C1DA", // สีเส้นขอบ
    backgroundColor: "rgba(255, 255, 255, 0.8)", // ทำให้พื้นหลังโปร่งใส
  },
  resultText: {
    color: "#262626", // สีตัวอักษร
  },
});
