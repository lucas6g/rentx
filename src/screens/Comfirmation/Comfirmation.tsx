

import React from 'react';


import {

    Container,
    Content,
    Title,
    Message,
    DoneButton,
    DoneButtonText,
    Footer
} from './ComfirmationStyles';

import LogoSvg from '../../assets/logo_background_gray.svg'
import DoneSvg from '../../assets/done.svg'
import { useWindowDimensions } from 'react-native';

import { StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { useNavigation, useRoute } from '@react-navigation/native';



interface ComfirmationRouteParams {

    title: string
    message?: string
    nextScreenName: string

}
export function Comfirmation() {

    const theme = useTheme()
    const { width } = useWindowDimensions()

    interface NavigationProps {
        navigate: (screen: string) => void;
        goBack: () => void
    }
    const navigation = useNavigation<NavigationProps>()


    const routes = useRoute()

    const { message, nextScreenName, title } = routes.params as ComfirmationRouteParams

    return (
        <Container>
            <StatusBar barStyle='light-content' backgroundColor={theme.colors.header} />
            <LogoSvg

                width={width}

            />

            <Content>
                <DoneSvg
                    width={80}
                    height={80}
                    style={{
                        marginBottom: 40
                    }}
                />

                <Title>{title}</Title>



                {message && (
                    <Message>
                        {message}
                    </Message>

                )}



            </Content>

            <Footer>
                <DoneButton onPress={() => {
                    navigation.navigate(nextScreenName)
                }}>
                    <DoneButtonText>Ok</DoneButtonText>
                </DoneButton>

            </Footer>

        </Container>
    );
}