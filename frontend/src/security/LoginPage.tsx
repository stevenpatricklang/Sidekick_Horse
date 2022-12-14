import React, {useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styled from "styled-components";

type Props = {
    fetchUsername: () => void
}
export default function LoginPage(props: Props) {
    const [username, setUsername] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [messageStatus, setMessageStatus] = useState('')
    const [error, setError] = useState("");

    const login = () => {
        axios.get("/api/app-users/login", {
            auth: {
                username,
                password
            }
        })
            .then((response) => response.status)
            .catch((error) => {
                if (error.response.status === 401) {
                    setError("Username oder Passwort falsch");
                    (setTimeout(() => setError(""), 5000));
                }

            })
            .then((status) => {
                if (status === 200) {
                    setMessageStatus(username + ' wurde eingeloggt');
                    (setTimeout(() => {
                        props.fetchUsername();
                        setMessageStatus("")
                    }, 1500));
                }
            })
    }

    function handleFormSubmit(event: any) {
        event.preventDefault();
        login()
        setUsername("");
        setPassword("");
    }

    return <>

        <StyledSection>
            <StyledForm onSubmit={handleFormSubmit}>
                <StyledDiv2>
                    <StyledDiv1>Please Login to Enter the Admin Area.</StyledDiv1>
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
                    {error && <StyledMessage>{error}</StyledMessage>}
                    {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
                </StyledDiv2>
                <StyledDiv4>Dont have an account?&nbsp;
                    <Link to={{pathname: "/register"}}>Please Register</Link></StyledDiv4>
                <StyledDiv3>
                    <StyledButton onClick={handleFormSubmit}>Login</StyledButton>
                </StyledDiv3>
            </StyledForm>
        </StyledSection>
    </>
}


const StyledMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 0.8rem;
`
const StyledDiv1 = styled.div`
  font-size: 1.25rem;
  font-weight: 600;
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;
const StyledDiv2 = styled.div`
  align-content: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;
const StyledDiv3 = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const StyledDiv4 = styled.div`
  font-size: 1.0rem;
  font-weight: 400;
  justify-content: center;
  align-content: center;
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 10px;
`;
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

const StyledForm = styled.form`
width: 70%
  display: flex;
  align-self: center;
  align-items: center;
`;
const StyledLabel = styled.label`
  font-size: 1.0rem;
`
