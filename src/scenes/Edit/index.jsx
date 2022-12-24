import React, { useContext } from "react";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { Button } from "../../components/styled";
import DataContext from "../../contexts/DataContext";
import { Container, StyledH3, Label, Input, Select, Span } from "./styled";
import ReactTooltip from 'react-tooltip';
const addCop = require('../../utils/addCop');
const EditPage = () => {
    const matriculaId = useLoaderData();
    const { data: copsData } = useContext(DataContext);
    const data = copsData.find((el) => el.matricula === matriculaId);
    const [values, setValues] = useState();
    const navigate = useNavigate();
    if (!data) {
      navigate("/");
    }
    const handleDate = (date) => {
      if(date !== undefined){
        let [day, month, year] = date.split('/');
        if(day.length < 2)
        day = "0" + day;
        if(month.length < 2)
        month = "0" + month;
        const result = [year, month, day].join('-');
        return result;
      }
      return ''; 
    }
    const handleChoice = () => {
      let choice;
      if(document.getElementById("tempoAnterior") !== null){
      let elem = document.getElementById("tempoAnterior");
      choice = elem.options[elem.selectedIndex].value;
      }
      switch (choice) {
        case "":
          return '';
        case "Privado":
          return data.tempoAnterior.tempoEmDias;
        case "PublicoSC":
          return data.tempoAnterior.tempoEmDias;
        case "PublicoOutros":
          return data.tempoAnterior.tempoEmDias;      
        default:
          return '';
      }
    }
    const handleChangeValues = (value) => {
        setValues((prevValue) => ({
            ...prevValue,
            [value.target.name]: value.target.value,
        }));
    };
    const handleSubmit = () => {
      let index = 0;
      for(let i = 0; i < copsData.length; i++){
        if(copsData[i].matricula === matriculaId)
        index = i;
      }
      let i =0;
      for(let properties in data){
        if(!(values.hasOwnProperty(Object.keys(data)[i]))){
          if(properties === 'cursosDeFormacao' ||
            properties === 'cursosCivis' ||
            properties === 'cursosPm' ||
            properties === 'idioma'){
            values[properties] = data[properties][0];
          }else{
            values[properties] = data[properties];
          }
        }
        i++;
      }
      copsData[index] = (addCop(values))
      navigate('/');
    }  
    return (
      <>
        <Navbar title={`Editando matrícula ${matriculaId}`} />
        <StyledH3 onClick={() => navigate('/')}>Voltar para dashboard</StyledH3>
        <Container>
            <div>
              <Label>Matrícula:</Label>
                  <Input type="number" name="matricula" placeholder='Matrícula' defaultValue={data.matricula} onChange={handleChangeValues}/>
              
              <Label>Nome:</Label>
                  <Input type="text" name="nome" placeholder='Nome' defaultValue={data.nome} onChange={handleChangeValues}/>
              
              <Label>Sexo:</Label>
              <Select name="sexo" id="sexo" defaultValue={data.sexo} onChange={handleChangeValues}>
                  <option value="">Escolha...</option>
                  <option value="Feminino">Feminino</option>
                  <option value="Masculino">Masculino</option>
              </Select>
              
              <Label>Posto ou Graduação:</Label>
                  <Input type="text" name="postoOuGraduacao" placeholder='Posto ou Graduação' defaultValue={data.postoOuGraduacao} onChange={handleChangeValues}/>
              
              <Label>Antiguidade:</Label>
                  <Input type="number" name="antiguidade" placeholder='Antiguidade' defaultValue={data.antiguidade} onChange={handleChangeValues}/>

              <Label>Lotacão:</Label>
                  <Input type="number" name="regiao" placeholder="Região" defaultValue={data.lotacao.regiao} onChange={handleChangeValues}/>
                  <Input type="number" name="batalhao" placeholder="Batalhão" defaultValue={data.lotacao.batalhao} onChange={handleChangeValues}/>
                  <Input type="number" name="companhia" placeholder="Companhia" defaultValue={data.lotacao.companhia} onChange={handleChangeValues}/>
                  <Input type="number" name="pelotao" placeholder="Pelotão" defaultValue={data.lotacao.pelotao} onChange={handleChangeValues}/>
                  <Input type="number" name="grupo" placeholder="Grupo" defaultValue={data.lotacao.grupo} onChange={handleChangeValues}/>
                  <Input type="text" name="cidade" placeholder="Cidade" defaultValue={data.lotacao.cidade} onChange={handleChangeValues}/>

              <Label>Data de Ingresso:</Label>
                  <Input type="date" name="dataDeIngresso" defaultValue={handleDate(data.dataDeIngresso)} onChange={handleChangeValues}/>

              <Label>Tempo Anterior:</Label>
                  <Select name="tempoAnterior" id="tempoAnterior" onChange={handleChangeValues}>
                      <option value="">Escolha...</option>
                      <option value="Privado">Privado</option>
                      <option value="PublicoSC">Público SC</option>
                      <option value="PublicoOutros">Público outros</option>
                  </Select>
                  <Input type="number" name="tempoEmDias" placeholder='Tempo em dias' defaultValue={handleChoice()}  onChange={handleChangeValues}/>

              <Label>Data De Nascimento:</Label>
                  <Input type="date" name="dataDeNascimento" defaultValue={handleDate(data.dataDeNascimento)} onChange={handleChangeValues}/>

              <Label>Licencas Especiais Acumuladas:</Label>
                  <Input type="number" name="licencasEspeciasisAcumuladas" placeholder='Licencas Especiais Acumuladas' defaultValue={data.licencasEspeciaisAcumuladas} onChange={handleChangeValues}/>

              <Label>Comportamento:</Label>
                  <Input type="text" name="comportamento" placeholder='Comportamento' defaultValue={data.comportamento} onChange={handleChangeValues}/>

              <Label>Formação: </Label>
              
                  <Input type="text" name="formacao" placeholder='Formação' defaultValue={data.formacao} onChange={handleChangeValues}/>

              <ReactTooltip type='dark' place='right' id='tooltipCursos'/>
                  <Input type="text" name="cursosDeFormacao" placeholder='Cursos de Formação' defaultValue={data.cursosDeFormacao} onChange={handleChangeValues}/>
                  <Input type="text" name="cursosPm" placeholder='Cursos PM' defaultValue={data.cursosPm} onChange={handleChangeValues}/>
                  <Input type="text" name="cursosCivis" placeholder='Cursos Civis' defaultValue={data.cursosCivis} onChange={handleChangeValues}/>

              <ReactTooltip type='dark' place='right' id='tooltipIdioma'/>
                  <Input type="text" name="idioma" placeholder='Idiomas' defaultValue={data.idioma} onChange={handleChangeValues}/>

              <Label>Endereço:</Label>
                  <Input type="text" name="endereco" placeholder='Endereço' defaultValue={data.endereco} onChange={handleChangeValues}/>
              <Button value="Submit" onClick={()=>handleSubmit()}>Salvar alterações</Button>
              <Button onClick={() => navigate(`/detalhes/${matriculaId}`)}>Voltar</Button>
            </div>
        </Container>
      </>
    );
};

export default EditPage;
