import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from '../screens/Home/Home'
import { CarDetails } from '../screens/CarDetails/CarDetails'
import { RentDetails } from '../screens/RentDetails/RentDetails'
import { Scheduling } from '../screens/Scheduling/Scheduling'
import { Comfirmation } from '../screens/Comfirmation/Comfirmation'


import { getFocusedRouteNameFromRoute } from '@react-navigation/native';


const { Navigator, Screen } = createNativeStackNavigator()

export function RentalRoutes({ navigation, route }) {
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
            initialRouteName='Home'
            screenOptions={{
                headerShown: false
            }}
        >



            <Screen
                name="Home"
                component={Home}
            />

            <Screen

                name="CarDetails"
                component={CarDetails}
            />
            <Screen

                name="Scheduling"
                component={Scheduling}
            />
            <Screen

                name="RentDetails"
                component={RentDetails}
            />
            <Screen

                name="Comfirmation"
                component={Comfirmation}
            />



        </Navigator>
    )
}