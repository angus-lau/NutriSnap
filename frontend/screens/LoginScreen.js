import { useState, useEffect, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../context/GlobalState';

export default function LogIn() {
    const navigation = useNavigation();
    const { setLogIn, theme, isLoggedIn } = useContext(GlobalContext);

    const [showPassword, setShowPassword] = useState(false);
    const [info, setInfo] = useState({ email: '', password: '' });
    const [validation, setValidation] = useState({ isEmailValid: true, isPasswordValid: true });

    const isFormValid = validation.isEmailValid && validation.isPasswordValid;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const handleLogin = () => {
        setLogIn(true);
        navigation.navigate('Tabs');
    };

    const validateEmail = (email) => {
        setValidation(prev => ({ ...prev, isEmailValid: emailRegex.test(email) }));
    };

    const validatePassword = (password) => {
        setValidation(prev => ({ ...prev, isPasswordValid: password.length >= 7 }));
    };

    useEffect(() => {
        validateEmail(info.email);
        validatePassword(info.password);
    }, [info.email, info.password]);

    const dynamicStyles = getStyles(theme);

    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>Calorie Tracker</Text>
            <Text style={dynamicStyles.signUpText}>Sign In</Text>
            <Text style={dynamicStyles.text}>Email</Text>
            <TextInput
                style={dynamicStyles.emailInput}
                placeholder="Email"
                placeholderTextColor="#aaa"
                value={info.email}
                onChangeText={(text) => 
                    setInfo({ ...info, email: text }
                )}
                onEndEditing={() => validateEmail(info.email)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={dynamicStyles.text}>Password</Text>
            <View style={dynamicStyles.passwordInputWrapper}>
                <TextInput
                    style={dynamicStyles.passwordInput}
                    placeholder="Password"
                    placeholderTextColor="#aaa"
                    value={info.password}
                    onChangeText={(text) => setInfo({ ...info, password: text })}
                    onEndEditing={() => validatePassword(info.password)}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                    onPress={() => setShowPassword(!showPassword)}
                    style={dynamicStyles.toggleButton}
                >
                    <Text style={dynamicStyles.passwordText}>
                        {showPassword ? 'Hide' : 'Show'}
                    </Text>
                </TouchableOpacity>
            </View>
    
            <TouchableOpacity  
                style={[dynamicStyles.loginButton, !isFormValid && dynamicStyles.disabledButton]} 
                onPress={handleLogin}
                disabled={!isFormValid}
            >
                <Text style={dynamicStyles.loginButtonText}>LOG IN</Text>
            </TouchableOpacity>
        </View>
    );
}

const getStyles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === 'dark' ? '#333' : '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
        padding: 20,
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        color: theme === 'dark' ? '#ddd' : '#333',
        alignSelf: 'flex-start',
        paddingBottom: 6,
        paddingLeft: 8,
    },
    emailInput: {
        width: '100%',
        borderRadius: 15,
        padding: 16,
        marginBottom: 20,
        backgroundColor: theme === 'dark' ? '#555' : '#eee',
        color: theme === 'dark' ? '#fff' : '#333',
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        marginBottom: 20,
        width: '100%',
        backgroundColor: theme === 'dark' ? '#555' : '#eee',
    },
    passwordInput: {
        flex: 1,
        padding: 16,
        color: theme === 'dark' ? '#fff' : '#333',
    },
    toggleButton: {
        padding: 16,
    },
    loginButton: {
        width: '100%',
        padding: 14,
        alignItems: 'center',
        marginBottom: 10,
        backgroundColor: theme === 'dark' ? '#556' : '#888',
        borderRadius: 14,
    },
    loginButtonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme === 'dark' ? '#ddd' : '#fff',
    },
    disabledButton: {
        backgroundColor: '#a9a9a9',
    },
    passwordText: {
        fontSize: 12,
        color: theme === 'dark' ? '#ddd' : '#333',
    },
    signUpText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 50,
        color: theme === 'dark' ? '#ddd' : '#333',
    },
    title: {
        fontSize: 30,
        paddingBottom: 40,
        fontWeight: 'bold',
        color: theme === 'dark' ? '#4cbc80' : '#008000',
    },
});

