import { StatusBar } from 'react-native';
import React, { useState } from 'react';

import { BackButton } from '../../components/BackButton/BackButton';
import { ImageSlider } from '../../components/ImageSlider/ImageSlider';



import {
    Container,
    Header,
    Content,
    Details,
    Description,
    Brand,
    Name,
    Rent,
    Period,
    Price,
    Acessories,
    Fotter,
    RentPeriod,
    CalendarIconBox,
    CalendarIcon,
    DateInfo,
    DateTitle,
    DateValue,
    ArrowIcon,
    RentTotalContainer,
    PeriodInfo,
    DaylyAmountTitle,
    DaylyCauculation,
    Total,



} from './RentDetailsStyles';
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
import { differenceInDays } from 'date-fns'


import { useNavigation, useRoute } from '@react-navigation/native';
import { Car } from '../Home/Home';
import { api } from '../../services/api';


interface RouteParams {
    car: Car
    date: {
        start: number
        startFormated: string
        end: number
        endFormated: string
    }
}



export function RentDetails() {



    const [buttonLoading, setButtonLoading] = useState(false)
    const navigation = useNavigation()

    const routes = useRoute()

    const { car, date } = routes.params as RouteParams
    const daily = differenceInDays(date.end, date.start)

    const total = daily * car.rentPrice



    const theme = useTheme()


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

    async function handleRentNow() {


        try {
            setButtonLoading(true)


            await api.post(`/rentals`, {
                car_id: car.id,
                start_date: date.startFormated,
                end_date: date.endFormated,
                total
            })


            navigation.navigate('Comfirmation' as never, {
                title: 'Carro Alugado!',
                message: `Agora você só precisa ir ${'\n'}  até a concessionária da RENTX`,
                nextScreenName: 'Home',
            } as never)
        } catch (error) {
            console.log(error)
        } finally {
            setButtonLoading(false)
        }

    }


    return (
        <Container>
            <StatusBar barStyle='dark-content' backgroundColor={theme.colors.background_white} />

            <Header>
                <BackButton
                    onPress={() => { navigation.goBack() }}
                />

            </Header>

            <ImageSlider

                photos={car.photos}
            />

            <Content showsVerticalScrollIndicator={false}>
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.carName}</Name>
                    </Description>



                    <Rent>
                        <Period>{car.period}</Period>
                        <Price>{car.formatedRentPrice}</Price>
                    </Rent>
                </Details>

                <Acessories>

                    {
                        car.accessories.map((accessorie) => {
                            return (
                                <Acessory
                                    key={accessorie.type}
                                    name={accessorie.name}
                                    icon={icons[accessorie.type]}

                                />

                            )

                        })

                    }


                </Acessories>

                <RentPeriod>
                    <CalendarIconBox>
                        <CalendarIcon
                            name="calendar"
                            color={theme.colors.background_white}
                            size={24}
                        />
                    </CalendarIconBox>

                    <DateInfo>
                        <DateTitle>De </DateTitle>
                        <DateValue >{date.startFormated}</DateValue>
                    </DateInfo>

                    <ArrowIcon
                        name='chevron-right'
                        color={theme.colors.text_detail}
                        size={15}
                    />

                    <DateInfo>
                        <DateTitle>De </DateTitle>
                        <DateValue >{date.endFormated}</DateValue>
                    </DateInfo>

                </RentPeriod>

                <RentTotalContainer>
                    <PeriodInfo>
                        <DaylyAmountTitle>Total</DaylyAmountTitle>
                        <DaylyCauculation>{car.formatedRentPrice} x {daily} diárias</DaylyCauculation>
                    </PeriodInfo>

                    <Total>R$ {total}</Total>
                </RentTotalContainer>



            </Content>

            <Fotter>
                <Button loading={buttonLoading} enabled={!buttonLoading} color={theme.colors.success} onPress={handleRentNow}>Alugar agora</Button>

            </Fotter>

        </Container>
    );
}