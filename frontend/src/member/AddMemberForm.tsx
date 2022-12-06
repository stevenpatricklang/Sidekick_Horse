import React, {useState} from 'react';
import axios from "axios";
import styled from "styled-components";
import {useNavigate} from "react-router-dom";
import {Icon} from '@iconify/react';
import 'react-dropdown/style.css';

export default function AddMemberForm() {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [street, setStreet] = useState("");
    const [zipcode, setZipcode] = useState("");
    const [city, setCity] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [beginMembership, setBeginMembership] = useState("");
    const [ridingExperience, setRidingExperience] = useState("");
    const [membershipActive, setMembershipActive] = useState(false);
    const [accountHolder, setAccountHolder] = useState("");
    const [iban, setIban] = useState("");
    const [bankName, setBankName] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [messageStatus, setMessageStatus] = useState("")

    const handleBeginner = (event: any) => {
        event.preventDefault();
        setRidingExperience("BEGINNER");
    };

    const handleIntermediate = (event: any) => {
        event.preventDefault();
        setRidingExperience("INTERMEDIATE");
    };
    const handleAdvanced = (event: any) => {
        event.preventDefault();
        setRidingExperience("ADVANCED");
    };

    const checkHandler = () => {
        setMembershipActive(!membershipActive);
    }

    const postForm = () => {
        axios.post("/api/members/", {
            firstName,
            lastName,
            street,
            zipcode,
            city,
            age,
            email,
            phoneNumber,
            beginMembership,
            ridingExperience,
            membershipActive,
            accountHolder,
            iban,
            bankName,
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
        setStreet("");
        setZipcode("");
        setCity("");
        setAge("");
        setEmail("");
        setPhoneNumber("");
        setBeginMembership("");
        setRidingExperience("");
        setAccountHolder("");
        setIban("");
        setBankName("");
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
                                 placeholder="Stefan" required/>

                    <StyledLabel htmlFor={"lastName"}>Last name:</StyledLabel>
                    <StyledInput type='text'
                                 id="lastName"
                                 value={lastName}
                                 onChange={(e) => setLastName(e.target.value)}
                                 placeholder="Maier" required/>

                    <StyledLabel htmlFor={"street"}>Street:</StyledLabel>
                    <StyledInput type='text'
                                 id="street"
                                 value={street}
                                 onChange={(e) => setStreet(e.target.value)}
                                 placeholder="Kirchweg 4a" required/>

                    <StyledLabel htmlFor={"zipcode"}>Zipcode:</StyledLabel>
                    <StyledInput type='text'
                                 id="zipcode"
                                 value={zipcode}
                                 onChange={(e) => setZipcode(e.target.value)}
                                 placeholder="86830" required/>

                    <StyledLabel htmlFor={"city"}>City:</StyledLabel>
                    <StyledInput type='text'
                                 id="city"
                                 value={city}
                                 onChange={(e) => setCity(e.target.value)}
                                 placeholder="Schwabmünchen" required/>

                    <StyledLabel htmlFor={"age"}>Age:</StyledLabel>
                    <StyledInput type='text'
                                 id="age"
                                 value={age}
                                 onChange={(e) => setAge(e.target.value)}
                                 placeholder="25" required/>

                    <StyledLabel htmlFor={"email"}>Email:</StyledLabel>
                    <StyledInput type='email'
                                 id="email"
                                 value={email}
                                 onChange={(e) => setEmail(e.target.value)}
                                 placeholder="abcdefg@gmx.de" required/>

                    <StyledLabel htmlFor={"phoneNumber"}>Phone number:</StyledLabel>
                    <StyledInput type='text'
                                 id="phoneNumber"
                                 value={phoneNumber}
                                 onChange={(e) => setPhoneNumber(e.target.value)}
                                 placeholder="0176 12345678" required/>

                    <StyledLabel htmlFor={"beginMembership"}>Begin membership:</StyledLabel>
                    <StyledInput type='date'
                                 id="beginMembership"
                                 value={beginMembership}
                                 onChange={(e) => setBeginMembership(e.target.value)}
                                 placeholder="01.01.2022" required/>

                    <StyledLabel htmlFor={"ridingExperience"}>Riding Experience:</StyledLabel>
                    <StyledInput type='text'
                                 id="ridingExperience"
                                 value={ridingExperience}
                                 onChange={(e) => setRidingExperience(e.target.value)}
                                 placeholder="" required/>

                    <button onClick={handleBeginner}>BEGINNER</button>

                    <button onClick={handleIntermediate}>INTERMEDIATE</button>

                    <button onClick={handleAdvanced}>ADVANCED</button>

                    <StyledDiv3></StyledDiv3>

                    <StyledLabel htmlFor={"membershipActive"}>Membership active:</StyledLabel>
                    <StyledInput type='checkbox'
                                 id="membershipActive"
                                 checked={membershipActive}
                                 onChange={checkHandler}/>

                    <StyledLabel htmlFor={"accountHolder"}>Bank Account Holder:</StyledLabel>
                    <StyledInput type='text'
                                 id="accountHolder"
                                 value={accountHolder}
                                 onChange={(e) => setAccountHolder(e.target.value)}
                                 placeholder="Stefan Maier" required/>

                    <StyledLabel htmlFor={"iban"}>IBAN:</StyledLabel>
                    <StyledInput type='text'
                                 id="iban"
                                 value={iban}
                                 onChange={(e) => setIban(e.target.value)}
                                 placeholder="DE12345678901234567890" required/>

                    <StyledLabel htmlFor={"bankName"}>Bank Name:</StyledLabel>
                    <StyledInput type='text'
                                 id="bankName"
                                 value={bankName}
                                 onChange={(e) => setBankName(e.target.value)}
                                 placeholder="Sparkasse" required/>


                    {error && <StyledMessage>{error}</StyledMessage>}
                    {messageStatus && <StyledMessage>{messageStatus}</StyledMessage>}
                </StyledDiv1>

            </StyledForm>
            <StyledDiv2>
                <StyledButton onClick={handleFormSubmit}>
                    <Icon icon="mdi:register" inline={true} width="14"/> Add Member</StyledButton>
            </StyledDiv2>
        </StyledSection>
        <div></div>
    </>
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
  font-size: 1.0rem;
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
const StyledDiv3 = styled.div`
    margin: 10px;
`;

const StyledForm = styled.form`
  display: flex;
  align-self: center;
  align-items: center;
`;

