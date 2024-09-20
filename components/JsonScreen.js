import React, { useEffect, useState } from 'react'; // นำเข้า React และ hooks ที่จำเป็น
import { FlatList, Text, View, Button, TouchableOpacity, ActivityIndicator, Alert, ImageBackground, StyleSheet } from 'react-native'; // นำเข้าโมดูลจาก React Native

// สร้างคอมโพเนนต์ JsonScreen
export default function JsonScreen({ navigation }) {
  const [isLoading, setLoading] = useState(true); // สเตตัสสำหรับการโหลดข้อมูล
  const [data, setData] = useState([]); // สเตตัสสำหรับข้อมูลที่ได้รับ
  const [selectedId, setSelectedId] = useState(null); // สเตตัสสำหรับ ID ของรายการที่เลือก

  // ใช้ useEffect เพื่อเรียกข้อมูลจาก API
  useEffect(() => {
    fetch('http://172.21.12.103/mobileapp/PP/showmobile.php') // ดึงข้อมูลจาก API
      .then((response) => response.json()) // แปลงผลลัพธ์เป็น JSON
      .then((json) => {
        console.log('Data received:', json); // แสดงข้อมูลที่ได้รับในคอนโซล
        setData(json); // ตั้งค่า data ด้วยข้อมูลที่ได้รับ
      })
      .catch((error) => console.error('Error:', error)) // แสดงข้อผิดพลาดในคอนโซล
      .finally(() => setLoading(false)); // ตั้งค่า loading เป็น false
  }, []); // ว่างไว้เพื่อให้ทำงานเพียงครั้งเดียวเมื่อคอมโพเนนต์ถูกเรนเดอร์ครั้งแรก

  // ฟังก์ชันจัดการแก้ไข
  const handleEdit = (item) => {
    navigation.navigate('About', { item }); // นำไปยังหน้าที่ชื่อ "About" พร้อมส่งข้อมูล item
  };

  // ฟังก์ชันจัดการลบ
  const handleDelete = (user_id) => {
    console.log('Deleting user_id:', user_id); // แสดง user_id ที่จะลบในคอนโซล
    fetch(`http://172.21.12.103/mobileapp/PP/dropdb.php?user_id=${encodeURIComponent(user_id)}`, {
      method: 'GET', // ใช้เมธอด GET
    })
      .then((response) => response.text()) // แปลงผลลัพธ์เป็นข้อความ
      .then((responseText) => {
        console.log('Response Text:', responseText); // แสดงข้อความที่ได้รับในคอนโซล
        if (responseText.includes('Record deleted successfully')) { // ถ้าข้อความบอกว่าลบสำเร็จ
          setData((prevData) => prevData.filter((item) => item.user_id !== user_id)); // ลบข้อมูลที่ถูกลบออกจาก state
          Alert.alert('Success', 'Record deleted successfully'); // แสดงข้อความสำเร็จ
        } else {
          Alert.alert('Error', responseText); // แสดงข้อความผิดพลาด
        }
      })
      .catch((error) => {
        console.error('Error:', error); // แสดงข้อผิดพลาดในคอนโซล
        Alert.alert('Error', 'An error occurred'); // แสดงข้อความผิดพลาด
      });
  };

  // ฟังก์ชันสลับตัวเลือก
  const toggleOptions = (id) => {
    setSelectedId(selectedId === id ? null : id); // เปลี่ยนค่า selectedId
  };

  // ถ้ากำลังโหลดข้อมูล
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" /> {/* แสดงตัวโหลด */}
        <Text>Loading...</Text> {/* ข้อความระหว่างการโหลด */}
      </View>
    );
  }

  // ถ้าข้อมูลว่าง
  if (data.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No data available</Text> {/* ข้อความเมื่อไม่มีข้อมูล */}
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('../assets/topVector.png')} // ใช้ภาพเป็นพื้นหลัง
      style={styles.container}
    >
      <FlatList
        data={data} // ใช้ข้อมูลจาก state
        keyExtractor={(item) => item.id.toString()} // ใช้ id เป็น key
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <TouchableOpacity onPress={() => toggleOptions(item.id)}> {/* เมื่อกดจะสลับตัวเลือก */}
              <Text>ID: {item.id}</Text>
              <Text>User ID: {item.user_id}</Text>
              <Text>User Name: {item.user_name}</Text>
              <Text>Password: {item.passwd}</Text>
            </TouchableOpacity>

            {selectedId === item.id && ( // ถ้าเลือกไอดีนี้
              <View style={styles.buttonContainer}>
                <Button title="Edit" onPress={() => handleEdit(item)} /> {/* ปุ่มแก้ไข */}
                <Button title="Delete" onPress={() => handleDelete(item.user_id)} color="red" /> {/* ปุ่มลบ */}
              </View>
            )}
          </View>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ขยายให้เต็มพื้นที่
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center', // จัดกลางแนวตั้ง
    alignItems: 'center', // จัดกลางแนวนอน
  },
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1, // เส้นขอบล่าง
    borderBottomColor: '#ccc', // สีเส้นขอบ
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // ทำให้พื้นหลังโปร่งใส
  },
  buttonContainer: {
    flexDirection: 'row', // จัดเรียงปุ่มในแนวนอน
    justifyContent: 'space-between', // จัดช่องว่างระหว่างปุ่ม
    marginTop: 10,
  },
});
