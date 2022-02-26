import styled from "styled-components/native";
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import { RFValue } from 'react-native-responsive-fontsize'

export const Container = styled.View`
background-color: ${({ theme }) => theme.colors.background_white};
flex: 1;
`

export const Header = styled.View`


    align-items: center;
    flex-direction: row;
    margin-top: ${getStatusBarHeight()}px;
    margin-left: 24px;
    
`


export const Content = styled.ScrollView.attrs({
    contentContainerStyle: {
        padding: 16
    }
})`
    


`
export const Details = styled.View`
    padding: 36px  8px 0px ;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

`
export const Description = styled.View`
`
export const Brand = styled.Text`

font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.text_detail};
font-size: ${RFValue(10)}px;
text-transform: uppercase;


`
export const Name = styled.Text`
font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.title};
font-size: ${RFValue(25)}px;


`
export const Rent = styled.View`



`
export const Period = styled.Text`
font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.text_detail};
font-size: ${RFValue(10)}px;
text-transform: uppercase;


`
export const Price = styled.Text`

font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.main};
font-size: ${RFValue(25)}px;

`

export const Acessories = styled.View`
    width: 100%;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 16px;
   
   
`


export const About = styled.Text`

font-family: ${({ theme }) => theme.fonts.inter_regular};
color: ${({ theme }) => theme.colors.text};
font-size: ${RFValue(15)}px;

padding: 8px;
line-height: ${RFValue(25)}px;

text-align: justify;



`
export const Fotter = styled.View`

width: 100%;
height: ${RFValue(111)}px;

  padding: 24px;

background-color: ${({ theme }) => theme.colors.background_gray};

`

export const OfilineMessage = styled.Text`
    font-family: ${({ theme }) => theme.fonts.inter_medium};
color: ${({ theme }) => theme.colors.main};
font-size: ${RFValue(10)}px;
text-align: center;


`



