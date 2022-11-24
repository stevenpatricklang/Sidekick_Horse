import React from 'react';
import {MemberModel} from "./MemberModel";

import styled from "styled-components";

type MemberCardProps = {
    member: MemberModel;
    fetchAllMembers: () => void
}

export default function MemberCard(props: MemberCardProps) {

    return (
        <>
            <StyledLi>
                <StyledName>
                    {props.member.firstName}&nbsp;{props.member.lastName}
                </StyledName>
                <StyledStreet>
                    {props.member.street}
                </StyledStreet>
                <StyledCity>
                    {props.member.zipcode}&nbsp;{props.member.city}
                </StyledCity>
                <StyledMail>
                    {props.member.email}
                </StyledMail>
            </StyledLi>
        </>
    );
}

const StyledLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .4), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .04);
`

const StyledName = styled.p`
  margin-bottom: 5px;
  padding: 4px;
  font-size: 1.1rem;
`
const StyledMail = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
const StyledStreet = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
const StyledCity = styled.p`
  padding: 4px 0 0 4px;
  font-size: 0.85rem;
`
