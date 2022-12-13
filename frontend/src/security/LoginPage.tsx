import React, {FormEvent, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import styled from "styled-components";

type Props = {
    fetchUsername: () => void
}
export default function LoginPage(props: Props) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const navigate = useNavigate();


    const login = () => {
        axios.get("/api/app-users/login", {
            auth: {
                username,
                password
            }
        })
            .then(props.fetchUsername)
            .catch(() => alert("Login failed"))
            .then(() => setTimeout(() => setGoToAdminArea(), 2000))
    }

    const setGoToAdminArea = () => {
        navigate("/admin")
    }

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        login()

    }

    return <>
        <StyledSection>
            <StyledForm onSubmit={handleSubmit}>
                <StyledDiv1>
                    <StyledLabel htmlFor="Username">Username:</StyledLabel>
                    <StyledInput type='text'
                                 id="username"
                                 value={username}
                                 onChange={event => setUsername(event.target.value)}
                                 placeholder="Username" required/>

                    <StyledLabel htmlFor="Password">Password:</StyledLabel>
                    <StyledInput type="text"
                                 id="password"
                                 value={password}
                                 placeholder="Password" required
                                 onChange={event => setPassword(event.target.value)}/>
                    onClick
                </StyledDiv1>
                <StyledButton className="primary">Login</StyledButton>
            </StyledForm>
        </StyledSection>
    </>
}

const StyledSection = styled.section`
  justify-content: center;
  flex-direction: column;
  width: 25vw;
  align-content: center;
  margin: 10px;
  padding: 8px 20px 25px 20px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .4), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .4);
`

const StyledButton = styled.button`
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
  align-content: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;
const StyledForm = styled.form`
width: 70%
  display: flex;
  align-self: center;
  align-items: center;
`;
const StyledLabel = styled.label`
  font-size: 1.0rem;
`