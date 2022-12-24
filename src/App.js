import React, { useState, useEffect } from 'react';
import DataContext from './contexts/DataContext';
import { channels } from './constants/channels';
const ipcRenderer = window.require('electron').ipcRenderer;

const App = ({ children }) => {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [forceRouteChange, setForceRouteChange] = useState('');
  const [session, setSession] = useState(null);
  const [displayContent, setDisplayContent] = useState({
    total_cops: true,
    age: true,
    license: true,
    vacation: true,
    gender: true,
    course: true,
    academic: true,
    lang: true,
    location: true,
    cops: true,
  })
  useEffect(() => {
    // abrir tabela excel
    ipcRenderer.on(channels.FILE_CONTENT, (event, fileData) => {
      setData(fileData);
    });

    ipcRenderer.on(channels.PRINT_REPORT, () => {
      window.print();
    });

    // esconder/mostrar graficos
    ipcRenderer.on(channels.TOGGLE_CHART_AGE, () => {
      setDisplayContent(content => ({ ...content, age: !content.age }));
    });

    ipcRenderer.on(channels.TOGGLE_CHART_GENDER, () => {
      setDisplayContent(content => ({ ...content, gender: !content.gender }));
    });

    ipcRenderer.on(channels.TOGGLE_CHART_LOCATION, () => {
      setDisplayContent(content => ({ ...content, location: !content.location }));
    });

    ipcRenderer.on(channels.TOGGLE_CHART_LANGUAGE, () => {
      setDisplayContent(content => ({ ...content, lang: !content.lang }));
    });

    ipcRenderer.on(channels.TOGGLE_CHART_COPS, () => {
      setDisplayContent(content => ({ ...content, cops: !content.cops }));
    });

    ipcRenderer.on(channels.TOGGLE_CHART_LICENSE, () => {
      setDisplayContent(content => ({ ...content, license: !content.license }));
    });

    ipcRenderer.on(channels.TOGGLE_CHART_ACADEMIC, () => {
      setDisplayContent(content => ({ ...content, academic: !content.academic }));
    });

    ipcRenderer.on(channels.TOGGLE_CHART_COURSE, () => {
      setDisplayContent(content => ({ ...content, course: !content.course }));
    });

    ipcRenderer.on(channels.TOGGLE_CHART_TOTAL_COPS, () => {
      setDisplayContent(content => ({ ...content, total_cops: !content.total_cops }));
    });

    ipcRenderer.on(channels.TOGGLE_CHART_VACATION, () => {
      setDisplayContent(content => ({ ...content, vacation: !content.vacation }));
    });

    ipcRenderer.on(channels.ADD_COP, () => {
      setForceRouteChange('cadastro');
    });

    ipcRenderer.on(channels.EDIT_COP, () => {
      setForceRouteChange('editar');
    });


    return () => {
      ipcRenderer.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    ipcRenderer.on(channels.SAVE_CONTENT, () => {
      ipcRenderer.send(channels.SAVE_CONTENT_RESPONSE, data);
    })
    // return () => ipcRenderer.removeListener(channels.SAVE_CONTENT_RESPONSE);
  }, [data]);

  useEffect(() => {
    ipcRenderer.on(channels.AUTH_RESPONSE, (evt, data) => {
      
      if (data) {
        setSession(data);
      }
      if (session?.user) {
       setForceRouteChange('/');
      }
    })
  }, [session?.user])

  const handleLogin = (values) => {
    ipcRenderer.send(channels.AUTH, values);
  }

  return (
    <DataContext.Provider
      value={{
        data,
        displayContent,
        forceRouteChange,
        setForceRouteChange,
        session,
        setSession,
        handleLogin,
        filterData,
        setFilterData,
      }}>
      {children}
    </DataContext.Provider>
  );
}

export default App;