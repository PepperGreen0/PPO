import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

export default function EditScreen({ route, navigation }) {
  const { item } = route.params;

  const [userId, setUserId] = useState(item.user_id);
  const [userName, setUserName] = useState(item.user_name);
  const [password, setPassword] = useState(item.passwd);

  const handleSave = () => {
    const updatedData = new FormData();
    updatedData.append("id", item.id);
    updatedData.append("user_id", userId);
    updatedData.append("user_name", userName);
    updatedData.append("passwd", password);

    fetch('http://192.168.56.1/mobileapp/updatedb.php', {
      method: 'POST',
      body: updatedData,
    })
    .then((response) => {
      // ตรวจสอบสถานะ HTTP
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text(); // เปลี่ยนเป็น response.text() เพื่อรับข้อมูลเป็นข้อความ
    })
    .then((responseText) => {
      console.log('Response Text:', responseText); // ตรวจสอบข้อมูลที่ส่งกลับ
      try {
        const responseData = JSON.parse(responseText);

        // ...
      } catch (error) {
        console.error('JSON Parse Error:', error);
        Alert.alert('Error', 'Received invalid JSON from server');
      }
    })
      
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Edit Screen</Text>
      <Text>ID: {item.id}</Text>
      <Text>User ID:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        value={userId}
        onChangeText={setUserId}
      />
      <Text>User Name:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        value={userName}
        onChangeText={setUserName}
      />
      <Text>Password:</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 10,
          paddingHorizontal: 10,
        }}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </View>
  );
}
