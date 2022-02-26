import { useNavigation } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import { StatusBar } from 'react-native';

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolate,
    Extrapolate,
    runOnJS


} from 'react-native-reanimated'
import { useTheme } from 'styled-components';


import BrandSvg from '../../assets/brand.svg'
import LogoSvg from '../../assets/logo.svg'
import { AuthContext } from '../../context/AuthContext';





import { Container } from './SplashStyles';

export function Splash() {

    const { user } = useContext(AuthContext)

    const theme = useTheme()

    const splashAnimation = useSharedValue(0)
    useEffect(() => {
        splashAnimation.value = withTiming(50, {
            duration: 1000
        }, () => {
            'worklet' //muda a trade da funcao 
            runOnJS(startApp)()
        })
    }, [])


    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value,
                [0, 25, 50],
                [1, 0.3, 0] //valor da opacidade
            ),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [0, -50],//valor do translate 
                        Extrapolate.CLAMP

                    ),
                }
            ]

        }
    })
    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(splashAnimation.value,
                [0, 25, 50],
                [0, 0.3, 1]
            ),
            transform: [
                {
                    translateX: interpolate(splashAnimation.value,
                        [0, 50],
                        [-50, 0],//valor do translate 
                        Extrapolate.CLAMP

                    ),
                }
            ]

        }
    })
    const navigation = useNavigation()

    async function startApp() {
        const routeName: string = user ? 'Home' : 'Login'

        navigation.navigate(routeName as never)
    }



    return (
        <Container>
            <StatusBar backgroundColor={theme.colors.header} barStyle='light-content' />
            <Animated.View style={[brandStyle, { position: 'absolute' }]} >
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyle, { position: 'absolute' }]}>
                <LogoSvg width={180} height={20} />

            </Animated.View>


        </Container>
    );
}



