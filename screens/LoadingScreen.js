import React from 'react';

import {View, Image, Text, Animated, StyleSheet} from 'react-native';

import styled from 'styled-components';
import { LinearGradient } from "expo-linear-gradient";

import Logo from '../assets/images/whatsapp.png';


const styles = StyleSheet.create({
    stretch: {
      width: 100,
      height: 100,
      resizeMode: 'stretch'
    }
  });
  

const Container = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
`;

const Texto = styled.Text`
    font-size: 25px;
    color: white;
    margin-top: 40px;
`;


class LoadingScreen extends React.Component {

    state = {
        LogoAnime: new Animated.Value(0),
        LogoText: new Animated.Value(0),
    }

    componentDidMount(){

        const { LogoAnime, LogoText } = this.state;

        Animated.parallel([
            Animated.spring(LogoAnime, {
                toValue: 1,
                tension: 10,
                friction: 2,
                duration: 1000,
            }).start(),

            Animated.timing(LogoText, {
                toValue: 1,
                duration: 1200,
            }),
        ]).start()
    }
    
    render(){   

        return (
            <LinearGradient colors={['#1D2671', '#C33764']}>
                <Container>
                    <Animated.View style={{
                        opacity: this.state.LogoAnime,
                        top: this.state.LogoAnime.interpolate({
                            inputRange: [0, 1],
                            outputRange: [80, 0]
                        })
                    }}>
                            <Image
                                style={styles.stretch}
                                source={Logo}
                            />
                    </Animated.View> 

                    <Animated.View style={{
                        opacity: this.state.LogoText,
                        top: this.state.LogoText.interpolate({
                            inputRange: [0, 1],
                            outputRange: [80, 0]
                        })
                    }}>
                        <Texto>
                            Just Chatting
                        </Texto>
                    </Animated.View> 
                </Container>
            </LinearGradient>
        )
    }
}

export default LoadingScreen;