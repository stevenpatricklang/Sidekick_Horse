import React, {FormEvent, useState} from 'react';
import {MemberModel} from "./MemberModel";
import styled from "styled-components";
import axios from "axios";

type MemberCardProps = {
    member: MemberModel;
    fetchAllMembers: () => void
}

export default function MemberCard(props: MemberCardProps) {
    const [doEdit, setDoEdit] = useState(false)
    const [messageStatus, setMessageStatus] = useState("")

    const [newFirstName, setFirstName] = useState(props.member.firstName)
    const [newLastName, setLastName] = useState(props.member.lastName)
    const [newStreet, setStreet] = useState(props.member.street)
    const [newZipcode, setZipcode] = useState(props.member.zipcode)
    const [newCity, setCity] = useState(props.member.city)
    const [newAge, setAge] = useState(props.member.age)
    const [newEmail, setEmail] = useState(props.member.email)
    const [newPhoneNumber, setPhoneNumber] = useState(props.member.phoneNumber)
    const [newBeginMembership, setBeginMembership] = useState(props.member.beginMembership)
    const [newRidingExperience, setRidingExperience] = useState(props.member.ridingExperience)
    const [newMembershipActive, setMembershipActive] = useState(props.member.membershipActive)
    const [newAccountHolder, setAccountHolder] = useState(props.member.accountHolder)
    const [newIBAN, setIBAN] = useState(props.member.iban)
    const [newBankName, setBankName] = useState(props.member.bankName)


    function updateMember(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.put("/api/members/" + props.member.id, {
            id: props.member.id,
            firstName: newFirstName,
            lastName: newLastName,
            street: newStreet,
            zipcode: newZipcode,
            city: newCity,
            age: newAge,
            email: newEmail,
            phoneNumber: newPhoneNumber,
            beginMembership: newBeginMembership,
            membershipActive: newMembershipActive,
            ridingExperience: newRidingExperience,
            accountHolder: newAccountHolder,
            iban: newIBAN,
            bankName: newBankName

        })
            .then(response => {
                props.fetchAllMembers()
                return response.data
            })
            .catch(error => console.log(error))

    }

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
        setMembershipActive(!newMembershipActive);
    }

    const deleteMember = () => {
        axios.delete("/api/members/" + props.member.id)
            .then((response) => response.status)
            .catch((error) => {
                if (error.status === 404) setMessageStatus('Error: Delete was not successfully!!')
            })
            .then((status) => {
                if (status === 200) {
                    setMessageStatus("The Member " + props.member.firstName + " " + props.member.lastName + ' has been successfully deleted.');
                }
            })
            .then(() => setTimeout(() => props.fetchAllMembers(), 2000))
    }
    if (doEdit) {
        return (
            <StyledSection>
                <StyledForm onSubmit={updateMember}>
                    <StyledDiv88>
                        <StyledLabel>FirstName</StyledLabel>
                        <StyledInput type="text" value={newFirstName}
                                     onChange={event => setFirstName((event.target.value))}/>

                        <StyledLabel>LastName</StyledLabel>
                        <StyledInput type="text" value={newLastName}
                                     onChange={event => setLastName((event.target.value))}/>

                        <StyledLabel>Street</StyledLabel>
                        <StyledInput type="text" value={newStreet} onChange={event => setStreet((event.target.value))}/>

                        <StyledLabel>Zipcode</StyledLabel>
                        <StyledInput type="text" value={newZipcode}
                                     onChange={event => setZipcode((event.target.value))}/>

                        <StyledLabel>City</StyledLabel>
                        <StyledInput type="text" value={newCity} onChange={event => setCity((event.target.value))}/>

                        <StyledLabel>Age</StyledLabel>
                        <StyledInput type="text" value={newAge} onChange={event => setAge((event.target.value))}/>

                        <StyledLabel>Email</StyledLabel>
                        <StyledInput type="text" value={newEmail} onChange={event => setEmail((event.target.value))}/>

                        <StyledLabel>PhoneNumber</StyledLabel>
                        <StyledInput type="text" value={newPhoneNumber}
                                     onChange={event => setPhoneNumber((event.target.value))}/>
                    </StyledDiv88>
                    <StyledDiv88>
                        <StyledLabel>Begin Membership</StyledLabel>
                        <StyledInput type="text" value={newBeginMembership}
                                     onChange={event => setBeginMembership((event.target.value))}/>

                        <StyledLabel>Membership Active</StyledLabel>
                        <input type="checkbox"
                               checked={newMembershipActive}
                               onChange={checkHandler}/>

                        <StyledLabel>Riding Experience</StyledLabel>
                        <StyledInput type="text" value={newRidingExperience}
                                     onChange={event => setRidingExperience((event.target.value))}/>
                        <StyledDiv>
                            <button onClick={handleBeginner}>BEGINNER</button>
                            <button onClick={handleIntermediate}>INTERMEDIATE</button>
                            <button onClick={handleAdvanced}>ADVANCED</button>
                        </StyledDiv>

                        <StyledLabel>Account Holder</StyledLabel>
                        <StyledInput type="text" value={newAccountHolder}
                                     onChange={event => setAccountHolder((event.target.value))}/>

                        <StyledLabel>IBAN</StyledLabel>
                        <StyledInput type="text" value={newIBAN}
                                     onChange={event => setIBAN((event.target.value))}/>

                        <StyledLabel>Bank Name</StyledLabel>
                        <StyledInput type="text" value={newBankName}
                                     onChange={event => setBankName((event.target.value))}/>
                        <StyledDiv>
                            <StyledButton>Submit</StyledButton>
                            <StyledButton onClick={() => setDoEdit(false)}>Cancel</StyledButton>
                        </StyledDiv>
                    </StyledDiv88>
                </StyledForm>
            </StyledSection>
        )

    }
    return (
        <>
            <StyledLi>
                <StyledName>Name: {props.member.firstName} {props.member.lastName}</StyledName>

                <StyledStreet>Straße: {props.member.street}</StyledStreet>

                <StyledCity> PLZ & Ort: {props.member.zipcode}&nbsp;{props.member.city}</StyledCity>

                <StyledHr/>

                <StyledAge>Alter: {props.member.age}</StyledAge>

                <StyledMail>E-Mail: {props.member.email}</StyledMail>

                <StyledPhoneNumber> Telefonnummer: {props.member.phoneNumber}</StyledPhoneNumber>
                <StyledHr/>
                <StyledBeginMembership>Beginn der Mitgliedschaft: {props.member.beginMembership}</StyledBeginMembership>

                <StyledRidingExperience> Reiterfahrung: {props.member.ridingExperience}</StyledRidingExperience>

                <StyledHr/>

                <StyledAccountHolder>Account Holder: {props.member.accountHolder}</StyledAccountHolder>

                <StyledIBAN>IBAN: {props.member.iban}</StyledIBAN>

                <StyledBankName> Name der Bank: {props.member.bankName}</StyledBankName>

                <StyledDiv>
                    <StyledButton onClick={() => setDoEdit(true)}>Update Member</StyledButton>
                    <StyledButton onClick={deleteMember}>Delete</StyledButton>
                </StyledDiv>

                {messageStatus && <StyledDeleteMessage>{messageStatus}</StyledDeleteMessage>}
            </StyledLi>
        </>
    );
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

