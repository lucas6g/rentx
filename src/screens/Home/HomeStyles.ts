import styled from "styled-components/native";
import { RFValue } from 'react-native-responsive-fontsize'
import { FlatList } from "react-native";
import { Car } from "./Home";




export const Container = styled.View`
    flex: 1;
background-color: ${({ theme }) => theme.colors.background_gray};


`

export const Header = styled.View`
    height: 113px;
    width: 100%;


    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    background-color: ${({ theme }) => theme.colors.header};

    padding:  24px 16px;

`


export const TotalCars = styled.Text`
    

   color: ${({ theme }) => theme.colors.text};
   font-family: ${({ theme }) => theme.fonts.inter_regular};
   font-size: ${RFValue(15)}px;



`

export const CarList = styled(FlatList as new () => FlatList<Car>)`
    

`

