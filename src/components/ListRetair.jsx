import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import DataContext from "../contexts/DataContext";
import List from "./List";

const CINCO_ANOS = 1826;
const TRINTA_E_CINCO_ANOS = 12783;

//Transforma uma string do tipo "31/12/1900" em new Date
function checkDate(stringDate) {
  const [dateDay, dateMonth, dateYear] = stringDate.split("/");
  const date = new Date(dateYear, dateMonth, dateDay);
  return date;
}

//Retorna a diferença, em dias, entre uma data e outro(como padrão o dia de hoje)
function daysDiff(checkBool, date, today = new Date()) {
  if (checkBool) date = checkDate(date);
  return Math.floor((today - date) / 86400000); //Resultado é dado em milisegundos, divição para retornar resultado em dias
}

function prepararLista(data) {
  let nomes = [],
    dataArr = [],
    date2013 = new Date("2013", "12", "19"),
    date2006 = new Date("2006", "09", "01"),
    datePedagio = new Date("2021", "12", "31");

  for (let i = 0; i < data.length; i++) {
    nomes.push([
      data[i].nome,
      data[i].sexo,
      daysDiff(true, data[i].dataDeIngresso),
      Number(data[i].tempoAnterior.tempoEmDias), // +
      //Number(data[i].tempoAnterior) +
      // Number(data[i].tempoAnterior),
      Number(data[i].licencasEspeciaisAcumuladas),
    ]);
  }
  //TODOS OS CALCULOS ABAIXO SÃO FEITOS EM DIAS
  for (let i = 0; i < nomes.length; i++) {
    const [
      nome,
      sexo,
      daysDiffDataIngresso,
      tempoAnterior,
      licencasEspeciaisAcumuladas,
    ] = nomes[i];

    let pedagio4 = false;
    if (sexo === "M") {
      if (daysDiffDataIngresso >= daysDiff(false, date2013)) {
        nomes[i].push(
          TRINTA_E_CINCO_ANOS - daysDiffDataIngresso - tempoAnterior
        ); //35 anos menos dias desde o ingresso menos tempo anterior
      } else {
        if (tempoAnterior > CINCO_ANOS) {
          nomes[i].push(
            TRINTA_E_CINCO_ANOS - daysDiffDataIngresso - CINCO_ANOS
          ); //35 anos menos dias desde o ingresso menos 5 anos tempo anterior
        } else {
          nomes[i].push(
            TRINTA_E_CINCO_ANOS - daysDiffDataIngresso - tempoAnterior
          ); //35 anos menos dias desde o ingresso menos tempo anterior
        }
        if (daysDiffDataIngresso < 10957)
          //30 anos de minimo tempo militar
          pedagio4 = true;
      }
    } else {
      if (daysDiffDataIngresso < daysDiff(false, date2013)) {
        if (nomes[i][3] > CINCO_ANOS) {
          nomes[i].push(
            TRINTA_E_CINCO_ANOS - daysDiffDataIngresso - CINCO_ANOS
          ); //35 anos menos dias desde o ingresso menos 5 anos tempo anterior
        } else {
          nomes[i].push(
            TRINTA_E_CINCO_ANOS - daysDiffDataIngresso - tempoAnterior
          ); //35 anos menos dias desde o ingresso menos tempo anterior
        }
        if (daysDiffDataIngresso < 10957)
          //30 anos de minimo tempo militar
          pedagio4 = true;
      } else if (daysDiffDataIngresso < daysDiff(false, date2006)) {
        if (tempoAnterior > 7305) {
          //20 anos
          nomes[i].push(TRINTA_E_CINCO_ANOS - daysDiffDataIngresso - 7305); //35 anos menos dias desde o ingresso menos 20 anos tempo anterior
        } else {
          nomes[i].push(
            TRINTA_E_CINCO_ANOS - daysDiffDataIngresso - tempoAnterior
          ); //35 anos menos dias desde o ingresso menos tempo anterior
        }
        if (daysDiffDataIngresso < 5478)
          //15 anos
          pedagio4 = true;
      } else {
        nomes[i].push(
          TRINTA_E_CINCO_ANOS - daysDiffDataIngresso - tempoAnterior
        ); //35 anos menos dias desde o ingresso menos tempo anterior
      }
    }
    //Pedágios
    //17%
    let pedagio17 = false;

    if (nomes[i][5] > daysDiff(false, new Date(), datePedagio)) {
      nomes[i][5] *= 1.17;
      pedagio17 = true;
    }
    // 4 meses
    if (pedagio4) {
      nomes[i][5] += 120; //4 meses
    }
    let pedagios = !!pedagio4 ? "4 meses " : "";
    if (pedagio17) {
      pedagios += "17%";
    }
    let temp = new Date().getTime() + nomes[i][5] * 86400000;
    dataArr.push([
      data[i].matricula,
      nome,
      temp,
      licencasEspeciaisAcumuladas === 0 ? "-" : licencasEspeciaisAcumuladas,
      pedagios,
    ]);
  }

  dataArr.sort((a, b) => {
    return a[1] - b[1];
  });

  for (let i = 0; i < dataArr.length; i++) {
    dataArr[i][2] = new Date(dataArr[i][2]).toLocaleDateString();
  }
  return dataArr;
}

const ListRetair = () => {
  const { data, filterData } = useContext(DataContext);
  const history = useNavigate();
  const getMatriculaAndRedirect = (rowValue) => {
    const matricula = rowValue[0];
    history(`/detalhes/${matricula}`);
  };
  const listaRetair = prepararLista(filterData || data);
  return (
    <List
      onRowClick={getMatriculaAndRedirect}
      data={listaRetair}
      columns={[
        "Matricula",
        "Nome",
        "Data para se aposentar",
        "Licença Acumulada",
        "Pedágios",
      ]}
    />
  );
};
export default ListRetair;
