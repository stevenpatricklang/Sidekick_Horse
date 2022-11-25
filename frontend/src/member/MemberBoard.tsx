import React, {useState} from 'react';
import {MemberModel} from "./MemberModel";
import MemberModal from "./MemberModal";
import styled from "styled-components";

type MemberCardProps = {
    member: MemberModel;
    fetchAllMembers: () => void
}

export default function MemberCard(props: MemberCardProps) {
    const [editModal, setEditModal] = useState(false)

    const handleEdit = () => {
        setEditModal(!editModal)
    }

    const closeModal = () => {
        setEditModal(false)
    }

    return (
        <>
            <StyledLi>
                <StyledName>
                    {props.member.firstName}&nbsp;{props.member.lastName}
                </StyledName>
                <StyledStreet>
                    {props.member.street}
                </StyledStreet>
                <StyledCity>
                    {props.member.zipcode}&nbsp;{props.member.city}
                </StyledCity>
                <StyledMail>
                    {props.member.email}
                </StyledMail>
                <StyledDiv>
                    <StyledButton onClick={handleEdit}>Update Member</StyledButton>
                </StyledDiv>
                {editModal &&
                    <MemberModal closeModal={closeModal}
                                 member={props.member}
                                 fetchAllMembers={props.fetchAllMembers}/>}
            </StyledLi>
        </>
    );
}

const StyledLi = styled.li`
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
  margin-bottom: 5px;
  padding: 4px;
  font-size: 1.1rem;
`
const StyledMail = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
const StyledStreet = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
const StyledCity = styled.p`
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
