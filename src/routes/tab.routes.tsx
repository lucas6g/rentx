import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import { Feather } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'

import { Platform } from 'react-native'
import { useTheme } from 'styled-components'
import { RentalRoutes } from './rental.routes'
import { Appointements } from '../screens/Appointements/Appointements'

import { ProfileRoutes } from './profile.routes'


const { Navigator, Screen } = createBottomTabNavigator()

export function TabRoutes() {
    const theme = useTheme()

    return (
        <Navigator
            initialRouteName='Rental'
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.main,
                tabBarInactiveTintColor: theme.colors.text,
                tabBarShowLabel: false,
                tabBarHideOnKeyboard: true,
                tabBarStyle: {
                    height: 79,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    backgroundColor: theme.colors.background_gray

                }

            }}
        >
            <Screen
                name="Rental"
                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Feather
                                name="home"
                                size={size}
                                color={color}
                            />

                        )
                    }
                }}
                component={RentalRoutes}
            />
            <Screen

                name="MyRentals"
                options={{

                    tabBarIcon: ({ size, color }) => {
                        return (
                            <AntDesign
                                name="car"
                                size={size}
                                color={color} />

                        )
                    }
                }}
                component={Appointements}
            />
            <Screen
                name="ProfileRoutes"

                options={{
                    tabBarIcon: ({ size, color }) => {
                        return (
                            <Feather
                                name="user"
                                size={size}
                                color={color}
                            />

                        )
                    }
                }}
                component={ProfileRoutes}
            />
        </Navigator>
    )
}