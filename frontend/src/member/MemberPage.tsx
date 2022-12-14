import React, {useEffect, useState} from "react";
import axios from "axios";
import {MemberModel} from "./MemberModel";
import styled from "styled-components";
import MemberBoard from "./MemberBoard";
import {NavLink} from "react-router-dom";


export default function MemberPage() {

    const [memberList, setMemberList] = useState<MemberModel[]>([])

    const baseUrl = '/api/members/';

    useEffect(() => {
        fetchAllMembers()
    }, [])

    const fetchAllMembers = () => {
        axios.get(baseUrl)
            .then((response) => response.data)
            .catch((error) => {
                console.log('[Error von GET]: =>' + error)
            })
            .then((data) => {
                setMemberList(data)
            })
    }

    const memberListOnBoard = memberList.map(member => {
        return <MemberBoard key={member.id}
                            member={member}
                            fetchAllMembers={fetchAllMembers}/>
    })

    return <>
        <StyledHeadline> Members List:</StyledHeadline>
        <StyledUl>{memberListOnBoard}</StyledUl>
        <StyledButton to="/members/add">Add Member</StyledButton>
    </>;
}

const StyledHeadline = styled.h1`
  font-size: 1.5rem;
  display: flex;
  justify-content: center;
  align-content: center;
`

const StyledUl = styled.ul`
  align-content: center;
  align-self: center;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  padding: 0;
`
const StyledButton = styled(NavLink)`
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
  border-radius: 10px;

  &:hover {
    background-color: var(--color-button-hover);
  }

  &:active {
    background-color: var(--color-button-active);
  }
`;
