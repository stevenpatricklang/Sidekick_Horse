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
                <h3>Name: </h3>
                <StyledName>{props.member.firstName} {props.member.lastName}</StyledName>

                <StyledStreet>Straße: {props.member.street}</StyledStreet>
                <StyledCity>
                    {props.member.zipcode}&nbsp;{props.member.city}
                </StyledCity>
                <StyledAge>
                    {props.member.age}
                </StyledAge>
                <StyledMail>
                    {props.member.email}
                </StyledMail>
                <StyledPhoneNumber>
                    {props.member.phoneNumber}
                </StyledPhoneNumber>
                <StyledBeginMembership>
                    {props.member.beginMembership}
                </StyledBeginMembership>
                <StyledRidingExperience>
                    {props.member.ridingExperience}
                </StyledRidingExperience>
                <StyledMembershipActive> Membership Active
                    {props.member.membershipActive}
                </StyledMembershipActive>
                <h3>Bankverbindung: </h3>
                <StyledAccountHolder>
                    {props.member.accountHolder}
                </StyledAccountHolder>
                <StyledIBAN>
                    {props.member.iban}
                </StyledIBAN>
                <StyledBankName>
                    {props.member.bankName}
                </StyledBankName>

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

const StyledDeleteMessage = styled.p`
  margin-bottom: 10px;
  padding: 8px;
  font-size: 0.95rem;
`
const StyledLabel = styled.label`
  font-size: 0.7rem;
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
  margin-bottom: 5px;
  padding: 4px;
  font-size: 1.1rem;
`
const StyledStreet = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
const StyledCity = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
const StyledAge = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
const StyledPhoneNumber = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
const StyledMail = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
const StyledBeginMembership = styled.p`
    padding: 4px 0 0 4px;
    font-size: 0.85rem;
`
const StyledRidingExperience = styled.p`
    padding: 4px 0 0 4px;
    font-size: 0.85rem;
`
const StyledMembershipActive = styled.p`
    padding: 4px 0 0 4px;
    font-size: 0.85rem;
`
const StyledAccountHolder = styled.p`
    padding: 4px 0 0 4px;
    font-size: 0.85rem;
`
const StyledIBAN = styled.p`
    padding: 4px 0 0 4px;
    font-size: 0.85rem;
`
const StyledBankName = styled.p`
    padding: 4px 0 0 4px;
    font-size: 0.85rem;
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
