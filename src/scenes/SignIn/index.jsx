import React, { useContext } from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DataContext from '../../contexts/DataContext';
import { Button } from "../../components/styled";
import { Container, StyledH3, Label, Input, Select, Span } from './styled';
import ReactTooltip from 'react-tooltip';
const addCop = require('../../utils/addCop');
const SignInPage = () => {
    const { data } = useContext(DataContext);


    const [values, setValues] = useState();
    const handleChangeValues = (value) => {
        setValues((prevValue)=>({

            ...prevValue,
            [value.target.name]: value.target.value,

        }))
    }
    const handleSubmit = event =>{
        values['ferias'] = '';
        values['afastamento'] = { tipo: '', inicio: '', fim: '' };
        values['restricao'] = { tipo: '', fim: '' };
        data.push(addCop(values));
        
        navigate('/');

    }

    const navigate = useNavigate();
    return (
        <>
            <Navbar
                title="Cadastro"
            />
            <StyledH3 onClick={() => navigate('/')}>Voltar para dashboard</StyledH3>
            <Container>
                <div>
                    
                        <Label>Matrícula:</Label>
                            <Input type="number" name="matricula" placeholder='Matrícula' onChange={handleChangeValues}/>
                        
                        <Label>Nome:</Label>
                            <Input type="text" name="nome" placeholder='Nome' onChange={handleChangeValues}/>
                        
                        <Label>Sexo:</Label>
                        <Select name="sexo" id="sexo" onChange={handleChangeValues}>
                            <option value="">Escolha...</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Masculino">Masculino</option>
                        </Select>
                        
                        <Label>Posto ou Graduação:</Label>
                            <Input type="text" name="postoOuGraduacao" placeholder='Posto ou Graduação' onChange={handleChangeValues}/>
                        
                        <Label>Antiguidade:</Label>
                            <Input type="number" name="antiguidade" placeholder='Antiguidade' onChange={handleChangeValues}/>

                        <Label>Lotacão:</Label>
                            <Input type="number" name="regiao" placeholder="Região"  onChange={handleChangeValues}/>
                            <Input type="number" name="batalhao" placeholder="Batalhão" onChange={handleChangeValues}/>
                            <Input type="number" name="companhia" placeholder="Companhia"  onChange={handleChangeValues}/>
                            <Input type="number" name="pelotao" placeholder="Pelotão" onChange={handleChangeValues}/>
                            <Input type="number" name="grupo" placeholder="Grupo" onChange={handleChangeValues}/>
                            <Input type="text" name="cidade" placeholder="Cidade" onChange={handleChangeValues}/>

                        <Label>Data de Ingresso:</Label>
                            <Input type="date" name="dataDeIngresso" onChange={handleChangeValues}/>

                        <Label>Tempo Anterior:</Label>
                            <Select name="tempoEmDias" id="tempoAnterior" onChange={handleChangeValues}>
                                <option value="">Escolha...</option>
                                <option value="Privado">Privado</option>
                                <option value="PublicoSC">Público SC</option>
                                <option value="PublicoOutros">Público outros</option>
                            </Select>
                            <Input type="number" name="tempoEmDias" placeholder='Tempo em dias'  onChange={handleChangeValues}/>

                        <Label>Data De Nascimento:</Label>
                            <Input type="date" name="dataDeNascimento"  onChange={handleChangeValues}/>

                        <Label>Licencas Especiais Acumuladas:</Label>
                            <Input type="number" name="licencasEspeciaisAcumuladas" placeholder='Licencas Especiais Acumuladas' onChange={handleChangeValues}/>

                        <Label>Comportamento:</Label>
                            <Input type="text" name="comportamento" placeholder='Comportamento' onChange={handleChangeValues}/>

                        <Label>Formação: </Label>
                        
                            <Input type="text" name="formacao" placeholder='Formação' onChange={handleChangeValues}/>

                        <Label>Cursos: <Span data-for="tooltipCursos" data-tip="Você pode adicionar mais cursos usando uma virgula para separa-los">?</Span></Label>
                        <ReactTooltip type='dark' place='right' id='tooltipCursos'/>
                            <Input type="text" name="cursosDeFormacao" placeholder='Cursos de Formação' onChange={handleChangeValues}/>
                            <Input type="text" name="cursosPm" placeholder='Cursos PM' onChange={handleChangeValues}/>
                            <Input type="text" name="cursosCivis" placeholder='Cursos Civis' onChange={handleChangeValues}/>

                        <Label>Idioma: <Span data-for="tooltipIdioma" data-tip="Você pode adicionar mais idiomas usando uma virgula para separa-los">?</Span></Label>
                        <ReactTooltip type='dark' place='right' id='tooltipIdioma'/>
                            <Input type="text" name="idioma" placeholder='Idiomas' onChange={handleChangeValues}/>

                        <Label>Endereço:</Label>
                            <Input type="text" name="endereco" placeholder='Endereço' onChange={handleChangeValues}/>
                            
                        <Button value="Submit" onClick={()=>handleSubmit()}> Cadastrar</Button>
                    
                </div>
            </Container>
        </>
    );
}

export default SignInPage;