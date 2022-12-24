import Card from "../../components/Card";
import GenderChart from "../../components/GenderChart";
import { useNavigate } from "react-router-dom";
import { MdHealthAndSafety, MdOutlineBeachAccess } from "react-icons/md";
import Barchart from "../../components/BarChart";
import AcademicEducationChart from "../../components/AcademicEducationChart";
import HorizontalBarchart from "../../components/HorizontalBarChart";
import ListRetair from "../../components/ListRetair";
import ListCidades from "../../components/ListCidades";
import { TopContainer } from "../../components/styled";
import Navbar from "../../components/Navbar";
import { atestadoMedico, mediaIdade } from "../../utils";
import { useContext, useEffect } from "react";
import DataContext from "../../contexts/DataContext";
import DashboardFilters from './Filters';

function ferias(values) {

  let soma = 0;

  let dataAtual = new Date();

  for (let i = 0; i < values.length; i++) {

     
      
      if (values[i].ferias !== '') {

          let dataInicio = new Date(checkDate(values[i].ferias));
          let dataFuturo = new Date(checkDate(values[i].ferias));
          dataFuturo.setDate(dataInicio.getDate() + 30)
          if(dataFuturo > dataAtual){
              soma++
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

function Dashboard() {
  const { filterData, data, displayContent, forceRouteChange, setForceRouteChange, session } = useContext(DataContext);
const history = useNavigate();
useEffect(() => {
  if (!session && forceRouteChange !== '/') {
    history('login');
  } else if (forceRouteChange) {
    history(forceRouteChange);
  }
  setForceRouteChange('');
}, [forceRouteChange, setForceRouteChange, history, session])

const dashboardData = filterData || data;
  return (
    <>
      <Navbar />
      <TopContainer>
        <div>
        {displayContent.total_cops && (
          <Card
            icon={<MdHealthAndSafety />}
            text="Policiais BPM"
            count={dashboardData.length}
          />
        )}
        {displayContent.license && (
          <Card
            icon={<MdHealthAndSafety />}
            text="Atestado médico BPM"
            count={atestadoMedico(dashboardData)}
          />
        )}
        </div>
        <div style={{ width: "180px", padding: "12px" }}>
          {displayContent.gender && (
            <GenderChart title="Gênero" data={dashboardData}/>
          )}
        </div>
        <div>
          {displayContent.age && (
            <Card
              icon={<MdHealthAndSafety />}
              text="Média de idade BPM"
              count={mediaIdade(dashboardData)}
            />
          )}
          {displayContent.vacation && (
          <Card
            icon={<MdOutlineBeachAccess />}
            text="Policiais em férias"
            count={ferias(dashboardData)}
          />
          )}
        </div>
        <div style={{ width: "300px" }}>
        {displayContent.course && (
          <Barchart title="Instituição de origem" data={dashboardData}/>
        )}
        </div>
        <div style={{ width: "300px" }}>
        {displayContent.academic && (
          <AcademicEducationChart title="Titulação acadêmica" data={dashboardData}/>
        )}
        </div>
        <div style={{ width: "250px", height: "300px"}}>
        {displayContent.lang && (
          <HorizontalBarchart title="Fluência em segundo idioma" data={dashboardData}/>
        )}
        </div>
      </TopContainer>
      <TopContainer>
        <DashboardFilters />
      </TopContainer>
      <TopContainer>
      {displayContent.location && (
        <ListCidades data={dashboardData}/>
      )}
      {displayContent.cops && (
        <ListRetair />
      )}
      </TopContainer>
    </>
  );
}

export default Dashboard;
