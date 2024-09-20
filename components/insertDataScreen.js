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
            source={require('../assets/topVector.png')} 
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
                    secureTextEntry 
                />
                <Button
                    title="Insert Data"
                    onPress={() => {
                        fetch('http://172.21.12.212/mobileapp/insertdb.php?user_id=' + user_id + '&user_name=' + user_name + '&passwd=' + passwd)
                            .then((response) => response.json())
                            .then((json) => {
                                setData(json);
                                onChangeUid('');
                                onChangeUname('');
                                onChangePwd('');
                                console.log('Response JSON:', json);
                                if (json.status === 'success') {
                                    setData(json);
                                    Alert.alert('Success', json.message);
                                } 
                            })     
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
        backgroundColor: 'rgba(255, 255, 255, 0.8)', 
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
