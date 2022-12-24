import React, { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import DataContext from "../../contexts/DataContext";
import { Container, Label, Input } from "./styled";
import { Button } from "../../components/styled";
const LoginPage = () => {
  const { session, setSession, handleLogin } = useContext(DataContext);
  const [values, setValues] = useState();

  const handleChangeValues = (value) => {
    setValues((prevValue) => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };
  const handleSubmit = (authenticate = false) => {
    if (!authenticate) {
      setSession({ user: null, type: "VISITOR" });
      navigate("/");
      return;
    }
    handleLogin(values);
  };

  const navigate = useNavigate();

  if (session?.user) {
    navigate("/");
  }

  return (
    <>
      <Navbar title="Login" />
      <Container>
        <div>
          <Label>Nome:</Label>
          <Input
            type="text"
            name="nome"
            placeholder="Nome"
            onChange={handleChangeValues}
          />

          <Label>Senha:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Senha"
            onChange={handleChangeValues}
          />
          {session?.error && (
            <p style={{ color: "red" }}>Erro: {session.error}</p>
          )}

          <Button onClick={() => handleSubmit(true)}>Entrar</Button>
          <div style={{ paddingTop: "24px" }}>
            <Button onClick={() => handleSubmit()}>
              Entrar como visitante
            </Button>
          </div>
        </div>
      </Container>
    </>
  );
};

export default LoginPage;
