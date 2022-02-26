import { StatusBar } from 'react-native'
import React, { useEffect, useState } from 'react'

import { CarList, Container, Header, TotalCars } from './HomeStyles'
import { useTheme } from 'styled-components'
import Logo from '../../assets/logo.svg'
import { RFValue } from "react-native-responsive-fontsize";

import { Card } from '../../components/Card/Card'
import { useNavigation } from '@react-navigation/native'
import { api } from '../../services/api'

import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync'

import { database } from '../../database'
import { Car as CarModel } from '../../database/model/Car'

import CarSvg from '../../assets/float.svg'
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';

import { RectButton, PanGestureHandler } from 'react-native-gesture-handler'
const ButtonAnimated = Animated.createAnimatedComponent(RectButton)


export interface Car {
    id: string
    carName: string
    brand: string
    period: string
    rentPrice: number
    thumbNail: string
    fuelType: 'gasoline_motor' | 'electric_motor' | 'hybrid_motor'
    formatedRentPrice: string

    about: string
    photos: {
        id: string
        photo: string
    }[]


    accessories: {
        type: 'gasoline_motor' | 'electric_motor' | 'hybrid_motor'
        name: string
    }[]


}

export function Home() {



    const positionY = useSharedValue(0)
    const positionX = useSharedValue(0)


    const netInfo = useNetInfo()


    const [cars, setCars] = useState<CarModel[]>([])
    const [loading, setLoading] = useState(false)


    const navigation = useNavigation()
    const theme = useTheme()

    const floatButtonStyles = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: positionX.value,
            }, {
                translateY: positionY.value

            }]
        }
    })


    async function offLineSyncronize() {
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => { //mudanças do backend que vem pro front pega as att do back mundaças da api

                //atualiza minha lista de carros local com a do backend

                const response = await api.get(`/cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`)

                const { changes, latestVersion: lastChangesTimestamp } = response.data


                return { changes, timestamp: lastChangesTimestamp }


            },

            async pushChanges({ changes }) { // mundanças do banco do front que vao para o back
                const { updated } = changes.users

                if (updated.length > 0) {
                    const updatedUserData = changes.users
                    await api.post('/users/sync', updatedUserData)

                }

            }


        })
    }

    useEffect(() => {
        if (netInfo.isConnected === true) {
            offLineSyncronize()
        }
    }, [netInfo.isConnected])



    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.positionX = positionX.value
            ctx.positionY = positionY.value
        },
        onActive(event, ctx) {
            positionX.value = ctx.positionX + event.translationX
            positionY.value = ctx.positionY + event.translationY

        },
        onEnd(event, ctx) {

            positionX.value = withSpring(0)
            positionY.value = withSpring(0)
        }
    })



    useEffect(() => {

        let mounted = true

        async function loadCars() {
            try {

                if (mounted) {

                    setLoading(true)

                }


                const carCollection = database.get<CarModel>('cars')

                const cars = await carCollection.query().fetch()


                if (mounted) {
                    setCars(cars)

                }


            } catch (error) {

            } finally {
                if (mounted) {
                    setLoading(false)

                }
            }

        }



        loadCars()

        return () => {
            mounted = false
        }
    }, [])





    return (
        <Container>
            <StatusBar backgroundColor={theme.colors.header} barStyle='light-content' />
            <Header >
                <Logo
                    height={RFValue(12)}
                    width={RFValue(113)}

                />

                {!loading && <TotalCars>Total de {cars.length} Carros</TotalCars>}





            </Header>


            {loading ? <LoadAnimated /> : <CarList<React.ElementType>

                data={cars}
                contentContainerStyle={{ padding: 16 }}

                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                    return (
                        <Card
                            carName={item.name}
                            brand={item.brand}
                            period={item.period}
                            rentPrice={netInfo.isConnected === true ? item.price : '...'}
                            thumbNail={item.thumbnail}
                            fuelType={item.fuel_type}
                            onPress={() => {
                                navigation.navigate('CarDetails' as never, {
                                    car: item
                                } as never)

                            }}


                        />
                    )
                }}

            />}

            <PanGestureHandler onGestureEvent={onGestureEvent}>


                <Animated.View style={[floatButtonStyles, { position: 'absolute', top: 13, right: 22 }]}>

                    <ButtonAnimated
                        onPress={() => {
                            navigation.navigate('Appointements' as never)
                        }}
                        style={[styles.floatButton, { backgroundColor: theme.colors.main }]}

                    >
                        <CarSvg
                            height={32}
                            width={32}
                        />
                    </ButtonAnimated>

                </Animated.View>
            </PanGestureHandler>

        </Container>
    )
}

import { StyleSheet } from 'react-native';
import { LoadAnimated } from '../../components/LoadAnimated/LoadAnimated'





export const styles = StyleSheet.create({
    floatButton: {
        height: RFValue(60),
        width: RFValue(60),
        borderRadius: RFValue(30),
        justifyContent: 'center',
        alignItems: 'center',



    }
});

