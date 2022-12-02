import React from 'react';
import './App.css';
import styled from "styled-components";
import {NavLink, Route, Routes} from "react-router-dom";
import Homepage from "./pages/About";
import AddMemberForm from "./member/AddMemberForm";
import MemberPage from "./member/MemberPage";


export default function App() {
    return <>
        <StyledHeader>

            <StyledButton to="/">Home</StyledButton>
            <h1>Welcome to Sidekick Horse Administration</h1>
            <StyledDiv>

            </StyledDiv>
        </StyledHeader>

        <StyledMain>
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/members/add" element={<AddMemberForm/>}/>
                <Route path="/members/list" element={<MemberPage/>}/>
            </Routes>
        </StyledMain>

        <StyledFooter>
            <p>© 2022 Sidekick Horses</p>
        </StyledFooter>
    </>
}



const StyledDiv = styled.div`
  width: 160px;
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

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  padding: 10px;
  margin-bottom: 20px;
  background-color: var(--color-background);`


const StyledMain = styled.main`
  margin: 50px;
  min-height: 200px;
  background-color: var(--color-background);`


const StyledFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  font-size: 1rem;
  background-color: var(--color-background-footer);
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, 0);
`
