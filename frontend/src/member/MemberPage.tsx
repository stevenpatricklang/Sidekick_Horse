import React, {useEffect, useState} from "react";
import axios from "axios";
import {MemberModel} from "./MemberModel";
import styled from "styled-components";
import MemberBoard from "./MemberBoard";
import {NavLink} from "react-router-dom";

const baseUrl = '/api/members/';

export default function MemberPage() {
    const [memberList, setMemberList] = useState<MemberModel[]>([])

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
        return <MemberBoard key={member.id} member={member} fetchAllMembers={fetchAllMembers}/>
    })


     return <>
         <StyledButton>
             <NavLink to="/">Home</NavLink></StyledButton>
         <StyledButton>
             <NavLink to="/add/members">Add Member</NavLink></StyledButton>
         <StyledSection>
             <h3>Members List:</h3>
             <StyledUl>{memberListOnBoard}</StyledUl>
         </StyledSection>
     </>;
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 8px 20px 25px 20px;
  border: 1px solid rgba(10 10 10 3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, 4), 0 .0625rem .3125rem 0 rgba(0, 0, 0, 4);
  background-color: #e3e3e3;
`

const StyledUl = styled.ul`
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const StyledButton = styled.button`
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
  border-radius: 10px;

  &:hover {
    background-color: var(--color-button-hover);
  }

  &:active {
    background-color: var(--color-button-active);
  }
`;