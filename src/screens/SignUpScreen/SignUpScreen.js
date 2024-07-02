import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import supabase from '../../components/supabaseClient';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const navigation = useNavigation();

    const onRegisterPressed = async () => {
        if (password !== passwordRepeat) {
            alert("Passwords do not match");
            return;
        }

        const { user, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            alert(error.message);
        } else {
            alert("Registration successful, please check your email for verification instructions");
            navigation.navigate('ConfirmEmail', { email });
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };

    const onTermsOfUsePressed = () => {
        navigation.navigate('Terms');
    };

    const onPrivacyPolicyPressed = () => {
        navigation.navigate('Privacy');
    };

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>
                <Text style={styles.title}>Create an account</Text>

                <CustomInput placeholder="Username" value={username} setValue={setUsername} />
                <CustomInput placeholder="Email" value={email} setValue={setEmail} />
                <CustomInput placeholder="Password" value={password} setValue={setPassword} secureTextEntry />
                <CustomInput placeholder="Repeat Password" value={passwordRepeat} setValue={setPasswordRepeat} secureTextEntry />

                <CustomButton text="Register" onPress={onRegisterPressed} />
                <Text style={styles.text}>
                    By registering, you confirm that you accept our{' '}
                    <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of Service</Text> and{' '}
                    <Text style={styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
                </Text>

                <SocialSignInButtons />

                <CustomButton text="Have an account? Sign in" onPress={onSignInPress} type="TERTIARY" />
            </View>
        </ScrollView>
    );
}

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

export default SignUpScreen;