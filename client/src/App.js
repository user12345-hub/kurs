import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {Container, Navbar} from 'react-bootstrap'
import {useRoutes} from './routes'
import { useAuth } from './hooks/auth.hook'
import {AuthContext} from './context/auth.context'
import {NavHeader} from './components/NavHeader'

function App() {
	const {token, login, logout, userId} = useAuth()
	const isAuthenticated = !!token
	const routes = useRoutes(isAuthenticated)
return (
	<AuthContext.Provider value={{
		token, login, logout, userId, isAuthenticated
	}}>
		<Router>
			<Container>
				{isAuthenticated && <NavHeader/>}
				{routes}
			</Container>
		</Router>
	</AuthContext.Provider>
)
}

export default App