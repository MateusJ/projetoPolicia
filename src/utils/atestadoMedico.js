function atestadoMedico(values) {

    let soma = 0;

    let dataAtual = new Date();

    for (let i = 0; i < values.length; i++) {

        if (values[i].afastamento.tipo !== "" && values[i].afastamento.tipo !== "Férias" && values[i].afastamento.tipo !== "LE") {

            let dataInicio = new Date(checkDate(values[i].afastamento.inicio));


            let dataFim = new Date(checkDate(values[i].afastamento.fim));

            if(dataInicio <= dataAtual && dataFim >= dataAtual ){
                soma++;
            }
        }
    }
    return soma;
}

function checkDate(stringDate) {
    const [day, month, year] = stringDate.split('/');
    let fullDate = month+'/'+day+'/'+year;
    
    let date = new Date(fullDate);
    return date;
  }

export default atestadoMedico;