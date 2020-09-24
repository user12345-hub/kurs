import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {AuthPage} from './pages/AuthPage'
import {CollectionsPage} from './pages/CollectionsPage'
import {CreateCollectionPage} from './pages/CreateCollectionPage'
import {DetailCollectionPage} from './pages/DetailCollectionPage'
import {RegPage} from './pages/RegPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return (
            <Switch>
                <Route path="/collections" exact>
                    <CollectionsPage/>
                </Route>
                <Route path="/create" exact>
                    <CreateCollectionPage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailCollectionPage/>
                </Route>
                <Redirect to="/collections"/>
            </Switch>
        )
    }
    
    return (
        <div className="mt-5 text-xs-center">
            <div className="container h-100">
                <div className="row align-items-center h-100">
                    <div className="col-6 mx-auto">
                        <div className="card h-100 border-primary justify-content-center">
                            <Switch>
                                <Route path="/login" exact>
                                    <AuthPage/>
                                </Route>
                                <Route path="/register" exact>
                                    <RegPage/>
                                </Route>
                                <Redirect to="/login" />
                            </Switch>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 