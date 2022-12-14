import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import styled from "styled-components";
import {Route, Routes} from "react-router-dom";
import About from "./pages/About";
import AddMemberForm from "./member/AddMemberForm";
import MemberPage from "./member/MemberPage";
import axios from "axios";
import SecuredPage from "./security/SecuredPage";
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
                    {<Route path="/register" element={<RegisterPage/>}></Route>}
                    {<Route path="/" element={<LoginPage fetchUsername={fetchUsername}/>}></Route>}
                    <Route path="/admin" element={<About/>}/>
                    <Route path="/members/add" element={<AddMemberForm/>}/>
                    <Route path="/members/list" element={<MemberPage/>}/>
                </Routes>
            </StyledMain>

            <StyledFooter>
                <p>© 2022 Sidekick Horses</p>
            </StyledFooter>
        </>


    return <>
        <SecuredPage fetchUsername={fetchUsername} setUsername={setUsername}/>
    </>
}

const StyledHeader = styled.header`
  display: flex;
    justify-content: center;
  align-items: center;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .5), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .5);
  padding: 10px;
  margin-bottom: 20px;
  background-color: var(--color-background);`


const StyledMain = styled.main`
  display: flex;
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
