import React, {useState} from 'react'
import { useForm } from 'react-hook-form'
import { User } from '../models/user'
import { LoginCredentials } from '../network/notes_api'
import * as NotesApi from '../network/notes_api'
import { Alert, Button, Form, Modal } from 'react-bootstrap'
import TextInfutField from './form/TextInfutField'
import styles from '../styles/utils.module.css'
import { UnauthorizedError } from '../errors/http_errors'


interface LoginModalProps {
    onDismiss : () => void,
    onLoginSuccessful : (user : User) => void,
}

const LoginModal = ({ onDismiss, onLoginSuccessful }: LoginModalProps) => {

    const [errorText, setErrorText] = useState<string | null>(null)
    
    const { register, handleSubmit, formState: {errors, isSubmitting} } = useForm<LoginCredentials>()

    async function onSubmit(credentials: LoginCredentials) {
        try {
            const user = await NotesApi.login(credentials)
            onLoginSuccessful(user)
        } catch (error) {
            if(error instanceof UnauthorizedError) {
                setErrorText(error.message)
            } else {
                alert(error)
            }
            
            console.error(error)
        }
    }


  return (
    <Modal show onHide={onDismiss}  > 
        <Modal.Header closeButton >
            <Modal.Title>
                Log In
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            {
                errorText && 
                <Alert variant='danger' >
                    {errorText}
                </Alert>
            }
            <Form onSubmit={handleSubmit(onSubmit)} >
                <TextInfutField
                name='username'
                label='Username'
                type="text"
                placeholder="Username"
                register={register}
                registerOptions={{required: "Required"}}
                error={errors.username} />
                <TextInfutField
                name='password'
                label='Password'
                type="password"
                placeholder="Password"
                register={register}
                registerOptions={{required: "Required"}}
                error={errors.password} />
                <Button type='submit' disabled={isSubmitting} className={styles.width100} >
                    Log In
                </Button>
            </Form>
        </Modal.Body>
    </Modal>
  )
}

export default LoginModal