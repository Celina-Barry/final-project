import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import PastCampaigns from './PastCampaigns';


const ItemContainer = styled.div`
    align-items: center;
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


const PastMeetingsPage = () => {


    return (
    <div>
    <ItemContainer>   
        <PastCampaigns />
    </ItemContainer>
      </div>

    );
};

export default PastMeetingsPage;