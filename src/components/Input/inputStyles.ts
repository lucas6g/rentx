import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons'
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from 'react-native-gesture-handler'


interface ContainerProps {
    isFocused: boolean
}

export const Container = styled.View<ContainerProps>`
   width: 100%;
flex-direction: row;
margin-bottom: 8px;
background-color: ${({ theme }) => theme.colors.background_white};
height: ${RFValue(56)}px;
align-items: center;
padding-right:24px ;

${({ isFocused }) => isFocused && css`
border-bottom-width: 2px;
border-bottom-color: ${({ theme }) => theme.colors.main};
` }


`

export const IconContainer = styled.View`

    height: 100%;
    border-right-width: 2px;
    border-right-color: ${({ theme }) => theme.colors.background_gray};
    padding:  ${RFValue(16)}px;
    justify-content: center;
    align-items: center;


`
export const Icon = styled(Feather)`


`
export const TextInput = styled.TextInput`
   flex: 1;
   height: 100%;
   color: ${({ theme }) => theme.colors.text_detail};
   font-family: ${({ theme }) => theme.fonts.inter_regular};
   font-size: ${RFValue(15)}px;
   padding: 0 24px;
  

`
export const SeePasswordButton = styled(BorderlessButton)`
    

`