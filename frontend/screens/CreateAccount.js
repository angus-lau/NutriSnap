import { useState, useEffect, useContext } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { GlobalContext } from '../context/GlobalState';

export default function CreateAccount() {
    const navigation = useNavigation(); 
    const [showPassword, setShowPassword] = useState(false);
    const { setLogIn} = useContext(GlobalContext);
    const { theme } = useContext(GlobalContext);

    const dynamicStyles = styles(theme);

    const [info, setInfo] = useState({
        email: '',
        password: '',
    });

    const [validation, setValidation] = useState({
        isEmailValid: true,
        isPasswordValid: true
    });

    const isFormValid = validation.isEmailValid && validation.isPasswordValid;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    const handleSignUp = () => {
        setInfo({email: '', password: ''});
        navigation.navigate("Get Info");    
    };  
    
    const validateEmail = (email) => {
        setValidation((prev) => ({ ...prev, isEmailValid: emailRegex.test(email) }));
    };

     const validatePassword = (password) => {
        setValidation((prev) => ({ ...prev, isPasswordValid: password.length >= 7 }));
    };

    const handleTogglePassword = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleInputChange = (name, value) => {
        setInfo(prev => ({ ...prev, [name]: value }));

        if (name === 'email') {
            validateEmail(value);
        }

        if (name === 'password' || name === 'confirmPassword') {
            validatePassword(value, name);
        }
    };

    useEffect(() => {
        validateEmail(info.email);
        validatePassword(info.password);
    }, [info.email, info.password]);

    return (
        <View style={dynamicStyles.container}>
            <Text style={dynamicStyles.title}>Calorie Tracker</Text>
            <Text style={dynamicStyles.signUpText}>Sign Up</Text>
            <Text style={dynamicStyles.text}>Email</Text>
            <TextInput
                style={dynamicStyles.emailInput}
                placeholder="Email"
                value={info.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <Text style={dynamicStyles.text}>Password</Text>
            <View style={dynamicStyles.passwordInputWrapper}>
                <TextInput
                    style={dynamicStyles.passwordInput}
                    placeholder="Password"
                    value={info.password}
                    onChangeText={(value) => handleInputChange('password', value)}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity 
                    onPress={handleTogglePassword}
                    style={dynamicStyles.toggleButton}
                >
                    <Text style={[styles.passwordText, theme === 'dark' ? styles.textDark : styles.textLight]}>
                        {showPassword ? 'Hide' : 'Show'}
                    </Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity  
                style={[dynamicStyles.loginButton, !isFormValid && dynamicStyles.disabledButton]} 
                onPress={handleSignUp}
                disabled={!isFormValid}
            >
                <Text style={dynamicStyles.buttonText}>CONTINUE</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = (theme) => StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme === 'dark' ? '#333' : 'white',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 50,
        padding: 20,
    },
    title: {
        fontSize: 30,
        paddingBottom: 40,
        fontWeight: 'bold',
        color: '#4cbc80',
    },
    signUpText: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 50,
        color: theme === 'dark' ? '#ddd' : '#000',
    },
    text: {
        fontSize: 16,
        fontWeight: '600',
        alignSelf: 'flex-start',
        paddingBottom: 6,
        paddingLeft: 8,
        color: theme === 'dark' ? '#fff' : '#000',
    },
    emailInput: {
        width: '100%',
        borderRadius: 15,
        padding: 16,
        marginBottom: 20,
        backgroundColor: theme === 'dark' ? '#555' : '#d3d3d3',
    },
    passwordInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 14,
        marginBottom: 20,
        width: '100%',
        backgroundColor: theme === 'dark' ? '#555' : '#d3d3d3',
    },
    passwordInput: {
        flex: 1,
        padding: 16,
    },
    toggleButton: {
        padding: 16,
    },
    passwordText: {
        fontSize: 12,
        color: theme === 'dark' ? '#fff' : '#222222',
    },
    loginButton: {
        backgroundColor: theme === 'dark' ? '#556' : '#4cbc80',
        borderRadius: 14,
        width: '100%',
        padding: 14,
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: theme === 'dark' ? '#fff' : '#000',
    },
    disabledButton: {
        backgroundColor: '#a9a9a9',
    },
});
