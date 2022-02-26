import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AuthRoutes } from './auth.routes'
import { TabRoutes } from './tab.routes'

import { AuthContext } from '../context/AuthContext'
import { LoadAnimated } from '../components/LoadAnimated/LoadAnimated'


export function Routes() {

    const { user, loading } = useContext(AuthContext)


    if (loading) {
        return (
            <LoadAnimated />
        )
    }

    return (



        <NavigationContainer>

            {user ? <TabRoutes /> : <AuthRoutes />}

        </NavigationContainer>

    )
}