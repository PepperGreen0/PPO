import React, { useState } from 'react'; // นำเข้า React และ useState
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native'; // นำเข้าโมดูลที่จำเป็นจาก React Native

// สร้างคอมโพเนนต์ EditScreen
export default function EditScreen({ route, navigation }) {
  const { item } = route.params; // ดึงข้อมูล item จาก params ของ route

  // สเตตัสสำหรับเก็บข้อมูลที่จะแก้ไข
  const [userId, setUserId] = useState(item.user_id);
  const [userName, setUserName] = useState(item.user_name);
  const [password, setPassword] = useState(item.passwd);

  // ฟังก์ชันจัดการการบันทึกข้อมูล
  const handleSave = () => {
    const updatedData = new FormData(); // สร้าง FormData สำหรับส่งข้อมูล
    updatedData.append("id", item.id); // เพิ่ม id
    updatedData.append("user_id", userId); // เพิ่ม user_id
    updatedData.append("user_name", userName); // เพิ่ม user_name
    updatedData.append("passwd", password); // เพิ่ม password

    // ส่งข้อมูลไปยังเซิร์ฟเวอร์
    fetch('http://172.21.12.103/mobileapp/PP/updatedb.php', {
      method: 'POST', // ใช้เมธอด POST
      body: updatedData, // ข้อมูลที่ส่ง
    })
    .then((response) => {
      if (!response.ok) { // ตรวจสอบสถานะการตอบกลับ
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text(); // แปลงผลลัพธ์เป็นข้อความ
    })
    .then((responseText) => {
      console.log('Response Text:', responseText); // แสดงข้อความตอบกลับในคอนโซล
      if (responseText.startsWith('{') || responseText.startsWith('[')) {
        const responseData = JSON.parse(responseText); // แปลงข้อความเป็น JSON ถ้าเป็นไปได้
        // จัดการ responseData ตามปกติ
      } else {
        Alert.alert('Error', 'Received non-JSON response'); // แสดงข้อความผิดพลาดถ้าไม่ใช่ JSON
      }
    })
    .catch((error) => {
      console.error('Error:', error); // แสดงข้อผิดพลาดในคอนโซล
    });
  }; // ปิด handleSave()

  return (
    <ImageBackground
      source={require('../assets/topVector.png')} // ใช้ภาพเป็นพื้นหลัง
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Edit Screen</Text> {/* แสดงชื่อหน้าจอ */}
        <Text>ID: {item.id}</Text> {/* แสดง ID */}
        <Text>User ID:</Text>
        <TextInput
          style={styles.input} // ใช้สไตล์จาก input
          value={userId} // แสดงค่าปัจจุบันของ userId
          onChangeText={setUserId} // อัปเดต userId เมื่อมีการเปลี่ยนแปลง
        />
        <Text>User Name:</Text>
        <TextInput
          style={styles.input}
          value={userName} // แสดงค่าปัจจุบันของ userName
          onChangeText={setUserName} // อัปเดต userName เมื่อมีการเปลี่ยนแปลง
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={password} // แสดงค่าปัจจุบันของ password
          onChangeText={setPassword} // อัปเดต password เมื่อมีการเปลี่ยนแปลง
          secureTextEntry // ทำให้การป้อนรหัสผ่านปลอดภัย
        />
        <Button title="Save" onPress={handleSave} color="#A3C1DA" /> {/* ปุ่มบันทึก */}
        <Button title="Go back" onPress={() => navigation.goBack()} color="#A3C1DA" /> {/* ปุ่มกลับ */}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // ขยายให้เต็มพื้นที่
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // ทำให้พื้นหลังโปร่งใส
    borderRadius: 10, // มุมกลม
  },
  title: {
    fontSize: 24, // ขนาดตัวอักษร
    fontWeight: 'bold', // หนักตัวอักษร
    marginBottom: 20, // ระยะห่างด้านล่าง
  },
  input: {
    height: 40, // ความสูงของ TextInput
    borderColor: 'gray', // สีของเส้นขอบ
    borderWidth: 1, // ขนาดของเส้นขอบ
    marginBottom: 10, // ระยะห่างด้านล่าง
    paddingHorizontal: 10, // เพิ่มพื้นที่ในแนวนอน
  },
});
