import React, { useState } from 'react';
import { View, ScrollView, Text, StyleSheet, Switch, TouchableOpacity, Alert, Modal, Pressable } from "react-native";
import AppHeader from "../../components/AppHeader";
import AppFooter from "../../components/AppFooter";
import { useNavigation } from "@react-navigation/native";
import supabase from '../../components/supabaseClient';

const SettingScreen = () => {
    const navigation = useNavigation();
    const [modalVisible, setModalVisible] = useState(false);

    const onLogOutPress = () => {
        navigation.navigate('SignIn');
    };

    const onChangePasswordPress = () => {
        navigation.navigate('ForgotPassword');
    };

    const onTermsOfUsePressed = () => {
        navigation.navigate('Terms');
    };

    const onPrivacyPolicyPressed = () => {
        navigation.navigate('Privacy');
    };

    const onSupportPressed = () => {
        navigation.navigate('Support');
    };

    const onDeleteAccountPress = async () => {
        setModalVisible(true);
    };

    const handleDeleteAccount = async () => {
        const user = supabase.auth.user;

        const { error } = await supabase.auth.api.deleteUser(user.id);

        if (error) {
            Alert.alert("Error", error.message);
        } else {
            Alert.alert("Success", "Account deleted successfully");
            navigation.navigate('SignIn');
        }
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

                <TouchableOpacity style={styles.settingItem} onPress={onPrivacyPolicyPressed}>
                    <Text style={styles.settingText}>Privacy Policy</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={onTermsOfUsePressed}>
                    <Text style={styles.settingText}>Terms of Service</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.settingItem} onPress={onSupportPressed}>
                    <Text style={styles.settingText}>Help & Support</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.logoutButton} onPress={onLogOutPress}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={onDeleteAccountPress}>
                    <Text style={styles.deleteButtonText}>Delete Account</Text>
                </TouchableOpacity>

            </ScrollView>
            <AppFooter />

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Do you want to delete your account? It has permanent consequences.</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => {
                                handleDeleteAccount();
                                setModalVisible(!modalVisible);
                            }}
                        >
                            <Text style={styles.textStyle}>Yes</Text>
                        </Pressable>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>No</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
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
    deleteButton: {
        marginTop: 20,
        backgroundColor: "#ff4d4d",
        paddingVertical: 15,
        alignItems: "center",
        borderRadius: 5,
    },
    deleteButtonText: {
        color: "#fff",
        fontSize: 18,
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonClose: {
        backgroundColor: "#2196F3",
        margin: 10,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default SettingScreen;