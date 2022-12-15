import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import styled from "styled-components";
import {Route, Routes, useNavigate} from "react-router-dom";
import About from "./pages/About";
import AddMemberForm from "./member/AddMemberForm";
import MemberPage from "./member/MemberPage";
import axios from "axios";
import LoginPage from "./security/LoginPage";
import RegisterPage from "./security/RegisterPage";


export default function App() {

    const [username, setUsername] = useState<string>();
    const fetchUsername = useCallback(() => {
        axios.get("/api/app-users/me")
            .then(response => response.data)
            .then(setUsername)
    }, [])
    useEffect(fetchUsername, [fetchUsername])

    const navigate = useNavigate();

    function logout() {
        axios.get("/api/app-users/logout")
            .then(fetchUsername)
        navigate("/")
    }

    const setGoToHome = () => {
        navigate("/")
    }

    if (username === undefined) {
        return <>Loading...</>
    }
    if (username === 'anonymousUser')

        return <>
            <StyledHeader>
                <h1>Sidekick Horse Administration</h1>
            </StyledHeader>

            <StyledMain>
                <Routes>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/" element={<LoginPage fetchUsername={fetchUsername}/>}/>
                </Routes>
            </StyledMain>

            <StyledFooter>
                <p>© 2022 Sidekick Horses</p>
            </StyledFooter>
        </>

    return <>

        <StyledHeader1>
            <StyledButton onClick={setGoToHome}>Home</StyledButton>
            <StyledH1>Sidekick Horse Administration</StyledH1>
            <StyledButton onClick={logout}>Logout</StyledButton>
        </StyledHeader1>

        <StyledMain>
            <Routes>
                <Route path="/members/add" element={<AddMemberForm/>}/>
                <Route path="/" element={<About/>}/>
                <Route path="/members/list" element={<MemberPage/>}/>
            </Routes>
        </StyledMain>

        <StyledFooter>
            <p>© 2022 Sidekick Horses</p>
        </StyledFooter>
    </>
}

const StyledH1 = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`
const StyledButton = styled.button`
  font-size: 1.0rem;
  margin: 5px;
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
  justify-content: center;
  align-items: center;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  padding: 10px;
  margin-bottom: 20px;
  background-color: var(--color-background);
  `
const StyledHeader1 = styled.header`
  display: flex;
  justify-content: space-around;
  align-items: center;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  padding: 10px;
  margin-bottom: 20px;
  background-color: var(--color-background);
  `
const StyledMain = styled.main`
  display: flex;
flex-direction: column;
  align-items: center;
  justify-content: center;
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
