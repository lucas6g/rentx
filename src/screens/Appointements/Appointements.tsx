import { useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';
import { StatusBar } from 'react-native';
import { priceFormater } from '../../utils/priceFormater'
import {

    Container,
    Header,
    Title,
    SubTitle,
    AppointmentsMade,
    Quantity,
    AppointmentsMadeText,
    Content,
    CarList
} from './AppointmentsStyles';
import { useTheme } from 'styled-components';
import { api } from '../../services/api';
import { Card } from '../../components/Card/Card';
import { RentPeriod } from '../../components/RentPeriod/RentPeriod';
import { Loading } from '../../components/Loading/Loading'

export interface Rental {
    id: string
    userId: string
    rentPrice: number
    period: string
    formatedRentPrice: string
    car: {
        id: string
        carName: string
        brand: string
        thumbNail: string
        fuelType: 'gasoline_motor' | 'electric' | 'hybrid_motor'
    }
    startDate: string
    endDate: string

}


export function Appointements() {

    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)

    const [rentals, setRentals] = useState<Rental[]>([])

    async function loadMyRentals() {
        try {


            setLoading(true)

            const response = await api.get(`/rentals`)



            const formatedRentals = response.data.map((rental) => {
                return {
                    id: rental.id,
                    car: {
                        carName: rental.car.name,
                        brand: rental.car.brand,
                        thumbNail: rental.car.thumbnail,
                        fuelType: rental.car.fuel_type,

                    },
                    period: rental.car.period,
                    rentPrice: rental.car.price,
                    formatedRentPrice: priceFormater(rental.car.price),
                    startDate: rental.start_date,
                    endDate: rental.end_date

                }
            })

            setRentals(formatedRentals)
        } catch (error) {
            console.log(error)

        } finally {
            setLoading(false)
        }


    }



    useFocusEffect(useCallback(() => {
        loadMyRentals()

    }, []))






    const theme = useTheme()

    return (
        <Container>
            <StatusBar backgroundColor={theme.colors.header} barStyle='light-content' />
            <Header>
                <BackButton onPress={() => { navigation.goBack() }} borderless={false} color='white' />
                <Title>
                    Seus agendamentos,{'\n'}
                    estão aqui.
                </Title>

                <SubTitle>Conforto, segurança e praticidade.</SubTitle>
            </Header>

            <Content>

                <AppointmentsMade>
                    <AppointmentsMadeText>Agendamentos feitos </AppointmentsMadeText>
                    <Quantity>{rentals.length}</Quantity>
                </AppointmentsMade>


                {
                    loading ? <Loading /> : <CarList<React.ElementType>

                        data={rentals}


                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <Card
                                        disabled={true}
                                        carName={item.car.carName}
                                        brand={item.car.brand}
                                        period={item.period}
                                        rentPrice={item.formatedRentPrice}
                                        thumbNail={item.car.thumbNail}
                                        fuelType={item.car.fuelType}
                                        onPress={() => {
                                            navigation.navigate('CarDetails' as never, {
                                                car: item
                                            } as never)

                                        }}


                                    />

                                    <RentPeriod
                                        startDate={item.startDate}
                                        endDate={item.endDate}
                                    />
                                </>

                            )
                        }}

                    />
                }


            </Content>
        </Container>
    );
}