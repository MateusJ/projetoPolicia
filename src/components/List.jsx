import React from "react";
import styled from "styled-components";

const List = ({ columns = [], data = [], onRowClick }) => {
  return (
    <Wrapper>
      <StyledTable>
        <tbody>
          <tr>
            {columns.map((t) => (
              <th key={t}>{t}</th>
            ))}
          </tr>
          {data.map((val, idx) => {
            return (
              <tr
                key={val?.[0]}
                style={{ cursor: onRowClick && "pointer" }}
                onClick={() => onRowClick(val)}
              >
                {val.map((subVal) => (
                  <td key={subVal}>{subVal}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  height:300px;
  overflow: auto;
  margin: 0 50px;
`;

const StyledTable = styled.table`
  font-family: Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  min-width: 280px;
  td,
  th {
    border: 1px solid #ddd;
    padding: 8px;
  }

  th {
    position: -webkit-sticky;
    position: sticky;
    top: 0;
    padding-top: 12px;
    padding-bottom: 12px;
    text-align: left;
    background-color: #04aa6d;
    color: white;
  }

  tr:nth-child(even) {
    background-color: #f2f2f2;
  }

  tr:hover {
    background-color: #ddd;
  }
`;

export default List;
