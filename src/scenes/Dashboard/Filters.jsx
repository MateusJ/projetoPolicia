import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import DataContext from "../../contexts/DataContext";
import { Input } from "../SignIn/styled";

const Filters = () => {
  const [searchKey, setName] = useState("");
  const { setFilterData, data } = useContext(DataContext);
  useEffect(() => {
    const filtered = data?.filter((el) => {
      //Este codigo realiza (nº policias * nº colunas tabela) 14 * 38  = 532 comparações no pior caso (Quando não há correspondência)//
      for(let properties in el){
        if(typeof el[properties] === "object"){
          for(let props in el[properties]){
            if(el[properties][props].toString().toUpperCase().includes(searchKey.toString().toUpperCase()))
            return true;
          }
        }
        if(el[properties].toString().toUpperCase().includes(searchKey.toString().toUpperCase()))
        return true;
      }
      return false;
    }
    );
    setFilterData(filtered);
      }, [searchKey, data, setFilterData]);
  return (
    <Wrapper>
      <Input
        value={searchKey}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Buscar por nome, matricula..."
        style={{ minWidth: '200px' }}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

export default Filters;
