import React from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";


export default function About() {
    return <>
        <StyledDiv1>
            <StyledDiv>
                <StyledImage src={process.env.PUBLIC_URL + '/horse1.png'} alt="Logo von Pferden bw"/></StyledDiv>
            <br></br>
            <StyledNav>
                <StyledButton to="/members/add">Add Member</StyledButton>
                <StyledButton to="/members/list">Members List</StyledButton>
            </StyledNav>
        </StyledDiv1>
    </>
}

const StyledDiv1 = styled.div`
   justify-content: center;
  align-content: center;
`

const StyledImage = styled.img`
  width: 65vw;
`
const StyledDiv = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: center;
  align-content: center;
`
const StyledNav = styled.nav`
  display: flex;
  justify-content: center;
  align-content: center;
`
const StyledButton = styled(NavLink)`
  font-size: 1.1rem;
  margin: 10px;
  padding: 15px;
  width: 175px;
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
