import React, {useState} from 'react';
import {MemberModel} from "./MemberModel";
import MemberModal from "./MemberModal";
import styled from "styled-components";
import axios from "axios";

type MemberCardProps = {
    member: MemberModel;
    fetchAllMembers: () => void
}

export default function MemberCard(props: MemberCardProps) {
    const [editModal, setEditModal] = useState(false)
    const [messageStatus, setMessageStatus] = useState("")

    function handleEdit() {
        setEditModal(!editModal)
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

    return (
        <>
            <StyledLi>
                <StyledName>Name: {props.member.firstName} {props.member.lastName}</StyledName>

                <StyledStreet>Straße: {props.member.street}</StyledStreet>

                <StyledCity> PLZ & Ort: {props.member.zipcode}&nbsp;{props.member.city}</StyledCity>

                <StyledAge>Alter: {props.member.age}</StyledAge>

                <StyledMail>E-Mail: {props.member.email}</StyledMail>

                <StyledPhoneNumber> Telefonnummer: {props.member.phoneNumber}</StyledPhoneNumber>
                <StyledHr/>
                <StyledBeginMembership>Beginn der Mitgliedschaft: {props.member.beginMembership}</StyledBeginMembership>

                <StyledRidingExperience> Reiterfahrung: {props.member.ridingExperience}</StyledRidingExperience>

                <StyledMembershipActive> Ist die Mitgliedschaft
                    aktiv: {props.member.membershipActive}</StyledMembershipActive>

                <StyledHr/>
                <StyledAccountHolder>Account Holder: {props.member.accountHolder}</StyledAccountHolder>

                <StyledIBAN>IBAN: {props.member.iban}</StyledIBAN>

                <StyledBankName> Name der Bank: {props.member.bankName}</StyledBankName>

                <StyledDiv>
                    <StyledButton onClick={handleEdit}>Update Member</StyledButton>
                    <StyledButton onClick={deleteMember}>Delete</StyledButton>
                </StyledDiv>
                {editModal &&
                    <MemberModal closeModal={handleEdit}
                                 member={props.member}
                                 fetchAllMembers={props.fetchAllMembers}/>}
                {messageStatus && <StyledDeleteMessage>{messageStatus}</StyledDeleteMessage>}
            </StyledLi>
        </>
    );
}


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
`
const StyledCity = styled.p`
  font-size: 0.95rem;
`
const StyledAge = styled.p`
  font-size: 0.95rem;
`
const StyledPhoneNumber = styled.p`
  font-size: 0.95rem;
`
const StyledMail = styled.p`
  font-size: 0.95rem;
`
const StyledBeginMembership = styled.p`
    font-size: 0.95rem;
`
const StyledRidingExperience = styled.p`
    font-size: 0.95rem;
`
const StyledMembershipActive = styled.p`
    font-size: 0.95rem;
`
const StyledAccountHolder = styled.p`
    font-size: 0.95rem;
`
const StyledIBAN = styled.p`
    font-size: 0.95rem;
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
