import React from "react";
import { View, Image } from "react-native";
import { Header, Icon } from 'react-native-elements';
import { useNavigation } from "@react-navigation/native";


import logo from "../../../assets/images/ResQme.png";

const AppHeader = () => {
    const navigation = useNavigation();

    const onBarsPressed = () => {
       navigation.navigate('Setting');

    };
    const onHomePressed = () => {
        navigation.navigate('Home');
    };

    const onFavoritePressed = () => {
        navigation.navigate('Favorite');
    };

    const onNotificationPressed = () => {
        navigation.navigate('Notification');
    };

    const onMyPetsPressed = () => {
        navigation.navigate('MyPets');
    };

    return (
            <View>
                <Header
                    placement="left"
                    leftComponent={<Image source={logo} style={{ width: 145, height: 55, marginBottom: -12 }} />}
                    rightComponent={
                        <Icon name="paw" type="font-awesome" color="#fff" style={{ marginRight: 10 }}onPress={onMyPetsPressed} />
                    }
                    backgroundColor='skyblue'
                    containerStyle={{ marginBottom: -13 }}
                />
            <Header
                placement="left"
                leftComponent={
                    <View style={{ flexDirection: 'row', marginTop: -13 }}>
                        <Icon name="home" type="font-awesome" color="#fff" iconStyle={{ marginRight: 90 }} onPress={onHomePressed} />
                        <Icon name="heart" type="font-awesome" color="#fff" iconStyle={{ marginRight: 90 }} onPress={onFavoritePressed} />
                        <Icon name="bell" type="font-awesome" color="#fff" iconStyle={{ marginRight: 90 }} onPress={onNotificationPressed}/>
                        <Icon name="bars" type="font-awesome" color="#fff" onPress={onBarsPressed} />
                    </View>
                }
                backgroundColor='skyblue'
                containerStyle={{ marginBottom: 10 }}
            />
        </View>
    );
};

export default AppHeader;