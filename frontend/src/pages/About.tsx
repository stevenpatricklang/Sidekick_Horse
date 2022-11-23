import React from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";


export default function About() {
    return (

        <nav>
            <StyledButton><NavLink to="/add/members">Go to the Add Members page</NavLink></StyledButton>
            <br />
            <StyledButton><NavLink to="/members">Go to the Members List</NavLink></StyledButton>
            <br />
        </nav>
    );
}

const StyledButton = styled.button`
  margin: 3px;
  padding: 10px;
  width: 125px;
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
