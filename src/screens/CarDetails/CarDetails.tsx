import { StatusBar } from 'react-native';
import React, { useState, useEffect } from 'react';

import { BackButton } from '../../components/BackButton/BackButton';
import { ImageSlider } from '../../components/ImageSlider/ImageSlider';


import {
    Container,
    Header,

    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    About,
    Acessories,
    Fotter,
    OfilineMessage


} from './CarDetailsStyles';
import { useTheme } from 'styled-components';
import { Acessory } from '../../components/Acessory/Acessory';

import SpeedIcon from '../../assets/speed.svg'
import AccelerationIcon from '../../assets/acceleration.svg'
import ExchangeIcon from '../../assets/exchange.svg'
import GasolineIcon from '../../assets/gasoline.svg'
import EletricIcon from '../../assets/energy.svg'
import Hibridy from '../../assets/hybrid.svg'

import ForceIcon from '../../assets/force.svg'
import PeopleIcon from '../../assets/people.svg'
import { Button } from '../../components/Button/Button';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, { Extrapolate, interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

import { Car } from '../Home/Home'
import { Car as CarModel } from '../../database/model/Car'
import { api } from '../../services/api';
import { useNetInfo } from '@react-native-community/netinfo';
import { priceFormater } from '../../utils/priceFormater';


interface RouteParams {
    car: CarModel

}



const icons = {
    speed: SpeedIcon,
    acceleration: AccelerationIcon,
    exchange: ExchangeIcon,
    electric_motor: EletricIcon,
    gasoline_motor: GasolineIcon,
    hybrid_motor: Hibridy,
    turning_diameter: ForceIcon,
    seats: PeopleIcon

}


export function CarDetails() {

    const [carUpdated, setCarUpdated] = useState<Car>({} as Car)

    const netInfo = useNetInfo()

    const scollYposition = useSharedValue(0)

    const scollHandler = useAnimatedScrollHandler((event) => {
        scollYposition.value = event.contentOffset.y
    })

    const route = useRoute()
    const { car } = route.params as RouteParams

    const headerStyles = useAnimatedStyle(() => {
        return {
            height: interpolate(scollYposition.value,
                [0, 200], [200, 70],
                Extrapolate.CLAMP
            ),
        }
    })
    const sliderCarsStyles = useAnimatedStyle(() => {
        return {
            opacity: interpolate(scollYposition.value,
                [0, 150], [1, 0],
                Extrapolate.CLAMP
            ),
        }
    })



    const theme = useTheme()



    const navigation = useNavigation()


    async function handleSelectRentalPeriod() {
        navigation.navigate('Scheduling' as never, {
            car: carUpdated
        } as never)
    }

    useEffect(() => {
        async function loadUpdatedCar() {
            const response = await api.get('/cars/' + car.id)
            const { data } = response

            const formatedCar = {
                id: data.id,
                carName: data.name,
                brand: data.brand,
                period: data.period,
                rentPrice: data.price,
                thumbNail: data.thumbnail,
                fuelType: data.fuel_type,
                formatedRentPrice: priceFormater(data.price),
                about: data.about,
                photos: data.photos,

                accessories: data.accessories
            }

            setCarUpdated(formatedCar)
        }
        if (netInfo.isConnected === true) {
            loadUpdatedCar()

        }
    }, [netInfo.isConnected])



    return (
        <Container>
            <StatusBar barStyle='dark-content' backgroundColor={theme.colors.background_white} />

            <Animated.View style={headerStyles}>

                <Header  >
                    <BackButton
                        onPress={() => {
                            navigation.goBack()
                        }}
                    />

                </Header>

                <Animated.View style={sliderCarsStyles}>

                    <ImageSlider

                        photos={
                            !!carUpdated.photos ? carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }]

                        }
                    />
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                onScroll={scollHandler}
                contentContainerStyle={{ padding: 16 }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
            >

                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>



                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>
                            R$  {
                                netInfo.isConnected === true ? car.price : '...'
                            }</Price>
                    </Rent>
                </Details>

                {

                    carUpdated.accessories && (<Acessories>


                        {
                            carUpdated.accessories.map((accessorie) => {
                                return (
                                    <Acessory
                                        key={accessorie.type}
                                        name={accessorie.name}
                                        icon={icons[accessorie.type]}

                                    />

                                )

                            })
                        }

                    </Acessories>)

                }




                <About>
                    {car.about}

                </About>

            </Animated.ScrollView>

            <Fotter>
                <Button enabled={!!netInfo.isConnected} onPress={handleSelectRentalPeriod}>Escolher período do aluguel</Button>

                {
                    netInfo.isConnected === false && (<OfilineMessage>Conecte na net para alugar o carro</OfilineMessage>)
                }
            </Fotter>

        </Container>
    );
}



