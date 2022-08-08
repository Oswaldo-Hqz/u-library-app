import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import AuthService from "../services/auth.service";

const required = (value) => {
    if (!value) {
        return (
            <div className="invalid-feedback d-block">This field is required.</div>
        );
    }
};

const validEmail = (value) => {
    if (!isEmail(value)) {
        return (
            <div className="invalid-feedback d-block">This is not a valid email.</div>
        );
    }
};

const Login = () => {

    const form = useRef();
    const checkBtn = useRef();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setMessage("");
        setLoading(true);
        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            
            AuthService.login(email, password).then(
            () => {
                navigate("/profile");
                window.location.reload();
            },
            (error) => {
                const resMessage =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString();
                setLoading(false);
                setMessage(resMessage);
            });
        } else {
            setLoading(false);
        }
    };

    return (
        <div className="d-flex justify-content-center">
            <div className="col-md-4">
                <div className="card pt-3">
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img" className="profile-img-card" />
                    <div className="card-body">
                        <Form onSubmit={handleLogin} ref={form} >

                            <div className="mb-3">
                                <label htmlFor="email">Email</label>
                                <Input type="text" className="form-control" name="email" 
                                        value={email} 
                                        onChange={onChangeEmail} 
                                        validations={[required, validEmail]}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password">Password</label>
                                <Input type="password" className="form-control" name="password"
                                        value={password}
                                        onChange={onChangePassword}
                                        validations={[required]}
                                />
                            </div>

                            <div className="mb-3">
                                <button className="btn btn-primary btn-block" disabled={loading}>
                                    {loading && ( <span className="spinner-border spinner-border-sm"></span> )}
                                    <span>Login</span>
                                </button>
                            </div>
                            {message && (
                                <div className="mb-3">
                                    <div className="alert alert-danger" role="alert">
                                    {message}
                                    </div>
                                </div>
                            )}

                            <CheckButton style={{ display: "none" }} ref={checkBtn} />
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
