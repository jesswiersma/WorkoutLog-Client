import React, {useState} from 'react';
import {Form, FormGroup, Label, Input, Button} from 'reactstrap';

const Signup = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    let handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:3030/user/register", {
            method: 'POST',
            body: JSON.stringify({
               email: email, 
                password: password}),

            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
        .then ((response) => response.json())
        .then((data) => {
            console.log(data)
            props.updateToken(data.sessionToken)
            // props.updateUserId(data.user.id);
        });
    };

    return (
        <div>
            <h1>Sign Up</h1>
            <Form onSubmit = {handleSubmit}>
                <FormGroup>
                    <Label htmlFor = "email">Email</Label>
                    <Input onChange = {(e) => setEmail(e.target.value)} 
                    name = "email" 
                    value={email} required/>
                </FormGroup>
                <FormGroup>
                <Label htmlFor = "password">Password</Label>
                <Input onChange = {(e) => setPassword(e.target.value)}
                name = "password" 
                value = {password}/>
                </FormGroup>
                <Button type ="submit">Sign Up</Button>
            </Form>
        </div>
    );
}; 

export default Signup;