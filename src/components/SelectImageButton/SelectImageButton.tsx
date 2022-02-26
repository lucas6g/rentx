
import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'
import CarSvg from '../../assets/float.svg'

import { Container } from './SelectImageButtonStyles'

import { Feather } from '@expo/vector-icons'
import { useTheme } from 'styled-components'


interface SelectImageButtonProps extends RectButtonProperties {


    onPress: () => void
}

export function SelectImageButton({ onPress, ...rest }: SelectImageButtonProps) {
    const theme = useTheme()

    return (
        <Container onPress={onPress} {...rest} >
            <Feather
                size={24}
                color={theme.colors.background_white}
                name='camera'
            />
        </Container>


    )
}