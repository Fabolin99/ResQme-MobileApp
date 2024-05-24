import React from "react";
import { View, Text, Image } from 'react-native'
import CustomButton from "../CustomButton";
import FacebookLogo from "../../../assets/images/Facebook.png";
import GoogleLogo from "../../../assets/images/Google.png";
import AppleLogo from "../../../assets/images/Apple.png";

const SocialSignInButtons = () => {
    const onSignInFacebook = () => {
        console.warn('Facebook');
    };
    const onSignInGoogle = () => {
        console.warn('Google');
    };
    const onSignInApple = () => {
        console.warn('Apple');
    };
    return (
    <>
<CustomButton text="Sign In with Facebook" onPress={onSignInFacebook} bgColor="#E7EAF4" fgColor="#4765A9" icon={<Image source={FacebookLogo} style={{width: 20, height: 20}} />} />
        <CustomButton text="Sign In with Google" onPress={onSignInGoogle} bgColor="#FAE9EA" fgColor="#DD4D44" icon={<Image source={GoogleLogo} style={{width: 20, height: 20 }} />} />
        <CustomButton text="Sign In with Apple" onPress={onSignInApple} bgColor="#e3e3e3" fgColor="#363636"icon={<Image source={AppleLogo} style={{width: 20, height: 20 }} />} />
    </>
    );
};

export default SocialSignInButtons