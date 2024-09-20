import React from 'react';
import { SafeAreaView, StyleSheet, TextInput, Button, Text, Alert, ImageBackground } from 'react-native';

export default function InsertDataScreen() {
    const [isLoading, setLoading] = React.useState(true);
    const [user_id, onChangeUid] = React.useState('');
    const [user_name, onChangeUname] = React.useState('');
    const [passwd, onChangePwd] = React.useState('');
    const [data, setData] = React.useState('');

    return (
        <ImageBackground
            source={require('../assets/topVector.png')} // ใช้ภาพเป็นพื้นหลัง
            style={styles.container}
        >
            <SafeAreaView style={styles.innerContainer}>
                <Text>User Id</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUid}
                    value={user_id}
                />
                <Text>User Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeUname}
                    value={user_name}
                />
                <Text>Password</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePwd}
                    value={passwd}
                    secureTextEntry // เพิ่มความปลอดภัยให้กับรหัสผ่าน
                />
                <Text>==============================================</Text>
                <Button
                    title="Insert Data"
                    onPress={() => {
                        fetch('http://192.168.56.1/mobileapp/insertdb.php?user_id=' + user_id + '&user_name=' + user_name + '&passwd=' + passwd)
                            .then((response) => response.json())
                            .then((json) => {
                                console.log('Response JSON:', json);
                                if (json.status === 'success') {
                                    setData(json);
                                    Alert.alert('Success', json.message);
                                } else {
                                    Alert.alert('Error', json.message);
                                }
                            })
                            .catch((error) => console.error('Error:', error))
                            .finally(() => setLoading(false));
                    }}
                />
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    innerContainer: {
        padding: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // ทำให้พื้นหลังโปร่งใส
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        borderColor: '#A3C1DA',
        padding: 10,
        color: '#4A90E2',
    },
});
