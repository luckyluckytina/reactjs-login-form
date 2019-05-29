import React, { Component } from "react";
import { Row, Form, FormGroup, FormControl, ControlLabel, Button, HelpBlock } from 'react-bootstrap';
import './login.sass';
// import { isEmail, isEmpty, isLength, isContainWhiteSpace } from 'src/components/shared/validator';
import Request from 'react-http-request';

class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            formData: {}, // Contains login form data
            errors: {}, // Contains login field errors
            formSubmitted: false, // Indicates submit status of login form 
            loading: false, // Indicates in progress state of login form
            res: {}
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        let { formData } = this.state;
        formData[name] = value;

        this.setState({
            formData: formData
        });
    }

    validateLoginForm = (e) => {
        
        let errors = {};
        const { formData } = this.state;

        // if (isEmpty(formData.email)) {
        //     errors.email = "Email can't be blank";
        // } else if (!isEmail(formData.email)) {
        //     errors.email = "Please enter a valid email";
        // }

        var Url = "https://xxx.oktapreview.com/api/v1/users?limit=25"  // Get user list
        const url = 'http://localhost:3000/getuser'
        const Data =
        {
         username: "{{username}}",
         password: "{{password}}"
        //  options: {
        //     "multiOptionalFactorEnroll": true,
        //     "warnBeforePasswordExpired": true
        //     }  
        }
        const otherPram = {
            headers:{
                "Accept": "application/json",
                "Content-Type": "application/json",
                "Authorization": "SSWS{{apiKey}}"
            },

            method: "GET",
            mode: "no-cors"
        }

        if(formData.email == "lijialiu6@gmail.com" && formData.password == "123") {
            fetch(url)
            .then(res=>res.json())
            .then(
                result => {this.setState(
                {res: result.body}
            )}
            )
            .catch(error=> console.log(error))

            return true;
            
        }else {
            return errors;
        }

        // if (isEmpty(formData.password)) {
        //     errors.password = "Password can't be blank";
        // }  else if (isContainWhiteSpace(formData.password)) {
        //     errors.password = "Password should not contain white spaces";
        // } else if (!isLength(formData.password, { gte: 6, lte: 16, trim: true })) {
        //     errors.password = "Password's length must between 6 to 16";
        // }

        // if (isEmpty(errors)) {
        //     return true;
        // } else {
        //     return errors;
        // }    
    }

    login = (e) => {
        console.log(e);
        e.preventDefault();

        let errors = this.validateLoginForm();

        if(errors === true){
            alert("You are successfully signed in...");
            // window.location.reload()   
        } else {
            alert("Username or password is not correct...");
            this.setState({
                errors: errors,
                formSubmitted: true
            });
        }
    }

    render() {

        const { errors, formSubmitted } = this.state;

        return (
            <div className="Login">
                <Row>
                    <form onSubmit={this.login}>
                        <FormGroup controlId="email" validationState={ formSubmitted ? (errors.email ? 'error' : 'success') : null }>
                            <ControlLabel>Email</ControlLabel>
                            <FormControl type="text" name="email" placeholder="Enter your email" onChange={this.handleInputChange} />
                        { errors.email && 
                            <HelpBlock>{errors.email}</HelpBlock> 
                        }
                        </FormGroup >
                        <FormGroup controlId="password" validationState={ formSubmitted ? (errors.password ? 'error' : 'success') : null }>
                            <ControlLabel>Password</ControlLabel>
                            <FormControl type="password" name="password" placeholder="Enter your password" onChange={this.handleInputChange} />
                        { errors.password && 
                            <HelpBlock>{errors.password}</HelpBlock> 
                        }
                        </FormGroup>
                        <Button type="submit" bsStyle="primary">Sign-In</Button>
                    </form>
                </Row>
            </div>
        )
    }
}

export default Login;