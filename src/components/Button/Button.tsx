
import React, { ReactNode } from 'react'
import { ActivityIndicator } from 'react-native'
import { RectButtonProperties } from 'react-native-gesture-handler'
import { useTheme } from 'styled-components'

import { Container, ButtonText } from './ButtonStyles'



interface ButtonProps extends RectButtonProperties {
    children: ReactNode
    color?: string
    onPress: () => void
    enabled?: boolean
    loading?: boolean
    textColor?: string
}

export function Button({ children, onPress, color, enabled = true, loading = false, textColor, ...rest }: ButtonProps) {
    const theme = useTheme()

    return (
        <Container enabled={enabled} style={{ opacity: enabled === false || loading === true ? 0.5 : 1 }} onPress={onPress} color={color} {...rest} >

            {loading ? <ActivityIndicator color={theme.colors.shape} /> : <ButtonText color={textColor}>{children} </ButtonText>}


        </Container>


    )
}