const StyledForm = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 10px;
  padding: 5px;
`

const StyledDiv88 = styled.form`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 5px;
`

const StyledLabel = styled.label`
  font-size: 0.8rem;
`

const StyledInput = styled.input`
  margin: 5px;
  padding: 3px;
  border-radius: 5px;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .04), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .04);
`;

const StyledHr = styled.hr`
  width: 95%;
  color: rgb(218, 218, 218);
`

const StyledDeleteMessage = styled.p`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 0.95rem;
`

const StyledLi = styled.li`
  min-width: 300px;
  max-width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .4), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .04);
  background-color: rgba(255, 255, 255, 0.9);
`

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px;
`

const StyledName = styled.p`
  max-width: 340px;
  word-wrap: break-word;
  margin-bottom: 2px;
  font-size: 1.0rem;
`

const StyledStreet = styled.p`
  font-size: 0.95rem;
  margin-bottom: 2px;
`

const StyledCity = styled.p`
  font-size: 0.95rem;
`

const StyledAge = styled.p`
  font-size: 0.95rem;
  margin-bottom: 2px;
`

const StyledPhoneNumber = styled.p`
  font-size: 0.95rem;
`

const StyledMail = styled.p`
  font-size: 0.95rem;
  margin-bottom: 2px;
`

const StyledBeginMembership = styled.p`
  font-size: 0.95rem;
  margin-bottom: 2px;
`

const StyledRidingExperience = styled.p`
  font-size: 0.95rem;
  margin-bottom: 2px;
`

const StyledAccountHolder = styled.p`
  font-size: 0.95rem;
  margin-bottom: 2px;
`

const StyledIBAN = styled.p`
  font-size: 0.95rem;
  margin-bottom: 2px;
`

const StyledBankName = styled.p`
  font-size: 0.95rem;
`

const StyledButton = styled.button`
  margin: 3px;
  padding: 5px;
  width: 75px;
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
