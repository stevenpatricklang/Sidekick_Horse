import React from 'react';
import {NavLink} from "react-router-dom";
import styled from "styled-components";


export default function About() {
    return (
        <nav>
           <StyledButton><NavLink to="/add/members">Go to the Add Members page</NavLink></StyledButton>
            <br />
            <StyledButton><NavLink to="/list/members">Go to the Members List</NavLink></StyledButton>
            <br />
            <p>Oida Daggl, Gscheidhaferl, Flaschn, Dreeghamml, Presssack, Schachtlhuba, Luada, hoit dei damische Goschn, Duitaff, Knedlfressa, Scheißbürschdl, Schachtlhuba, Krippnmandl, Klugscheissa, Bauernfünfa, oida Daggl, Zipfebritschn, krummhaxata Goaßbog, Zwedschgndatschi, gscherte Nuss, Griggalheudda, Schanial, Hubbfa, Hosnscheissa, gscherte Nuss, Schuibuamtratza, Kreizdeifi, Zwedschgnmanndl, oida Daggl, Radlfahra, Saggrament, Schoaßwiesn, Schlawina, Auftreiwa, Zuagroasta, Geizgroogn, Wuidsau, i werd da zoagn, wo da Bartl an Most hoid, eigschnabbda, Hopfastanga, Charaktasau, Wuidsau, Wurznsepp, Hemmadbiesla!
               </p>
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
