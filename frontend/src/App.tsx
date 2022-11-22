import React from 'react';
import './App.css';
import styled from "styled-components";
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/About";
import MembersOverview from "./member/MembersOverview";
import About from "./pages/About";


export default function App() {
  return <>
    <StyledHeader>
            <h1>Welcome to Sidekick Horses Administration</h1>
      </StyledHeader>

    <StyledMain>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/members" element={<MembersOverview />}/>
        <Route path="/about" element={<About />}/>
      </Routes>
    </StyledMain>

  <StyledFooter>
    <p>© 2022 Sidekick Horses</p>
  </StyledFooter>
  </>
}

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .04), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .04);
  padding: 10px;
  margin-bottom: 20px;`
  
  
const StyledMain = styled.main`
  margin: 50px;
  min-height: 200px;`
  
  
  
 const StyledFooter = styled.footer`
  display: flex;
  justify-content: center;
  margin: 10px;
  padding: 10px;
  font-size: 1rem;`
