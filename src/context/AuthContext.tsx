import React, { createContext, useState, useEffect } from 'react';


import { database } from '../database'
import { api } from '../services/api';
import { User as UserModel } from '../database/model/User'


interface SignInCredentials {
    email: string;
    password: string;
}



interface User {
    id: string
    user_id: string
    name: string
    email: string
    driver_license: string
    avatar: string
    token: string;
}

// formato dos dados no contexto de autenticacao
interface AuthContextData {
    user: User;
    signIn(credentials: SignInCredentials): Promise<void>;
    signOut(): Promise<void>;
    updateUser(user: User): Promise<void>
    loading: boolean

}

export const AuthContext = createContext<AuthContextData>(
    {} as AuthContextData,
);

const AuthProvider: React.FC = ({ children }) => {
    // para caso o usuario ja tenha efetuado o login uma primeira vez
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function loadUser() {

            try {
                const userColection = database.get<UserModel>('users')
                const response = await userColection.query().fetch()

                if (response.length > 0) {
                    const userData = response[0]._raw as undefined as User
                    api.defaults.headers['authorization'] = `Bearer ${userData.token}`;
                    setUser(userData)

                    setLoading(false)
                }
            } catch (error) {
                throw new Error(error)
            }





        }
        loadUser();
    }, []);




    async function signIn({ email, password }: SignInCredentials) {

        try {

            const response = await api.post('/sessions', {
                email,
                password
            })

            const { user, token } = response.data

            api.defaults.headers['authorization'] = `Bearer ${token}`;


            const userCollection = database.get<UserModel>('users')

            database.write(async () => {
                await userCollection.create((newUser) => {

                    newUser.name = user.name
                    newUser.user_id = user.id
                    newUser.email = user.email
                    newUser.driver_license = user.driver_license
                    newUser.avatar = user.avatar
                    newUser.token = token

                })
            })


            setUser(user);
        } catch (error) {
            throw new Error(error)
        }

    }
    async function signOut() {


        try {



            const userCollection = database.get<UserModel>('users')

            database.write(async () => {
                const selectedUser = await userCollection.find(user.id)
                await selectedUser.destroyPermanently()

            })

            setUser(null);

        } catch (error) {
            throw new Error(error)
        }

    }
    async function updateUser(newUserData: User) {


        try {

            const userCollection = database.get<UserModel>('users')

            database.write(async () => {
                const selectedUser = await userCollection.find(newUserData.id)
                await selectedUser.update((userData) => {
                    userData.name = newUserData.name
                    userData.driver_license = newUserData.driver_license
                    userData.avatar = newUserData.avatar

                })


            })

            setUser(user);

        } catch (error) {
            throw new Error(error)
        }

    }



    return (
        <AuthContext.Provider
            value={{ user, signIn, signOut, updateUser, loading }}
        >
            {children}
        </AuthContext.Provider>
    );
};
export { AuthProvider };