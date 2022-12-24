function divideByComma(values){
    if(values === undefined){
        return '';
    }
    const arr = values.split(',');

    return arr;
    }

function changeDate(value){

    if(value === undefined){
        return [];
    }
    let boleana = false;
    for(let char of value){
        if(char === '-')
        boleana = true;
    }
    if(boleana){
    const [year, month, day] = value.split('-');
    const result = [day, month, year].join('/');
    return result;
    }
    return value;
}

function checkUndefined(value){
    if(value === undefined){
        return '';
    }
    return value;
}

function addCop(data){
    if(!(data.hasOwnProperty('lotacao'))){
        data['lotacao'] = {};
    }
    if(!(data.hasOwnProperty('tempoAnterior'))){
        data['tempoAnterior'] = {};
        for(let properties in data){
            if(properties === "regiao" || 
            properties === "batalhao" || 
            properties === "companhia" || 
            properties === "pelotao" || 
            properties === "grupo" || 
            properties === "cidade")
            Object.defineProperty(data.lotacao, properties, {value: data[properties]})
            if(properties === "tempoEmDias")
            Object.defineProperty(data.tempoAnterior, properties, {value: data[properties]})
        } 
    }  
   

    const dataArr = {
        matricula: data.matricula,
        nome: data.nome,
        sexo: data.sexo,
        postoOuGraduacao: checkUndefined(data.postoOuGraduacao),
        antiguidade: checkUndefined(data.antiguidade),
        lotacao: { regiao: checkUndefined(data.lotacao.regiao), 
                batalhao: checkUndefined(data.lotacao.batalhao),
                companhia: checkUndefined(data.lotacao.companhia),
                pelotao: checkUndefined(data.lotacao.pelotao),
                grupo: checkUndefined(data.lotacao.grupo),
                cidade: checkUndefined(data.lotacao.cidade) },
        dataDeIngresso: changeDate(data.dataDeIngresso),
        tempoAnterior: { tempoAnterior: checkUndefined(data.tempoAnterior.tempoAnterior),
                        tempoEmDias: checkUndefined(data.tempoAnterior.tempoEmDias) },
        dataDeNascimento: changeDate(data.dataDeNascimento),
        licencasEspeciaisAcumuladas: checkUndefined(data.licencasEspeciaisAcumuladas),
        comportamento: checkUndefined(data.comportamento),
        formacao: checkUndefined(data.formacao),
        cursosDeFormacao: divideByComma(data.cursosDeFormacao),
        cursosPm: divideByComma(data.cursosPm),
        cursosCivis: divideByComma(data.cursosCivis),
        idioma: divideByComma(data.idioma),
        endereco: checkUndefined(data.endereco),
        ferias: data.ferias,
        afastamento: data.afastamento,
        restricao: data.restricao,
    }
    return dataArr;
}

module.exports = addCop;