import { Alert, StatusBar } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';

import { useTheme } from 'styled-components';
import { Button } from '../../components/Button/Button';
import { Input } from '../../components/Input/Input';
import * as Yup from 'yup';
import { api } from '../../services/api'


import {
    Container,

    InputsContainer,
    FortTitle,
    Header,
    ScreenIndexes,
    ScreenIndex,



} from './SignUpPasswordStyles';
import { BackButton } from '../../components/BackButton/BackButton';
import { useNavigation, useRoute } from '@react-navigation/native';

interface SignUpPasswordRouteParams {

    name: string
    email: string
    cnh: string

}


export function SignUpPassword() {

    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')

    const signUpPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, 'No minimo 6 digitos')
            .required('O Campo senha é obrigatorio'),
        passwordConfirmation: Yup.string()
            .required('O campo Nova senha é obrigatorio')
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),

    });
    const { navigate, goBack } = useNavigation()

    const route = useRoute()

    const { name, email, cnh } = route.params as SignUpPasswordRouteParams



    const theme = useTheme()

    async function handleSignUp() {

        try {

            await signUpPasswordSchema.validate({

                password,
                passwordConfirmation
            })


            await api.post('/users', {
                name,
                email,
                password,
                driver_license: cnh
            })

            navigate('Comfirmation' as never, {
                title: 'Conta Criada',
                nextScreenName: 'Login',

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
                            <ScreenIndex active={false} />
                            <ScreenIndex active={true} />


                        </ScreenIndexes>
                    </Header>




                    <StatusBar
                        barStyle='dark-content'
                        backgroundColor='transparent'
                        translucent

                    />






                    <InputsContainer>
                        <FortTitle>2.Senha</FortTitle>
                        <Input
                            iconName='lock'
                            isPassword={true}
                            placeholder='Senha'
                            value={password}
                            onChangeText={(text) => {
                                setPassword(text)
                            }}
                            autoCorrect={false}
                            autoCapitalize='none'

                        />
                        <Input
                            iconName='lock'
                            isPassword={true}
                            placeholder='Repitir Senha'
                            value={passwordConfirmation}
                            onChangeText={(text) => {
                                setPasswordConfirmation(text)
                            }}
                            autoCorrect={false}
                            autoCapitalize='none'

                        />

                    </InputsContainer>



                    <Button
                        enabled={!!password && !!passwordConfirmation}
                        color={!!password && !!passwordConfirmation ? theme.colors.success : ''} style={{ marginBottom: 8 }} onPress={handleSignUp}>
                        Cadastrar

                    </Button>

                </Container >
            </TouchableWithoutFeedback>



        </KeyboardAvoidingView>


    );
}
