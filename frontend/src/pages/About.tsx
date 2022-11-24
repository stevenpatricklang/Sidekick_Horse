import React from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";


export default function About() {
    return (
        <nav>
            <StyledDiv>
                <img src={process.env.PUBLIC_URL + '/p7.jpg'} alt="Logo von Pferden bw" width="850"/>
            </StyledDiv>
            <p> </p>
           <StyledButton><NavLink to="/members/add">Add Member</NavLink></StyledButton>
            <StyledButton><NavLink to="/members/list">Members List</NavLink></StyledButton>
            <p> </p>
            <p>Oida Daggl, Gscheidhaferl, Flaschn, Dreeghamml, Presssack, Schachtlhuba, Luada, hoit dei damische Goschn, Duitaff, Knedlfressa, Scheißbürschdl, Schachtlhuba, Krippnmandl, Klugscheissa, Bauernfünfa, oida Daggl, Zipfebritschn, krummhaxata Goaßbog, Zwedschgndatschi, gscherte Nuss, Griggalheudda, Schanial, Hubbfa, Hosnscheissa, gscherte Nuss, Schuibuamtratza, Kreizdeifi, Zwedschgnmanndl, oida Daggl, Radlfahra, Saggrament, Schoaßwiesn, Schlawina, Auftreiwa, Zuagroasta, Geizgroogn, Wuidsau, i werd da zoagn, wo da Bartl an Most hoid, eigschnabbda, Hopfastanga, Charaktasau, Wuidsau, Wurznsepp, Hemmadbiesla!
               </p>
            <p> </p>
        </nav>
    );
}

const StyledDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .04), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .04);`

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
