import React from 'react';

import {
    View
} from 'react-native';

import LottieView from 'lottie-react-native'

import LoadCar from '../../assets/animation.json'

export function LoadAnimated() {
    return (
        <View style={styles.container}>
            <LottieView
                source={LoadCar}
                autoPlay={true}
                style={{ height: 200 }}
                resizeMode='contain'
                loop
            />
        </View>
    );
}

import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});