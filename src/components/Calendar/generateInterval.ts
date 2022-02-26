import { eachDayOfInterval, format } from 'date-fns'



import { MarkedDateProps } from './Calendar'



import theme from '../../styles/theme'
import { getPlataformDate } from '../../utils/getPlataformDate'
import { DateData } from 'react-native-calendars/src/types'

getPlataformDate


export function generateInterval(start: DateData, end: DateData) {
    let interval: MarkedDateProps = {}

    eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp) })
        .forEach((item) => {
            const date = format(getPlataformDate(item), 'yyyy-MM-dd')
            interval = {
                ...interval, //para que os dados do obejeto data nao sejam perdidos
                [date]: {
                    color: start.dateString === date || end.dateString === date ? theme.colors.main : theme.colors.main_light,
                    textColor: start.dateString === date || end.dateString === date ? theme.colors.main_light : theme.colors.main

                }
            }
        })

    return interval

}


