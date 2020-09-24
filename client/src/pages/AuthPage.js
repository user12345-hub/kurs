import React, {useContext, useState, useEffect} from 'react'
import {Card, Button, Form} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {FormErrors} from '../components/FormErrors'
import { AuthContext } from '../context/auth.context'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, request, error, clearError} = useHttp()
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    useEffect(() => {

    }, [error, clearError, message])

    const changeHandler = event => {
        setForm({
            ...form, [event.target.name] : event.target.value
        })
    }

    const loginHandler = async () =>{
        try{
            const data = await request("/api/auth/login", 'POST', {...form})
            auth.login(data.token, data.userId)
        }
        catch (e){

        }
    }
    return(
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Log in to your account</Card.Title>
                <div className="panel panel-default">
                    <FormErrors formErrors={error} />
                </div>
                <Form>
                    <Form.Group className="text-sm-left">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control 
                            placeholder="example@gmail.com"
                            id="email"
                            type="email"
                            name="email"
                            onChange={changeHandler}
                            disabled={loading}
                        />
                    </Form.Group>
                    <Form.Group className="text-sm-left">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            placeholder="Password" 
                            id="password"
                            type="password"
                            name="password"
                            onChange={changeHandler}
                            disabled={loading}
                        />
                    </Form.Group>
                    <div className="text-sm-left">
                        <Button 
                            variant="primary" 
                            onClick={loginHandler} 
                            disabled={loading}
                        >
                            Login
                        </Button>
                        <Link to={'/register'}>
                            <Button 
                                variant="secondary" 
                                type="submit"
                                disabled={loading}
                            >
                                Sign up
                            </Button>
                        </Link>
                    </div>
                </Form>
            </Card.Body>
        </Card>
    )
}