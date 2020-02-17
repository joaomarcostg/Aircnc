import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import Book from './views/Book.js'
import List from './views/List.js'
import Login from './views/Login.js'

const Routes = createAppContainer(
    createSwitchNavigator({
        Login,
        List,
        Book
    })
)

export default Routes;