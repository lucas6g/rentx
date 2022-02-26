import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import { FlatList } from "react-native";
import { Car } from "../Home/Home";

export const Container = styled.View`
flex: 1;

`

export const Header = styled.View`

width: 100%;
height:325px;
background-color: ${({ theme }) => theme.colors.header};
padding: 0 24px ;
padding-top: ${getStatusBarHeight()}px;






`
export const Title = styled.Text`
font-family: ${({ theme }) => theme.fonts.archivo_semi};
color: ${({ theme }) => theme.colors.background_white};
font-size: ${RFValue(30)}px;
margin-top: ${RFValue(22)}px;
line-height: ${RFValue(34)}px;


`
export const SubTitle = styled.Text`
font-family: ${({ theme }) => theme.fonts.archivo_regular};
color: ${({ theme }) => theme.colors.background_white};
font-size: ${RFValue(15)}px;
margin-top: 18px;


`

export const Content = styled.View`
    flex: 1;
    padding:  24px 16px ;
`

export const AppointmentsMade = styled.View`
width: 100%;
flex-direction: row;
justify-content: space-between;
align-items: center;
margin-bottom: 29px;

`
export const AppointmentsMadeText = styled.Text`
font-family: ${({ theme }) => theme.fonts.inter_regular};
color: ${({ theme }) => theme.colors.text_detail};
font-size: ${RFValue(15)}px;


`
export const Quantity = styled.Text`
    font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.title};
font-size: ${RFValue(15)}px;

`

export const CarList = styled(FlatList as new () => FlatList<Car>)`
    

`


