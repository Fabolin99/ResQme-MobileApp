import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, useWindowDimensions, ScrollView, Alert } from 'react-native';
import Logo from "../../../assets/images/pets.png";
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import supabase from '../../components/supabaseClient';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Image source={Logo} style={[styles.logo, { height: height * 0.3 }]} resizeMode="contain" />

                <CustomInput placeholder="Username" value={username} setValue={setUsername} />
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />

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
