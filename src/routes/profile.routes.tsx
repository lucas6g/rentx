import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Comfirmation } from '../screens/Comfirmation/Comfirmation'
import { Profile } from '../screens/Profile/Profile'

import { getFocusedRouteNameFromRoute } from '@react-navigation/native';



const { Navigator, Screen } = createNativeStackNavigator()

export function ProfileRoutes({ navigation, route }) {

    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === "Comfirmation") {
            navigation.setOptions({ tabBarStyle: { display: 'none' } });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex', height: 79 } });
        }
    }, [navigation, route]);


    return (
        <Navigator
            initialRouteName='Profile'
            screenOptions={{
                headerShown: false,

            }}
        >



            <Screen

                name="Comfirmation"
                component={Comfirmation}
            />


            <Screen

                name="Profile"
                component={Profile}
            />



        </Navigator>
    )
}