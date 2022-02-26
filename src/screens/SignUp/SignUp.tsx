import { Alert, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useTheme } from 'styled-components';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import * as Yup from 'yup';


import {
    Container,
    Title,
    SubTitle,
    InputsContainer,
    FortTitle,
    Header,
    ScreenIndexes,
    ScreenIndex,



} from './SignUpStyles';
import { BackButton } from '../../components/BackButton/BackButton';
import { useNavigation } from '@react-navigation/native';


export function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [cnh, setCnh] = useState('')

    const { navigate, goBack } = useNavigation()

    const signUpSchema = Yup.object().shape({
        name: Yup.string()
            .required('O Campo nome é obrigatorio')
        ,
        email: Yup.string()
            .required('O Campo senha é obrigatorio')
            .email('Digite um email valido'),

        cnh: Yup.string()
            .required('O Campo cnh é obrigatorio')
            .min(3, 'Digite uma cnh valida'),

    });




    const theme = useTheme()

    async function handleSignUp() {

        try {

            await signUpSchema.validate({

                name,
                email,
                cnh
            })



            navigate('SignUpPassword' as never, {
                name,
                email,
                cnh
            } as never)

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                return Alert.alert('Opa', error.message)
            }
            Alert.alert('Erro na Api', 'verifique as crendenciais ')

        }
    }

    return (

        <KeyboardAvoidingView

            behavior='position'
            enabled


        >

            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container >


                    <Header>
                        <BackButton
                            onPress={() => goBack()}
                            borderless={false}
                        />

                        <ScreenIndexes>
                            <ScreenIndex active={true} />
                            <ScreenIndex active={false} />


                        </ScreenIndexes>
                    </Header>




                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor='transparent'
                        translucent

                    />




                    <Title>
                        Crie sua {'\n'}
                        conta
                    </Title>



                    <SubTitle>
                        Faça seu cadastro de {'\n'}
                        forma rápida e fácil.
                    </SubTitle>





                    <InputsContainer>
                        <FortTitle>1.Dados</FortTitle>
                        <Input
                            iconName='user'
                            placeholder='Nome'

                            autoCorrect={false}
                            value={name}
                            onChangeText={(text) => {
                                setName(text)
                            }}
                        />

                        <Input
                            iconName='mail'

                            placeholder='Email'
                            value={email}
                            onChangeText={(text) => {
                                setEmail(text)
                            }}
                            keyboardType='email-address'
                            autoCorrect={false}
                            autoCapitalize='none'

                        />
                        <Input
                            iconName='credit-card'
                            placeholder='CNH'
                            value={cnh}
                            keyboardType='numeric'
                            onChangeText={(text) => {
                                setCnh(text)
                            }}
                            maxLength={9}

                        />


                    </InputsContainer>



                    <Button enabled={!!email && !!name && !!cnh} style={{ marginBottom: 8 }} onPress={handleSignUp}>
                        Proximo

                    </Button>

                </Container >
            </TouchableWithoutFeedback>



        </KeyboardAvoidingView>


    );
}
