import React from "react";
import { View, Text } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import NewPasswordScreen from "../screens/NewPasswordScreen";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import NotificationScreen from "../screens/NotificationScreen";
import PetDetailScreen from "../screens/PetDetailScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Favorite" component={FavoriteScreen}/>
                <Stack.Screen name="Notification" component={NotificationScreen}/>
                <Stack.Screen name="PetDetail" component={PetDetailScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;