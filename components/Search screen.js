import React, { useState } from 'react'; // นำเข้า React และ useState
import { View, TextInput, Button, FlatList, Text, StyleSheet, ImageBackground } from 'react-native'; // นำเข้าโมดูลที่จำเป็นจาก React Native

// สร้างคอมโพเนนต์ SearchScreen
export default function SearchScreen() {
  const [searchTerm, setSearchTerm] = useState(''); // สเตตัสสำหรับเก็บค่าค้นหา
  const [results, setResults] = useState([]); // สเตตัสสำหรับเก็บผลลัพธ์การค้นหา

  // ฟังก์ชันจัดการการค้นหา
  const handleSearch = () => {
    fetch(`http://172.21.12.103/mobileapp/PP/search.php?user_id=${searchTerm}`) // เรียก API ค้นหาข้อมูล
      .then((response) => response.json()) // แปลงผลลัพธ์เป็น JSON
      .then((json) => {
        console.log('Search Results:', json); // แสดงผลลัพธ์การค้นหาในคอนโซล
        setResults(json); // ตั้งค่า results ด้วยข้อมูลที่ได้รับ
      })
      .catch((error) => {
        console.error('Error:', error); // แสดงข้อผิดพลาดในคอนโซล
      });
  };

  return (
    <ImageBackground
      source={require('../assets/topVector.png')} // ใช้ภาพเป็นพื้นหลัง
      style={styles.container}
    >
      <View style={styles.innerContainer}> {/* กล่องสำหรับแสดงผล */}
        <TextInput
          placeholder="Enter User ID" // ข้อความแสดงใน TextInput
          value={searchTerm} // แสดงค่าปัจจุบันของ searchTerm
          onChangeText={(text) => setSearchTerm(text)} // อัปเดต searchTerm เมื่อมีการเปลี่ยนแปลง
          style={styles.input} // ใช้สไตล์จาก input
        />
        <Button title="Search" onPress={handleSearch} color="#A3C1DA" /> {/* ปุ่มค้นหา */}
        <FlatList
          data={results} // ใช้ผลลัพธ์การค้นหา
          keyExtractor={(item) => item.id.toString()} // ใช้ id เป็น key
          renderItem={({ item }) => ( // เรนเดอร์ผลลัพธ์แต่ละรายการ
            <View style={styles.resultContainer}> {/* กล่องสำหรับแสดงผลลัพธ์ */}
              <Text style={styles.resultText}>ID: {item.id}</Text> {/* แสดง ID */}
              <Text style={styles.resultText}>User ID: {item.user_id}</Text> {/* แสดง User ID */}
              <Text style={styles.resultText}>User Name: {item.user_name}</Text> {/* แสดง User Name */}
            </View>
          )}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ขยายให้เต็มพื้นที่
  },
  innerContainer: {
    padding: 20, // เพิ่มพื้นที่รอบๆ
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // ทำให้พื้นหลังโปร่งใส
    borderRadius: 10, // มุมกลม
  },
  input: {
    borderBottomWidth: 1, // เส้นขอบล่าง
    marginBottom: 10, // ระยะห่างด้านล่าง
    borderColor: '#A3C1DA', // สีของเส้นขอบ
    padding: 10, // เพิ่มพื้นที่ภายใน
    color: '#4A90E2', // สีของข้อความ
  },
  resultContainer: {
    padding: 10, // เพิ่มพื้นที่ภายใน
    borderBottomWidth: 1, // เส้นขอบล่าง
    borderColor: '#A3C1DA', // สีของเส้นขอบ
    backgroundColor: '#FFFFFF', // สีพื้นหลัง
  },
  resultText: {
    color: '#262626', // สีของข้อความผลลัพธ์
  },
});
