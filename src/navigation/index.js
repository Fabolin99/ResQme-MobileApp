import React, { useState } from "react";
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
import SettingScreen from "../screens/SettingScreen";
import PetScreen from "../screens/PetScreen";
import PostPetScreen from "../screens/PostPetScreen";
import TermsOfServiceScreen from "../screens/TermsOfServiceScreen";
import PrivacyTermsScreen from "../screens/PrivacyTermsScreen";
import SupportScreen from "../screens/SupportScreen";

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const [favoritePets, setFavoritePets] = useState([]);

    const handleToggleFavorite = (pet) => {
        if (favoritePets.some(favoritePet => favoritePet.name === pet.name)) {
            setFavoritePets(favoritePets.filter(favoritePet => favoritePet.name !== pet.name));
        } else {
            setFavoritePets([...favoritePets, pet]);
        }
    };
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="SignIn" component={SignInScreen}/>
                <Stack.Screen name="SignUp" component={SignUpScreen}/>
                <Stack.Screen name="ConfirmEmail" component={ConfirmEmailScreen}/>
                <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                <Stack.Screen name="NewPassword" component={NewPasswordScreen}/>
                <Stack.Screen name="Home" component={HomeScreen}/>
                <Stack.Screen name="Favorite">
                    {props => <FavoriteScreen {...props} favoritePets={favoritePets} />}
                </Stack.Screen>
                <Stack.Screen name="Notification" component={NotificationScreen}/>
                <Stack.Screen name="PetDetail" component={PetDetailScreen} />
                <Stack.Screen name="Setting" component={SettingScreen} />
                <Stack.Screen name="Post" component={PostPetScreen} />
                <Stack.Screen name="Terms" component={TermsOfServiceScreen} />
                <Stack.Screen name="Privacy" component={PrivacyTermsScreen} />
                <Stack.Screen name="Support" component={SupportScreen} />
                <Stack.Screen name="Pet">
                    {props => <PetScreen {...props} favoritePets={favoritePets} onToggleFavorite={handleToggleFavorite} />}
                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;