import { BorderlessButton } from "react-native-gesture-handler";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
 
     background-color: ${({ theme }) => theme.colors.background_gray};

`

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(227)}px;
    background-color: ${({ theme }) => theme.colors.header};
    padding: 0 32px ;

`
export const HeaderBar = styled.View`
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 padding-top: ${getStatusBarHeight() + 16}px;

`
export const HeaderBarTitle = styled.Text`

color: ${({ theme }) => theme.colors.background_white};
   font-family: ${({ theme }) => theme.fonts.archivo_semi};
   font-size: ${RFValue(25)}px;



`
export const SignOutButton = styled(BorderlessButton)`


`
export const Icon = styled(Feather)`


`

export const AvatarContainer = styled.View`
    width:180px;
    height: 180px;
   align-self: center;
   
   margin-top:${RFValue(80)}px;
   position: relative;
   background-color: ${({ theme }) => theme.colors.text};
   border-radius: 90px;

`
export const Avatar = styled.Image`
    width:180px;
    height: 180px;
    border-radius: 90px;
    
`

export const Content = styled.View`

margin-top: 122px;
padding: 0 24px;
padding-bottom: 24px;

`



export const Options = styled.View`
flex-direction: row;
width: 100%;
justify-content: space-around;
align-items: center;

border-bottom-width:1px;
border-bottom-color:${({ theme }) => theme.colors.line};
margin-bottom: 24px;

`
interface OptionProps {
    active: boolean
}
export const Option = styled.TouchableOpacity<OptionProps>`

${({ active }) => active && css`

border-bottom-width:2px;
border-bottom-color:${({ theme }) => theme.colors.main};


`}

padding-bottom: 16px;

`

interface OptionLabelProps {
    active: boolean
}

export const OptionLabel = styled.Text<OptionLabelProps>`

color: ${({ theme }) => theme.colors.text_detail};

font-family: ${({ theme }) => theme.fonts.archivo_semi};
font-size: ${RFValue(20)}px;
${({ active }) => active && css`
color: ${({ theme }) => theme.colors.title_two};

`}
 
`

export const Section = styled.View`


`





