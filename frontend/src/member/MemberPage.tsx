import React, {useEffect, useState} from "react";
import axios from "axios";
import {MemberModel} from "./MemberModel";
import styled from "styled-components";

class MemberBoard extends React.Component<{ guest: any, fetchAllGuests: any }> {
    render() {
        return null;
    }
}

export default function MemberPage() {
    const [memberList, setMemberList] = useState<MemberModel[]>([])

    useEffect(() => {
        fetchAllMembers()
    }, [])

    const fetchAllMembers = () => {
        axios.get("/api/members")
            .then((response) => response.data)
            .catch((error) => {
                console.log('[Error von GET]: =>' + error)
            })
            .then((data) => {
                setMemberList(data)
            })
    }

    const memberListOnBoard = memberList.map(member => {
        return <MemberBoard key={member.id} member={member} fetchAllGuests={fetchAllMembers}/>
    })


    return <>
        <StyledSection>
            <h2>Members List:</h2>
            <StyledUl>{memberListOnBoard}</StyledUl>
        </StyledSection>
    </>;
}

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  margin: 10px;
  padding: 8px 20px 25px 20px;
  border: 1px solid rgba(10 10 10 0.3);
  border-radius: 1pc;
  box-shadow: 0 .0625rem .5rem 0 rgba(0, 0, 0, .4), 0 .0625rem .3125rem 0 rgba(0, 0, 0, .4);
`

const StyledUl = styled.ul`
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`