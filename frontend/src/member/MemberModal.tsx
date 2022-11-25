import {MemberModel} from "./MemberModel";
import {ChangeEvent, FormEvent, useState} from "react";
import axios from "axios";
import styled from "styled-components";

type ModalProps = {
    closeModal: () => void
    member: MemberModel
    fetchAllMembers: () => void
}

export default function MemberModal(props: ModalProps) {

    const [newFirstName, setFirstName] = useState("")
    const [newLastName, setLastName] = useState<string>()
    const [newStreet, setStreet] = useState<string>()
    const [newZipcode, setZipcode] = useState<string>()
    const [newCity, setCity] = useState<string>()
    const [newEmail, setEmail] = useState<string>()

    const updateMember = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        axios.put("/api/members/" + props.member.id, {
            id: props.member.id,
            newFirstName,
            newLastName,
            newStreet,
            newZipcode,
            newCity,
            newEmail
        })
            .then(response => {
                props.fetchAllMembers()
                props.closeModal()
                return response.data
            })
            .catch(error => console.log(error))
    }

    const handleNewFirstName = (event: ChangeEvent<HTMLInputElement>) => {
        setFirstName(event.target.value)
    }
    const handleNewLastName = (event: ChangeEvent<HTMLInputElement>) => {
        setLastName(event.target.value)
    }
    const handleNewStreet = (event: ChangeEvent<HTMLInputElement>) => {
        setStreet(event.target.value)
    }
    const handleNewZipcode = (event: ChangeEvent<HTMLInputElement>) => {
        setZipcode(event.target.value)
    }
    const handleNewCity = (event: ChangeEvent<HTMLInputElement>) => {
        setCity(event.target.value)
    }
    const handleNewEmail = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value)
    }

    return (
        <div>
            <StyledForm onSubmit={updateMember}>
                <StyledLabel>FirstName</StyledLabel>
                <StyledInput type="text" value={newFirstName} onChange={handleNewFirstName}/>

                <StyledLabel>LastName</StyledLabel>
                <StyledInput type="text" value={newLastName} onChange={handleNewLastName}/>

                <StyledLabel>Street</StyledLabel>
                <StyledInput type="text" value={newStreet} onChange={handleNewStreet}/>

                <StyledLabel>Zipcode</StyledLabel>
                <StyledInput type="text" value={newZipcode} onChange={handleNewZipcode}/>

                <StyledLabel>City</StyledLabel>
                <StyledInput type="text" value={newCity} onChange={handleNewCity}/>

                <StyledLabel>Email</StyledLabel>
                <StyledInput type="text" value={newEmail} onChange={handleNewEmail}/>

                <StyledButton onClick={props.closeModal}>Update</StyledButton>

                <StyledButton onClick={props.closeModal}>Cancel</StyledButton>
            </StyledForm>
        </div>
    )
}

const StyledForm = styled.form`
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