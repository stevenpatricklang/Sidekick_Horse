import {MemberModel} from "./MemberModel";
import {FormEvent, useState} from "react";
import axios from "axios";
import styled from "styled-components";

type ModalProps = {
    closeModal: (value: boolean) => void
    member: MemberModel
    fetchAllMembers: () => void
}

export default function MemberModal(props: ModalProps) {

    const [newFirstName, setFirstName] = useState(props.member.firstName)
    const [newLastName, setLastName] = useState(props.member.lastName)
    const [newStreet, setStreet] = useState(props.member.street)
    const [newZipcode, setZipcode] = useState(props.member.zipcode)
    const [newCity, setCity] = useState(props.member.city)
    const [newBeginMembership, setBeginMembership] = useState(props.member.beginMembership)
    const [newMembershipActive, setMembershipActive] = useState(props.member.membershipActive)
    const [newEmail, setEmail] = useState(props.member.email)

    function updateMember(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()
        axios.put("/api/members/" + props.member.id, {
            id: props.member.id,
            firstName: newFirstName,
            lastName: newLastName,
            street: newStreet,
            zipcode: newZipcode,
            city: newCity,
            beginMembership: newBeginMembership,
            membershipActive: newMembershipActive,
            email: newEmail
        })
            .then(response => {
                props.fetchAllMembers()
                props.closeModal(false)
                return response.data
            })
            .catch(error => console.log(error))
            .then(props.closeModal)
    }

    const checkHandler = () => {
        setMembershipActive(!newMembershipActive);
    }


    return (
        <div>
            <StyledForm onSubmit={updateMember}>
                <StyledLabel>FirstName</StyledLabel>
                <StyledInput type="text" value={newFirstName} onChange={event => setFirstName((event.target.value))}/>

                <StyledLabel>LastName</StyledLabel>
                <StyledInput type="text" value={newLastName} onChange={event => setLastName((event.target.value))}/>

                <StyledLabel>Street</StyledLabel>
                <StyledInput type="text" value={newStreet} onChange={event => setStreet((event.target.value))}/>

                <StyledLabel>Zipcode</StyledLabel>
                <StyledInput type="text" value={newZipcode} onChange={event => setZipcode((event.target.value))}/>

                <StyledLabel>City</StyledLabel>
                <StyledInput type="text" value={newCity} onChange={event => setCity((event.target.value))}/>

                <StyledLabel>Begin Membership</StyledLabel>
                <StyledInput type="text" value={newBeginMembership}
                             onChange={event => setBeginMembership((event.target.value))}/>

                <StyledLabel>Membership Active</StyledLabel>
                <input type="checkbox"
                       checked={newMembershipActive}
                       onChange={checkHandler}/>

                <StyledLabel>Email</StyledLabel>
                <StyledInput type="text" value={newEmail} onChange={event => setEmail((event.target.value))}/>

                <StyledButton>Submit</StyledButton>

                <StyledButton onClick={() => props.closeModal(false)}>Cancel</StyledButton>
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