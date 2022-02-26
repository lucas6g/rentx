import React from 'react';
import { Calendar as CustomCalendar, LocaleConfig, CalendarProps } from 'react-native-calendars'

import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components/native';






LocaleConfig.locales['pt-br'] = {
    monthNames: [
        'Janeiro',
        'Fevereiro',
        'Março',
        'Abril',
        'Maio',
        'Junho',
        'Julho',
        'Agosto',
        'Setembro',
        'Outubro',
        'Novembro',
        'Dezembro'],
    monthNamesShort: [
        'Jan',
        'Fev',
        'Mar',
        'Abr',
        'Mai',
        'Jun',
        'Jul',
        'Ago',
        'Set',
        'Out',
        'Nov',
        'Dez'],
    dayNames: [
        'Domingo',
        'Segunda-Feira',
        'Terça-Feira',
        'Quarta-Feira',
        'Quinta-Feira',
        'Sexta-Feira',
        'Sábado'],
    dayNamesShort: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'],
    today: 'Hoje'

}

LocaleConfig.defaultLocale = 'pt-br'

export interface MarkedDateProps {
    [date: string]: {
        color: string;
        textColor: string;
        disabled?: boolean;
        disableTouchEvent?: boolean;
    },
}



export function Calendar({ markedDates, onDayPress }: CalendarProps) {



    const theme = useTheme()

    return (

        <CustomCalendar
            renderArrow={(direction) => {
                return (
                    <Feather
                        size={24}
                        color={theme.colors.text}
                        name={direction === 'left' ? 'chevron-left' : 'chevron-right'}
                    />
                )
            }}

            headerStyle={{
                borderBottomColor: theme.colors.text_detail,
                borderBottomWidth: 0.5,
                paddingBottom: 10

            }}

            theme={{
                textDayFontFamily: theme.fonts.inter_regular,
                textDayHeaderFontFamily: theme.fonts.archivo_semi,
                textDayHeaderFontSize: 10,
                textMonthFontSize: 20,
                monthTextColor: theme.colors.title,
                textMonthFontFamily: theme.fonts.archivo_semi,
                backgroundColor: theme.colors.background_white,

                arrowStyle: {
                    marginHorizontal: -15
                }


            }}

            minDate={new Date().toDateString()}
            firstDay={1}
            markingType='period'
            markedDates={markedDates}
            onDayPress={onDayPress}

        />
    );
}