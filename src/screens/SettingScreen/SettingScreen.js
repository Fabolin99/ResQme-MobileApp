import React, {useState} from 'react';
import { View, ScrollView, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import {useNavigation} from "@react-navigation/native";


const SettingScreen = () => {
    const navigation = useNavigation();

    const onLogOutPress = () => {
        navigation.navigate('SignIn');
    };

    const onChangePasswordPress = () => {
            navigation.navigate('ForgotPassword');
        };

    return (
        <View style={styles.container}>
            <AppHeader />
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.heading}>Settings</Text>

                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Notifications</Text>
                    <Switch />
                </View>

                <View style={styles.settingItem}>
                    <Text style={styles.settingText}>Dark Mode</Text>
                    <Switch />
                </View>

                <TouchableOpacity style={styles.settingItem} onPress={onChangePasswordPress}>
                    <Text style={styles.settingText}>Change Password</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <Text style={styles.settingText}>Privacy Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <Text style={styles.settingText}>Terms of Service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem}>
                    <Text style={styles.settingText}>Help & Support</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={onLogOutPress}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
            <AppFooter />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f9f9f9",
    },
    scrollContainer: {
        padding: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    settingItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#ddd",
    },
    settingText: {
        fontSize: 18,
    },
    logoutButton: {
        marginTop: 30,
        backgroundColor: "#ff4d4d",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 5,
    },
    logoutButtonText: {
        color: "#fff",
        fontSize: 18,
    },
});

export default SettingScreen;