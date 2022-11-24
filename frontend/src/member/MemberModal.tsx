import {MemberModel} from "./MemberModel";
import {ChangeEvent, useState} from "react";
import axios from "axios";
import styled from "styled-components";

type ModalProps = {
    closeModal: () => void
    member: MemberModel
    fetchAllTasks: () => void
}

export default function MemberModal(props: ModalProps) {
    const [firstName, setFirstName] = useState(props.member.firstName)
    const [lastName, setLastName] = useState(props.member.lastName)
    const [street, setStreet] = useState(props.member.street)
    const [zipcode, setZipcode] = useState(props.member.zipcode)
    const [city, setCity] = useState(props.member.city)
    const [email, setEmail] = useState(props.member.email)

    function handleNewFirstName(event: ChangeEvent<HTMLInputElement>) {
        setFirstName(event.target.value)
    }

    function handleNewLastName(event: ChangeEvent<HTMLInputElement>) {
        setLastName(event.target.value)
    }

    function handleNewStreet(event: ChangeEvent<HTMLInputElement>) {
        setStreet(event.target.value)
    }

    function handleNewZipcode(event: ChangeEvent<HTMLInputElement>) {
        setZipcode(event.target.value)
    }

    function handleNewCity(event: ChangeEvent<HTMLInputElement>) {
        setCity(event.target.value)
    }

    function handleNewEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    function updateMember() {
        axios.put("/api/members/" + props.member.id, {
            id: props.member.id,
            firstName,
            lastName,
            street,
            zipcode,
            city,
            email
        })
            .then(response => {
                props.fetchAllTasks()
                props.closeModal()
                return response.data
            })
            .catch(error => console.log(error))
    }

    return (
        <StyledDiv>
            <StyledLabel>FirstName</StyledLabel>
            <StyledInput type="text" value={firstName} onChange={handleNewFirstName}/>

            <StyledLabel>LastName</StyledLabel>
            <StyledInput type="text" value={lastName} onChange={handleNewLastName}/>

            <StyledLabel>Street</StyledLabel>
            <StyledInput type="text" value={street} onChange={handleNewStreet}/>

            <StyledLabel>Zipcode</StyledLabel>
            <StyledInput type="text" value={zipcode} onChange={handleNewZipcode}/>

            <StyledLabel>City</StyledLabel>
            <StyledInput type="text" value={city} onChange={handleNewCity}/>

            <StyledLabel>Email</StyledLabel>
            <StyledInput type="text" value={email} onChange={handleNewEmail}/>

            <StyledButton onClick={updateMember}>Update</StyledButton>
            <StyledButton onClick={props.closeModal}>Cancel</StyledButton>
        </StyledDiv>
    )
}

const StyledDiv = styled.div`
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

const StyledButton = styled.button`
  padding: 6px 8px;
  font-size: 0.8rem;
  cursor: pointer;
  margin: 3px;
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