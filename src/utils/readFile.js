// Requiring the module
const reader = require('xlsx');
const fs = require('fs');

const getPoliciais = (cop) => ({

   matricula: cop[0],
   nome: cop[1],
   sexo: cop[2],
   postoOuGraduacao: cop[3],
   antiguidade: cop[4],
   lotacao: { regiao: cop[5], batalhao: cop[6], companhia: cop[7], pelotao: cop[8], grupo: cop[9], cidade: cop[10] },
   dataDeIngresso: cop[11],
   tempoAnterior: { tipo: cop[12], tempoEmDias: cop[13] },
   dataDeNascimento: cop[14],
   licencasEspeciaisAcumuladas: cop[15],
   comportamento: cop[16],
   formacao: cop[17],
   cursosDeFormacao: [cop[18]],
   cursosPm: [cop[19]],
   cursosCivis: [cop[20]],
   idioma: [cop[21]],
   endereco: cop[22],
   ferias: cop[23],
   afastamento: { tipo: cop[24], inicio: cop[25], fim: cop[26] },
   restricao: { tipo: cop[27], fim: cop[28] },

})

function readFile(fileName = 'src/utils/data.xlsx') {
   const readOpts = { // <--- need these settings in readFile options
      cellText: false,
      cellDates: true
   };
   const file = reader.read(fs.readFileSync(fileName), readOpts);
   const data = []

   const sheets = file.SheetNames

   for (let i = 0; i < sheets.length; i++) {
      const temp = reader.utils.sheet_to_json(
         file.Sheets[file.SheetNames[i]], { defval: '', raw: false, blankrows: true, dateNF: 'd"/"m"/"yyyy' })
      temp.forEach((res) => {
         data.push(res)
      })
   }

   const result = [];
   for (let i = 0; i < data.length; i++) {
      const cop = Object.values(data[i]);
      result.push(getPoliciais(cop));
   }
   return result;
}

module.exports = readFile;




