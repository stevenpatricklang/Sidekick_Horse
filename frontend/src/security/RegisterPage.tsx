import React, {useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import PasswordChecklist from "react-password-checklist"


export default function RegisterPage() {
    const [username, setUsername] = useState<string>("")
    const [messageStatus, setMessageStatus] = useState('')
    const [Password, setPassword] = useState<string>("")
    const [error, setError] = useState("");
    const navigate = useNavigate();


    const register = () => {
        axios.post("/api/app-users/member", {
            username,
            Password,
        })
            .then((response) => response.status)
            .catch((error) => {
                console.log("Error =>" + error)
            })
            .then((status) => {
                if (status === 200) {
                    setMessageStatus(username + ' was successfully created.');
                }
            })
            .then(() => setTimeout(() => setGoToLogin(), 2000))
    }

    const setGoToLogin = () => {
        navigate("/login")
    }

    const isUsernameNotEmpty = (username: string) => {
        return /.@./.test(username);
    }

    function handleFormSubmit(event: any) {
        event.preventDefault();
        if (!isUsernameNotEmpty(username)) {
            setError("Username can not be empty");
            return;
        } else {
            setError("");
        }
        register()
        setUsername("");
        setPassword("");
    }

    return <>
        <StyledSection>
            <h2>Registration:</h2>
            <StyledForm onSubmit={handleFormSubmit}>
                <StyledDiv1>
                    <StyledLabel htmlFor="Username">Username:</StyledLabel>
                    <StyledInput type='text'
                                 id="username"
                                 value={username}
                                 onChange={event => setUsername(event.target.value)}
                                 placeholder="Username" required/>
                    <StyledLabel htmlFor="password">Password:</StyledLabel>
                    <StyledInput type="text"
                                 id="password"
                                 value={Password}
                                 placeholder="Password" required
                                 onChange={event => setPassword(event.target.value)}/>

                    {error && <StyledMessage>{error}</StyledMessage>}
                    {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
                </StyledDiv1>
                <StyledDiv2>
                    <PasswordChecklist
                        rules={["minLength", "specialChar", "number", "capital"]}
                        minLength={8}
                        value={Password}
                        messages={{
                            minLength: "Password must have at least 8 characters",
                        }}
                    />
                </StyledDiv2>
                <StyledDiv2>
                    <StyledButton onClick={handleFormSubmit}>Register</StyledButton>
                </StyledDiv2>
            </StyledForm>
        </StyledSection>
    </>;
}

const StyledMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 0.8rem;
`
const StyledDiv2 = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 25vw;
  margin: 10px;
  padding: 8px 20px 25px 20px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .4), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .4);
`

const StyledButton = styled.button`
  justify-content: center;
  font-size: 1.0rem;
  margin: 3px;
  padding: 10px;
  width: 160px;
  transition-duration: 0.4s;
  background-color: var(--color-button-background);
  color: var(--color-text);
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 5px;

  &:hover {
    background-color: var(--color-button-hover);
  }

  &:active {
    background-color: var(--color-button-active);
  }
`;
const StyledInput = styled.input`
  margin: 3px;
  padding: 3px;
  border-radius: 5px;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .04), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .04);
`;

const StyledDiv1 = styled.div`
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;
const StyledForm = styled.form`
  width: 90%
  display: flex;
  align-self: center;
  align-items: center;
`;
const StyledLabel = styled.label`
  font-size: 1.0rem;
`