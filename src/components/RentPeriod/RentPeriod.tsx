import React from 'react';

import {

    Container,
    Period,
    Dates,
    Date,


} from './RentPeriodStyles'
import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components';

interface RentPeriodProps {
    startDate: string
    endDate: string
}

export function RentPeriod({ endDate, startDate }: RentPeriodProps) {

    const theme = useTheme()
    return (
        <Container>

            <Period>Periodo</Period>

            <Dates>
                <Date>{startDate}</Date>
                <Feather name="arrow-right" style={{ marginHorizontal: 10 }} size={14} color={theme.colors.text_detail} />
                <Date>{endDate}</Date>
            </Dates>

        </Container>
    );
}