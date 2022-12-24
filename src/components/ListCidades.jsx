import React from "react";
import List from "./List";

function preparaLista(data) {
  var cidades = [],
    cidade = "",
    porcentagem = 0;

  for (let i = 0; i < data.length; i++) {
    cidades.push([data[i].lotacao.cidade, 1]);
  }

  for (let i = 0; i < cidades.length; i++) {
    cidade = cidades[i][0];
    for (let j = i + 1; j < cidades.length; j++) {
      if (cidade === cidades[j][0]) {
        cidades[i] = [cidade, cidades[i][1] + 1];

        cidades.splice(j, 1);

        j--;
      }
    }
  }

  for (let i = 0; i < cidades.length; i++) {
    porcentagem = (cidades[i][1] / data.length) * 100;

    cidades[i][2] = Math.floor(porcentagem);
  }

  return cidades.sort((a, b) => {
    return b[1] - a[1];
  });
}

const ListCidades = ({ data }) => {
  const listaCidades = preparaLista(data);
  return <List data={listaCidades} columns={["Cidade", "Total", "%"]} />;
};
export default ListCidades;
