import React, {useState} from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CustomInput from "../../components/CustomInput";
import CustomButton from "../../components/CustomButton";
import SocialSignInButtons from "../../components/SocialSignInButtons";
import { useNavigation } from "@react-navigation/native";
import supabase from '../../components/supabaseClient';

const ConfirmEmailScreen = () => {
    const [code, setCode] = useState('');
    const navigation = useNavigation();

    const onConfirmPressed = async () => {
        const { error } = await supabase.auth.verifyUser('email', code);

        if (error) {
            alert(error.message);
        } else {
            alert("Email verification successful");
            navigation.navigate('Home');
        }
    };

    const onSignInPress = () => {
        navigation.navigate('SignIn');
    };
    const onResentPress = async () => {
        const { error } = await supabase.auth.resendConfirmation(email);
        if (error) {
            alert(error.message);
        } else {
            alert("Confirmation code has been resent. Please check your email");
        }
    };


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.root}>
            <Text style={styles.title}>Confirm your email</Text>

            <CustomInput placeholder="Enter your confirmation code" value={code} setValue={setCode} />

            <CustomButton text="Confirm" onPress={onConfirmPressed} />

            <CustomButton text="Resend code" onPress={onResentPress} type="SECONDARY" />
            <CustomButton text="Back to Sign in" onPress={onSignInPress} type="TERTIARY" />
        </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: "center",
        padding: 20,
    },
    title : {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#051C60',
        margin: 10,
    },
    text : {
        color : 'gray',
        marginVertical : 10,
    },
    link : {
        color : '#FDB075',
    },
});

export default ConfirmEmailScreen;