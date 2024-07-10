import React, { useState, useCallback, useEffect } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView, Alert, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from "../../../assets/images/pets.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import supabase from '../../components/supabaseClient';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isRememberMe, setIsRememberMe] = useState(false);

    const navigation = useNavigation();
    const { height } = useWindowDimensions();

    const onSignInPressed = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: username,
            password: password,
        });
        if (error) {
            Alert.alert("Error", error.message);
        } else if (data.user && data.user.email_confirmed_at) {
            if (isRememberMe) {
                await AsyncStorage.setItem('user', JSON.stringify(data.user));
            } else {
                await AsyncStorage.removeItem('user'); // Clear user data when "Remember me" is not selected
            }
            navigation.navigate('Home');
        } else if (data.user && !data.user.email_confirmed_at) {
            Alert.alert("Email not verified", "Please verify your email before signing in.");
        } else {
            Alert.alert("Check your email", "Check your email for further instructions.");
        }
    };

    const onForgotPasswordPressed = () => {
        navigation.navigate('ForgotPassword');
    };

    const onSignUpPress = () => {
        navigation.navigate('SignUp');
    };

    // Clear input fields
    useFocusEffect(
        useCallback(() => {
            setUsername('');
            setPassword('');
        }, [])
    );

    useEffect(() => {
        const checkRememberedUser = async () => {
            const user = await AsyncStorage.getItem('user');
            if (user) {
                navigation.navigate('Home');
            }
        }
        checkRememberedUser();
    }, []);

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

                <CustomInput placeholder="Username" value={username} setValue={setUsername} />
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: 20 }}>
                    <Text>Remember me</Text>
                    <Switch value={isRememberMe} onValueChange={setIsRememberMe} />
                </View>

                <CustomButton text="Sign In" onPress={onSignInPressed} />
                <CustomButton text="Forgot Password?" onPress={onForgotPasswordPressed} type="TERTIARY" />

                <SocialSignInButtons />

                <CustomButton text="Don't have an account? Create one" onPress={onSignUpPress} type="TERTIARY" />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
    },
    logo: {
        width: '70%',
        maxWidth: 300,
        maxHeight: 200,
    },
});

export default SignInScreen;
