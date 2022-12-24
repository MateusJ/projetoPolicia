import React, { useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import DataContext from '../../contexts/DataContext';
import { Container, StyledH3 } from './styled';
import { Button } from "../../components/styled";

const DetailsPage = () => {
    const matriculaId = useLoaderData();
    const navigate = useNavigate();
    const { data: copsData, setData } = useContext(DataContext);
    const data = copsData.find(el => el.matricula === matriculaId);
    
    const handleEdit = () =>{
        navigate(`/editar/${matricula}`);
    };
    const handleExcluir = () =>{
        navigate('/');
        setData(copsData.splice(copsData.indexOf(data),1));
    };

    if (!data) {
        return (
            <><Navbar
                title="PÁGINA DE DETALHES DO POLICIAL"
                subtitle='Não encontrado'
            />              <StyledH3 onClick={() => navigate('/')}>Voltar para dashboard</StyledH3>
            </>);

    }
    const {
        nome,
        afastamento,
        antiguidade,
        comportamento,
        cursosCivis,
        cursosDeFormacao,
        cursosPm,
        dataDeIngresso,
        dataDeNascimento,
        endereco,
        ferias,
        formacao,
        licencasEspeciaisAcumuladas,
        matricula,
        postoOuGraduacao,
        restricao,
        tempoAnterior,
        idioma,
        lotacao,
        sexo,
    } = data;
    return (
        <>
            <Navbar
                title="PÁGINA DE DETALHES DO POLICIAL"
                subtitle={`${nome} - ${matricula} (${sexo})`}
            />
            <StyledH3 onClick={() => navigate('/')}>Voltar para dashboard</StyledH3>
            <Container>
                <div>
                    <p>Lotação:
                        <br />Região: {lotacao.regiao},
                        <br />Batalhão: {lotacao.batalhao},
                        <br />Companhia: {lotacao.companhia},
                        <br />Pelotão: {lotacao.pelotao},
                        <br />Grupo: {lotacao.grupo},
                        <br />Cidade: {lotacao.cidade}
                    </p>
                    <p>Restrições:
                        <br />
                        {restricao.length > 0 ?
                            restricao.map(r => `Tipo: ${r.tipo}, Fim: ${r.fim}`)
                            : 'Nenhuma'}</p>
                    <p>
                        Data de Ingresso: {dataDeIngresso}
                        <br />
                        Data de Nascimento: {dataDeNascimento}
                    </p>
                    <p>Endereço: <br />{endereco}</p>
                </div>
                <div>
                    <p>Afastamento - Tipo: {afastamento.tipo}, Inicio: {afastamento.inicio}, Fim: {afastamento.fim}</p>
                    <p>Liçencas Especiais Acumuladas: {licencasEspeciaisAcumuladas}</p>
                    <p>Posto ou Graduação: {postoOuGraduacao}</p>
                    <p>Antiguidade: {antiguidade}</p>
                    <p>Férias: {ferias}</p>
                    <p>Formação: {formacao}</p>
                    <p>Comportamento: {comportamento}</p>
                    <p>Tempo Anterior:
                        <br />Privado: {tempoAnterior.privado},
                        <br />Público (SC): {tempoAnterior.publicoSc},
                        <br />Público (Outros): {tempoAnterior.publicoOutros}
                    </p>
                </div>
                <div>
                    <h4>- Lista de Cursos</h4>
                    <p>Civis: {cursosCivis}</p>
                    <p>De Formação: {cursosDeFormacao.map(item => `${item}, `)}</p>
                    <p>PM: {cursosPm.map(item => item)}</p>
                    <p>idioma: {idioma}</p>
                </div>
            </Container>
            <Button value="Submit" onClick={()=>handleEdit()}> Editar cadastro</Button>
            <Button value="Submit" onClick={()=>handleExcluir()}> Excluir cadastro</Button>
        </>
    );
}

export default DetailsPage;