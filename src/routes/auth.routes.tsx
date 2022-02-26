import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Login } from '../screens/Login/Login'
import { SignUp } from '../screens/SignUp/SignUp'
import { SignUpPassword } from '../screens/SignUpPassword/SignUpPassword'
import { Comfirmation } from '../screens/Comfirmation/Comfirmation'
import { Splash } from '../screens/Splash/Splash'



const { Navigator, Screen } = createNativeStackNavigator()


export function AuthRoutes() {
    return (
        <Navigator initialRouteName='Splash'
            screenOptions={{
                headerShown: false
            }} >

            <Screen
                name="Login"
                component={Login}
            />

            <Screen
                name="Splash"
                component={Splash}
                options={{
                    gestureEnabled: false
                }}
            />

            <Screen
                name="SignUp"
                component={SignUp}
            />
            <Screen
                name="SignUpPassword"
                component={SignUpPassword}
            />
            <Screen
                name="Comfirmation"
                component={Comfirmation}
            />
        </Navigator>
    )
}