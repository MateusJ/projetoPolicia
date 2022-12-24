function mediaIdade(values) {

    let dataAtual = new Date();
    let anoAtual = dataAtual.getFullYear();
    let mesAtual = dataAtual.getMonth();

    let idade = 0;
    let soma = 0;

    for (let i = 0; i < values.length; i++) {
        let data = values[i].dataDeNascimento;
        let ano = data.split('/')[2];
        let mes = data.split('/')[1];

        idade = anoAtual - ano;

        if (mesAtual >= mes) {
            soma = soma + idade;
        } else {
            soma = soma + idade - 1;
        }


    }
    const resultado = parseFloat((soma / values.length).toFixed(2));
    return isNaN(resultado) ? '-' : resultado;
}

export default mediaIdade;