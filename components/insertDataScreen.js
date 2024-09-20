import React from 'react'; // นำเข้า React
import { SafeAreaView, StyleSheet, TextInput, Button, Text, Alert, ImageBackground } from 'react-native'; // นำเข้าโมดูลที่จำเป็นจาก React Native

// สร้างคอมโพเนนต์ InsertDataScreen
export default function InsertDataScreen() {
    const [isLoading, setLoading] = React.useState(true); // สเตตัสการโหลดข้อมูล
    const [user_id, onChangeUid] = React.useState(''); // สเตตัสสำหรับ user_id
    const [user_name, onChangeUname] = React.useState(''); // สเตตัสสำหรับ user_name
    const [passwd, onChangePwd] = React.useState(''); // สเตตัสสำหรับรหัสผ่าน
    const [data, setData] = React.useState(''); // สเตตัสสำหรับข้อมูลที่ได้รับจากเซิร์ฟเวอร์

    return (
        <ImageBackground
            source={require('../assets/topVector.png')} // ใช้ภาพเป็นพื้นหลัง
            style={styles.container}
        >
            <SafeAreaView style={styles.innerContainer}> {/* กล่องที่ให้ความปลอดภัยสำหรับการแสดงผล */}
                <Text>User Id</Text> {/* ข้อความ "User Id" */}
                <TextInput
                    style={styles.input} // ใช้สไตล์จาก input
                    onChangeText={onChangeUid} // อัปเดต user_id เมื่อมีการเปลี่ยนแปลง
                    value={user_id} // แสดงค่าปัจจุบันของ user_id
                />
                <Text>User Name</Text> {/* ข้อความ "User Name" */}
                <TextInput
                    style={styles.input} // ใช้สไตล์จาก input
                    onChangeText={onChangeUname} // อัปเดต user_name เมื่อมีการเปลี่ยนแปลง
                    value={user_name} // แสดงค่าปัจจุบันของ user_name
                />
                <Text>Password</Text> {/* ข้อความ "Password" */}
                <TextInput
                    style={styles.input} // ใช้สไตล์จาก input
                    onChangeText={onChangePwd} // อัปเดต passwd เมื่อมีการเปลี่ยนแปลง
                    value={passwd} // แสดงค่าปัจจุบันของ passwd
                    secureTextEntry // เพิ่มความปลอดภัยให้กับรหัสผ่าน
                />
                <Text>==============================================</Text> {/* เส้นแบ่ง */}
                <Button
                    title="Insert Data" // ชื่อปุ่ม
                    onPress={() => { // เมื่อกดปุ่ม
                        fetch('http://172.21.12.103/mobileapp/PP/insertdb.php?user_id=' + user_id + '&user_name=' + user_name + '&passwd=' + passwd) // ส่งข้อมูลไปยังเซิร์ฟเวอร์
                            .then((response) => response.json()) // แปลงผลลัพธ์เป็น JSON
                            .then((json) => {
                                console.log('Response JSON:', json); // แสดงข้อมูล JSON ในคอนโซล
                                if (json.status === 'success') { // ถ้าสถานะเป็น 'success'
                                    setData(json); // ตั้งค่าสถานะข้อมูล
                                    Alert.alert('Success', json.message); // แสดงข้อความสำเร็จ
                                } else {
                                    Alert.alert('Error', json.message); // แสดงข้อความผิดพลาด
                                }
                            })
                            .catch((error) => console.error('Error:', error)) // แสดงข้อผิดพลาดในคอนโซล
                            .finally(() => setLoading(false)); // ตั้งค่า loading เป็น false
                    }}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1, // ขยายให้เต็มพื้นที่
    },
    innerContainer: {
        padding: 20, // เพิ่มพื้นที่รอบๆ
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // ทำให้พื้นหลังโปร่งใส
    },
    input: {
        height: 40, // ความสูงของ TextInput
        margin: 12, // ระยะห่างรอบๆ
        borderWidth: 1, // ความกว้างของขอบ
        borderColor: '#A3C1DA', // สีของขอบ
        padding: 10, // เพิ่มพื้นที่ภายใน
        color: '#4A90E2', // สีของข้อความ
    },
});
