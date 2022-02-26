
import React from 'react'
import { RectButtonProperties } from 'react-native-gesture-handler'
import CarSvg from '../../assets/float.svg'

import { Container } from './FloatButtonStyles'



interface FluatButtonProps extends RectButtonProperties {


  onPress: () => void
}

export function FluatButton({ onPress, ...rest }: FluatButtonProps) {
  return (
    <Container onPress={onPress} {...rest} >
      <CarSvg
        height={32}
        width={32}
      />
    </Container>


  )
}