import { Alert, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton/BackButton';

import {
    Container,
    Header,
    Title,
    FromToContainer,
    From,
    Of,
    OfDate,
    To,
    Until,
    UntilDate,
    Content,
    Fotter
} from './SchedulingStyles';

import ArrowIcon from '../../assets/arrow.svg'
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { Button } from '../../components/Button/Button';
import { Calendar, MarkedDateProps } from '../../components/Calendar/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { DateData } from 'react-native-calendars/src/types';
import { generateInterval } from '../../components/Calendar/generateInterval';
import { getPlataformDate } from '../../utils/getPlataformDate';

import { format } from 'date-fns'
import { Car } from '../Home/Home';

interface RouteParams {
    car: Car

}
export interface RentPeriod {
    start: number
    startFormated: string
    end: number
    endFormated: string

}

export function Scheduling() {



    const [rentPeriod, setRentPeriod] = useState<RentPeriod>({} as RentPeriod)

    const [lastSelectedDate, setLastSelectedDate] = useState<DateData>({} as DateData)

    const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps)

    const theme = useTheme()

    const navigation = useNavigation()


    const route = useRoute()
    const { car } = route.params as RouteParams




    async function handelConfirmRental() {
        if (!rentPeriod.startFormated || !rentPeriod.endFormated) {
            Alert.alert('Escolhe uma data aeee')
        } else {
            navigation.navigate('RentDetails' as never, {
                car,
                date: rentPeriod,
                interval: Object.keys(markedDates)

            } as never)
        }
    }

    async function handleDateChange(date: DateData) {
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate
        let end = date

        if (start.timestamp > end.timestamp) {
            start = end
            end = start
        }
        setLastSelectedDate(end)
        const interval = generateInterval(start, end)
        setMarkedDates(interval)

        const firstDate = Object.keys(interval)[0]
        const lastDate = Object.keys(interval)[Object.keys(interval).length - 1]

        setRentPeriod({
            start: start.timestamp,
            startFormated: format(getPlataformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            end: end.timestamp,
            endFormated: format(getPlataformDate(new Date(lastDate)), 'dd/MM/yyyy'),


        })

    }



    return (
        <Container>
            <StatusBar backgroundColor={theme.colors.header} barStyle='light-content' />
            <Header>
                <BackButton onPress={() => { navigation.goBack() }} borderless={false} color='white' />
                <Title>
                    Escolha uma {'\n'}
                    data de início e {'\n'}
                    fim do aluguel
                </Title>

                <FromToContainer>
                    <From>
                        <Of>De </Of>
                        <OfDate isSelected={!!rentPeriod.startFormated}>{rentPeriod.startFormated}</OfDate>
                    </From>

                    <ArrowIcon
                        height={RFValue(10)}
                        width={RFValue(48)}
                    />

                    <To>
                        <Until>Ate </Until>
                        <UntilDate isSelected={!!rentPeriod.endFormated}>{rentPeriod.endFormated}</UntilDate>
                    </To>

                </FromToContainer>

            </Header>

            <Content
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: 24

                }}>

                <Calendar
                    markedDates={markedDates}
                    onDayPress={handleDateChange}

                />


            </Content>

            <Fotter>
                <Button enabled={!!rentPeriod.startFormated} onPress={handelConfirmRental}>Confirmar</Button>

            </Fotter>

        </Container>
    );
}