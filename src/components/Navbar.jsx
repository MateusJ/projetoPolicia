import React from "react";
import { Title, Subtitle } from "./styled";

const Navbar = ({
  title = "POLÍCIA MILITAR DE SANTA CATARINA",
  subtitle = "19º Batalhão de Polícia Militar",
}) => {
  return (
    <>
      <Title>{title}</Title>
      <Subtitle>{subtitle}</Subtitle>
    </>
  );
};

export default Navbar;
