import React from 'react';


import {

    Button,
    CardInfo,
    CarBrand,
    CarName,
    RentPrice,
    About,
    Rent,
    Period,
    CarFuelType,
    CarImage,
    Container


} from './CardStyles';

import { RFValue } from 'react-native-responsive-fontsize'
import { RectButtonProperties } from 'react-native-gesture-handler'
import GasolineIcon from '../../assets/gasoline.svg'
import EletricIcon from '../../assets/energy.svg'
import HibridyIcon from '../../assets/hybrid.svg'


interface CardProps extends RectButtonProperties {
    brand: string
    carName: string
    period: string
    rentPrice: string
    thumbNail: string
    fuelType: 'gasoline_motor' | 'electric_motor' | 'hybrid_motor'
    disabled?: boolean
    onPress: () => void
}



export function Card({ brand, carName, period, rentPrice, thumbNail, onPress, fuelType, disabled, ...rest }: CardProps) {


    if (disabled) {

        return (

            <Container  >
                <CardInfo>
                    <CarBrand>{brand}</CarBrand>
                    <CarName>{carName}</CarName>

                    <About>
                        <Rent>
                            <Period>{period}</Period>
                            <RentPrice>{rentPrice}</RentPrice>
                        </Rent>
                        <CarFuelType  >

                            {fuelType === 'gasoline_motor' ? <GasolineIcon height={RFValue(20)} width={RFValue(20)} /> :
                                fuelType === 'electric_motor' ? <EletricIcon height={RFValue(20)} width={RFValue(20)} /> :
                                    <HibridyIcon height={RFValue(20)} width={RFValue(20)} />}

                        </CarFuelType>

                    </About>
                </CardInfo>


                <CarImage source={{ uri: thumbNail }} />

            </Container >

        )
    }

    return (

        <Button onPress={onPress} {...rest}  >
            <CardInfo>
                <CarBrand>{brand}</CarBrand>
                <CarName>{carName}</CarName>

                <About>
                    <Rent>
                        <Period>{period}</Period>
                        <RentPrice>{rentPrice}</RentPrice>
                    </Rent>
                    <CarFuelType  >

                        {fuelType === 'gasoline_motor' ? <GasolineIcon height={RFValue(20)} width={RFValue(20)} /> :
                            fuelType === 'electric_motor' ? <EletricIcon height={RFValue(20)} width={RFValue(20)} /> :
                                <HibridyIcon height={RFValue(20)} width={RFValue(20)} />}

                    </CarFuelType>

                </About>
            </CardInfo>


            <CarImage source={{ uri: thumbNail }} />

        </Button >
    )



}