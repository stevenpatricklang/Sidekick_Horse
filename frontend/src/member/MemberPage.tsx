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
         <p> </p>
         <h3>Members List:</h3>
         <StyledUl>{memberListOnBoard}</StyledUl>
         <p> </p>
         <StyledButton>
             <NavLink to="/">Home</NavLink></StyledButton>
         <StyledButton>
             <NavLink to="/members/add">Add Member</NavLink></StyledButton>
     </>;
}



const StyledUl = styled.ul`
  padding: 0;
  display: flex;
  justify-content: left;
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