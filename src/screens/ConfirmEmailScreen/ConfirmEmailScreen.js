import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import { useNavigation } from "@react-navigation/native";
import supabase from '../../components/supabaseClient';

const ConfirmEmailScreen = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const navigation = useNavigation();

    const onConfirmPressed = async () => {
        const { data, error } = await supabase.auth.verifyOtp({
            email: email,
            token: code,
            type: 'signup'
        });
        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "Email verification successful");
            navigation.navigate('Home');
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onResentPress = async () => {
        const { error } = await supabase.auth.resend({
            email: email,
            type: 'signup'
        });
        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "Confirmation code has been resent. Please check your email");
        }
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Confirm your email</Text>

                <CustomInput placeholder="Enter your email" value={email} setValue={setEmail} />
                <CustomInput placeholder="Enter your confirmation code" value={code} setValue={setCode} />

                <CustomButton text="Confirm" onPress={onConfirmPressed} />
                <CustomButton text="Resend code" onPress={onResentPress} type="SECONDARY" />
                <CustomButton text="Back to Sign in" onPress={onSignInPress} type="TERTIARY" />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text: {
        color: 'gray',
        marginVertical: 10,
    },
    link: {
        color: '#FDB075',
    },
});

export default ConfirmEmailScreen;
