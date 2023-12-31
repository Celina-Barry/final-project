import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import Campaigns from './Campaigns';

const StyledHome = styled.div`
    height: 100vh;  
    width: 100vw;
    background-repeat: no-repeat;
    background-position: center;
`
const ItemContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
`;

const ItemBox = styled.div`
    border: 1px solid #ddd;
    padding: 20px;
    width: 250px;
    text-align: center;
`;

const ItemImage = styled.img`
    max-width: 100%;
    height: auto;
`;

const ItemName = styled.p`
    font-weight: bold;
    margin-top: 10px;
`;

const ItemPrice = styled.p`
    margin-top: 5px;
    color: #777;
`;
const FormHeading = styled.h2`
    padding-left: 30px;
    font-size: 2.5rem;
    text-align: left;
    margin-bottom: 10px;
    color: var(--secondary-color);
    `;

const ItemLink = styled(Link)`
    display: inline-block;
    margin-top: 15px;
    padding: 5px 10px;
    background-color: #007bff;
    color: #fff;
    text-decoration: none;
    border-radius: 5px;

    &:hover {
    background-color: #0056b3;
    }
`;

const PageNumberContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;


const Homepage = () => {


    return (
    <StyledHome>
    <FormHeading>Upcoming Meetings </FormHeading>

        <ItemContainer>   
            <Campaigns />
        </ItemContainer>
      </StyledHome>

    );
};

export default Homepage;
