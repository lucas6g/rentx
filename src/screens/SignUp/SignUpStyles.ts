import { getStatusBarHeight, } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";



export const Container = styled.View`
   
    background-color: ${({ theme }) => theme.colors.background_gray};
    
  
    padding: 0 32px;
    padding-top: ${getStatusBarHeight() + 19}px;
   

`



export const Title = styled.Text`
   color: ${({ theme }) => theme.colors.title_two};
   font-family: ${({ theme }) => theme.fonts.archivo_semi};
   font-size: ${RFValue(40)}px;
   margin-bottom: 16px;
   margin-top: 48px;
 


`


export const SubTitle = styled.Text`
color: ${({ theme }) => theme.colors.text};
   font-family: ${({ theme }) => theme.fonts.inter_regular};
   font-size: ${RFValue(15)}px;
   line-height:${RFValue(25)}px;
`

export const InputsContainer = styled.View`
    width: 100%;
    margin: 64px 0px;
    
`


export const Header = styled.View`
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;


`
export const ScreenIndexes = styled.View`
    flex-direction: row;
align-items: center;


`
interface ScreenIndexProps {
    active: boolean
}
export const ScreenIndex = styled.View<ScreenIndexProps>`
   width: 6px;
    height: 6px;
    border-radius: 3px;
    margin-left: 8px;
    background-color: ${({ theme, active }) => active ? theme.colors.shape_dark : theme.colors.text_detail};
  
`

export const FortTitle = styled.Text`
    color: ${({ theme }) => theme.colors.title_two};
   font-family: ${({ theme }) => theme.fonts.archivo_semi};
   font-size: ${RFValue(20)}px;
  margin-bottom: 24px;
`