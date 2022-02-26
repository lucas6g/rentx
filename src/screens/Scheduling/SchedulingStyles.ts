import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue, RFPercentage } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";


export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background_white};

`

export const Header = styled.View`

width: 100%;
height:${RFValue(325)}px;
background-color: ${({ theme }) => theme.colors.header};



padding: 0 24px ;

padding-top: ${getStatusBarHeight()}px;





`
export const Title = styled.Text`
font-family: ${({ theme }) => theme.fonts.archivo_semi};
color: ${({ theme }) => theme.colors.background_white};
font-size: ${RFValue(30)}px;
margin-top: 24px;


`

export const FromToContainer = styled.View`
width: 100%;
flex-direction: row;
justify-content: space-between;
margin-top: 32px;
height: 38px;
align-items: center;

`
export const From = styled.View`

   

`
export const Of = styled.Text`
font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.text_detail};

text-transform: uppercase;


`
interface OfDateProps {

    isSelected: boolean

}

export const OfDate = styled.Text<OfDateProps>`

width:  ${RFValue(104)}px;

font-family: ${({ theme }) => theme.fonts.inter_medium};
color: ${({ theme }) => theme.colors.background_white};
font-size: ${RFValue(15)}px;

${({ isSelected }) => !isSelected && css`
border-bottom-width: 1px;
border-bottom-color: ${({ theme }) => theme.colors.text_detail};
padding-bottom: 5px;
`}


`
export const To = styled.View`
`
export const Until = styled.Text`

font-family: ${({ theme }) => theme.fonts.archivo_medium};
color: ${({ theme }) => theme.colors.text_detail};
font-size: ${RFValue(10)}px;
text-transform: uppercase;
`


interface UtilDateProps {

    isSelected: boolean

}
export const UntilDate = styled.Text<UtilDateProps >`


 width:  ${RFValue(104)}px;

 font-family: ${({ theme }) => theme.fonts.inter_medium};
color: ${({ theme }) => theme.colors.background_white};
font-size: ${RFValue(15)}px;

 ${({ isSelected }) => !isSelected && css`
 border-bottom-width: 1px;
 border-bottom-color: ${({ theme }) => theme.colors.text_detail};
 padding-bottom: 5px;
 `}


`

export const Content = styled.ScrollView`

 

`
export const Fotter = styled.View`
    background-color: ${({ theme }) => theme.colors.background_white};
    padding: 24px;
    width: 100%;
    

`
