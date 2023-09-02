import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

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

const ItemLink = styled.a`
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

const Campaigns = ({ category, currentPage }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
      const fetchItems = async () => {
 
        try {
          let url = '/items';
          if (category && currentPage) {
            url += `?page=${currentPage}&category=${category}`;
          }
          else if (category) {
            url += `?category=${category}`
          }
          else if (currentPage) {
            url += `?page=${currentPage}`;
          }
          console.log("items url fetch: ", url)
          const response = await fetch(url);
          const data = await response.json();
          setItems(data.data.items);
        } catch (error) {
          console.error('Error fetching items:', error);
        }
      };
  
      fetchItems();
    }, [category, currentPage]);  

    return (
        <ItemContainer>
        {items.map(item => (
            <ItemBox key={item._id}>
            <ItemImage src={item.imageSrc} alt={item.name} />
            <ItemName>{item.name}</ItemName>
            <ItemPrice>Price: {item.price}</ItemPrice>
        <ItemLink href={`/items/${item._id}`}>View Item</ItemLink>
    </ItemBox>
    ))}
    </ItemContainer>
  );
};

export default Campaigns;
