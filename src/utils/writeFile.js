const reader = require('xlsx');

function writeFile(data, fileName = 'data.xlsx'){
    const excelFile = fileName;
    const workbook = reader.readFile(excelFile);
    let header = {
        matricula: 'Matrícula',
        nome: 'Nome',
        sexo: 'Sexo',
        postoOuGraduacao: 'Posto ou Graduação',
        antiguidade: 'Antiguidade', // ?
        lotacaoRegiao: 'Lotação:Região', lotacaoBatalhao: 'Lotação:Batalhão', lotacaoCompanhia: 'Lotação:Campanhia', pelotao: 'Lotação:Pelotão', grupo: 'Lotação:Grupo', cidade: 'Lotação:Cidade' ,
        dataDeIngresso: 'Data de Ingresso',
        AnteriorTipo: 'Tempo Anterior: Tipo', anteriorTempoEmDias: 'Tempo Anterior: Tempo em dias' ,
        dataDeNascimento: 'Data de Nascimento',
        licencasEspeciaisAcumuladas: 'Licenças Especiais Acumuladas',
        comportamento: 'Comportamento',
        formacao: 'Formação',
        cursosDeFormacao: 'Cursos de Formação',
        cursosPm: 'Cursos PM',
        cursosCivis: 'Cursos Civis',
        idioma: 'Idioma',
        endereco: 'Endereço',
        ferias: 'Ferias',
        afastamentoTipo: 'Afastamento:Tipo', afastamentoInicio: 'Afastamento:Inicio', afastamentoFim: 'Afastamento:Fim',
        restricaoTipo: 'Restrição:Tipo', restricaoFim: 'Restrição:Fim' ,
    }
    let dataArr = [];

    dataArr.push(header);
    
   for(let i = 0; i < data.length; i++){

        let dataObj = {

            matricula: data[i].matricula,
            nome: data[i].nome,
            sexo: data[i].sexo,
            postoOuGraduacao: data[i].postoOuGraduacao,
            antiguidade: data[i].antiguidade,
            lotacaoRegiao: data[i].lotacao.regiao, lotacaoBatalhao: data[i].lotacao.batalhao, lotacaoCompanhia: data[i].lotacao.companhia, pelotao: data[i].lotacao.pelotao, grupo: data[i].lotacao.grupo, cidade: data[i].lotacao.cidade ,
            dataDeIngresso: data[i].dataDeIngresso,
            AnteriorTipo: data[i].tempoAnterior.tipo, anteriorTempoEmDias: data[i].tempoAnterior.tempoEmDias ,
            dataDeNascimento: data[i].dataDeNascimento,
            licencasEspeciaisAcumuladas: data[i].licencasEspeciaisAcumuladas,
            comportamento: data[i].comportamento,
            formacao: data[i].formacao,
            cursosDeFormacao: data[i].cursosDeFormacao[0],
            cursosPm: data[i].cursosPm[0],
            cursosCivis: data[i].cursosCivis[0],
            idioma: data[i].idioma[0],
            endereco: data[i].endereco,
            ferias: data[i].ferias,
            afastamentoTipo: data[i].afastamento.tipo, afastamentoInicio: data[i].afastamento.inicio, afastamentoFim: data[i].afastamento.fim,
            restricaoTipo: data[i].restricao.tipo, restricaoFim: data[i].restricao.fim ,

        }

        dataArr.push(dataObj);
   }
   console.log(dataArr);
    workbook.Sheets['Página1'] = reader.utils.json_to_sheet(dataArr, {skipHeader:'true'});
    reader.writeFile(workbook, excelFile); 
    
}

module.exports = writeFile;

