import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../context/GlobalState';

export default function AccountScreen() {
    const { isLoggedIn, theme } = useContext(GlobalContext);
    const navigation = useNavigation();


    const dynamicStyles = styles(theme);

    return (
        <View style={dynamicStyles.container}>
            {!isLoggedIn ? (
                <View style={dynamicStyles.centeredContainer}>
                    <Image source={require("../assets/fruits.png")} style={{height: 125, width: 125}}/>
                    <TouchableOpacity 
                        style={dynamicStyles.button} 
                        onPress={() => navigation.navigate('Login')}
                    >
                        <Text style={dynamicStyles.buttonText}>LOG IN</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={dynamicStyles.button} 
                        onPress={() => navigation.navigate('Create Account')}
                    >
                        <Text style={dynamicStyles.buttonText}>CREATE ACCOUNT</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <Text style={dynamicStyles.text}>Logged in.</Text>
            )}
        </View>
    );
}


const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 17,
        paddingVertical: 35,
        width: '100%',
        backgroundColor: theme === 'dark' ? '#333' : '#fff', 
    },
    centeredContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 130,
        width: '100%',
    },
    button: {
        marginTop: 20,
        backgroundColor: theme === 'dark' ? '#556' : '#4cbc80', 
        paddingVertical: 16,
        borderRadius: 14,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: theme === 'dark' ? '#ddd' : 'white', 
        fontWeight: 'bold',
        fontSize: 18,
    },
    text: {
        fontSize: 18,
        fontWeight: 'light',
        paddingLeft: 10,
        color: theme === 'dark' ? '#ddd' : 'black', 
    },
});
