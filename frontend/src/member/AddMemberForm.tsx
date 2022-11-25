import React, {useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import {NavLink, useNavigate} from "react-router-dom";
import {Icon} from '@iconify/react';

export default function AddMemberForm() {

    const baseUrl = '/api/members/';

    const postForm = () => {
        axios.post(baseUrl, {
            firstName,
            lastName,
            street,
            zipcode,
            city,
            email,
            })
            .then((response) => response.status)
            .catch((error) => {
                console.log("Error =>" + error)
            })
            .then((status) => {
                if (status === 200) {
                    setMessageStatus(' New Member ' + firstName + " " + lastName + ' successfully created.');
                }
            })
            .then(() => setTimeout(() => setBackHome(), 2000))
    }

    const [messageStatus, setMessageStatus] = useState('')
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [street, setStreet] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const setBackHome = () => {
        navigate("/members/list")
    }

    const isValidEmail = (email: string) => {
        return /.@./.test(email);
    }

    const handleFormSubmit = (event: any) => {
        event.preventDefault();
        if (!isValidEmail(email)) {
            setError("Email is invalid");
            return;
        } else {
            setError("");
        }
        postForm();
        setFirstName("");
        setLastName("");
        setEmail("");
        setStreet("");
        setZipcode("");
        setCity("");
    }

    return <>
        <StyledSection>
            <StyledForm onSubmit={handleFormSubmit}>
                <StyledDiv1>
                    <StyledLabel htmlFor="firstName">First name:</StyledLabel>
                    <StyledInput type='text'
                                 id="firstName"
                                 value={firstName}
                                 onChange={(e) => setFirstName(e.target.value)}
                                 placeholder={"Hunz"}/>

                    <StyledLabel htmlFor={"lastName"}>Last name:</StyledLabel>
                    <StyledInput type='text'
                                 id="lastName"
                                 value={lastName}
                                 onChange={(e) => setLastName(e.target.value)}
                                 placeholder="Kunz"/>

                    <StyledLabel htmlFor={"street"}>Street:</StyledLabel>
                    <StyledInput type='text'
                                 id="street"
                                 value={street}
                                 onChange={(e) => setStreet(e.target.value)}
                                 placeholder="Hopfenstrasse 1"/>

                    <StyledLabel htmlFor={"zipcode"}>Zipcode:</StyledLabel>
                    <StyledInput type='text'
                                 id="zipcode"
                                 value={zipcode}
                                 onChange={(e) => setZipcode(e.target.value)}
                                 placeholder="86830"/>

                    <StyledLabel htmlFor={"city"}>City:</StyledLabel>
                    <StyledInput type='text'
                                 id="city"
                                 value={city}
                                 onChange={(e) => setCity(e.target.value)}
                                 placeholder="Hopfenhausen"/>

                    <StyledLabel htmlFor={"email"}>E-Mail:</StyledLabel>
                    <StyledInput type='text'
                                 id="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder="abc@gmail.com"/>

                    {error && <StyledMessage>{error}</StyledMessage>}
                    {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
                </StyledDiv1>

            </StyledForm>
            <StyledDiv2>
                <StyledButton onClick={handleFormSubmit}>
                    <Icon icon="mdi:register" width="14"/> Add Member</StyledButton>
            </StyledDiv2>
        </StyledSection>
        <StyledNavLink to="/">Home</StyledNavLink>
    <br />
    </>;
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  margin: 10px;
  padding: 8px 20px 25px 20px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .4), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .4);
`

const StyledLabel = styled.label`
  font-size: 0.8rem;
`

const StyledNavLink = styled(NavLink)`
  font-size: 1.0rem;
  margin: 3px;
  padding: 10px;
  width: 150px;
  transition-duration: 0.4s;
  background-color: var(--color-button-background);
  color: var(--color-text);
  border: none;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-radius: 8px;
  justify-content: center;
  align-content: center;
  flex-direction: column;

  &:hover {
    background-color: var(--color-button-hover);
  }

  &:active {
    background-color: var(--color-button-active);
  }
`;

const StyledButton = styled.button`
  font-size: 1.0rem;
  margin: 3px;
  padding: 10px;
  width: 150px;
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


const StyledMessage = styled.p`
  margin: 10px;
  padding: 8px;
  font-size: 0.8rem;
`

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

const StyledDiv2 = styled.div`
  align-content: center;
  display: flex;
  justify-content: center;
  padding: 20px;
`;

const StyledForm = styled.form`
  display: flex;
  align-self: center;
  align-items: center;
`;
