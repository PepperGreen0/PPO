import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';

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

    fetch('http://172.21.12.103/mobileapp/PP/updatedb.php', {
      method: 'POST',
      body: updatedData,
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then((responseText) => {
      console.log('Response Text:', responseText);
      try {
        const responseData = JSON.parse(responseText);
        if (responseData.status === 'success') {
          Alert.alert('Success', responseData.message);
          navigation.goBack();
        } else {
          Alert.alert('Error', responseData.message);
        }
      } catch (error) {
        console.error('JSON Parse Error:', error);
        Alert.alert('Error', 'Received invalid JSON from server');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred while saving data');
    });
  };

  return (
    <ImageBackground
      source={require('../assets/topVector.png')} // ใช้ภาพเป็นพื้นหลัง
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Edit Screen</Text>
        <Text>ID: {item.id}</Text>
        <Text>User ID:</Text>
        <TextInput
          style={styles.input}
          value={userId}
          onChangeText={setUserId}
        />
        <Text>User Name:</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        <Text>Password:</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <Button title="Save" onPress={handleSave} color="#A3C1DA" />
        <Button title="Go back" onPress={() => navigation.goBack()} color="#A3C1DA" />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // ทำให้พื้นหลังโปร่งใส
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});
