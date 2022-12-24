const path = require('path');
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const isDev = require('electron-is-dev');
const { channels, permissions } = require('../src/constants/channels');
const readFile = require('../src/utils/readFile');
const writeFile = require('../src/utils/writeFile');
const generateReports = require('../src/utils/generateReports');

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      defaultEncoding: 'UTF-8',
      webSecurity: true,
      enableRemoteModule: true,
      webviewTag: true
    },
    show: false,
  });
  win.maximize();
  win.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, 'index.html')}`
  );
  win.show();
  // Open the DevTools.
  if (isDev) {
    win.webContents.openDevTools({ mode: 'detach' });
  }
}

const isMac = process.platform === 'darwin'

const displayCharts = {
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
}

const template = [
  // { role: 'appMenu' }
  ...(isMac ? [{
    label: app.name,
    submenu: [
      { role: 'about' },
      { type: 'separator' },
      { role: 'services' },
      { type: 'separator' },
      { role: 'hide' },
      { role: 'hideOthers' },
      { role: 'unhide' },
      { type: 'separator' },
      { role: 'quit' }
    ]
  }] : []),
  {
    label: 'Arquivo',
    submenu: [
      {
        label: 'Abrir planilha', click: () => {
          dialog.showOpenDialog({
            properties: ['openFile']
          }).then((files) => {
            if (!files.canceled && files.filePaths.length) {
              ipcMain.emit(channels.READ_FILE, null, files.filePaths[0]);
            }
          });
        }
      },
      {
        label: 'Salvar alterações', click: () => {
          // toDo
          BrowserWindow.getFocusedWindow().webContents.send(channels.SAVE_CONTENT);
        }
      },
      {
        label: 'Salvar como...', click: () => {
          // toDo
          BrowserWindow.getFocusedWindow().webContents.send(channels.SAVE_CONTENT);
        }
      },
      {
        label: 'Gerar relatório (imagem)', click: () => {
          ipcMain.emit(channels.GENERATE_REPORT);
        }
      },
      {
        label: 'Gerar relatório (imprimir)', click: () => {
          BrowserWindow.getFocusedWindow()?.webContents.send(channels.PRINT_REPORT);
        }
      },
      isMac ? { role: 'close' } : { role: 'quit' }
    ]
  },
  {
    label: 'Editar',
    submenu: [
      { role: 'undo' },
      { role: 'redo' },
      { type: 'separator' },
      { role: 'cut' },
      { role: 'copy' },
      { role: 'paste' },
      ...(isMac ? [
        { role: 'pasteAndMatchStyle' },
        { role: 'delete' },
        { role: 'selectAll' },
        { type: 'separator' },
        {
          label: 'Speech',
          submenu: [
            { role: 'startSpeaking' },
            { role: 'stopSpeaking' }
          ]
        }
      ] : [
        { role: 'delete' },
        { type: 'separator' },
        { role: 'selectAll' }
      ])
    ]
  },
  {
    label: 'Exibir',
    submenu: [
      {
        label: 'Gráficos',
        submenu: [
          {
            type: 'checkbox',
            checked: displayCharts.gender,
            label: 'Gráfico de sexo',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_GENDER);
            }
          },
          {
            type: 'checkbox',
            checked: displayCharts.course,
            label: 'Gráfico de instituição de origem',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_COURSE);
            }
          },
          {
            type: 'checkbox',
            checked: displayCharts.academic,
            label: 'Gráfico acadêmico',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_ACADEMIC);
            }
          },
          {
            type: 'checkbox',
            checked: displayCharts.lang,
            label: 'Gráfico de idiomas',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_LANGUAGE);
            }
          },
        ],
      },
      {
        label: 'Tabelas',
        submenu: [
          {
            type: 'checkbox',
            checked: displayCharts.location,
            label: 'Tabela de cidades',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_LOCATION);
            }
          },
          {
            type: 'checkbox',
            checked: displayCharts.cops,
            label: 'Tabela de policiais',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_COPS);
            }
          }
        ],
      },
      {
        label: 'Contagem de Informações',
        submenu: [
          {
            type: 'checkbox',
            checked: displayCharts.total_cops,
            label: 'Total de Policias',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_TOTAL_COPS);
            }
          },
          {
            type: 'checkbox',
            checked: displayCharts.age,
            label: 'Média de idade',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_AGE);
            }
          },
          {
            type: 'checkbox',
            checked: displayCharts.license,
            label: 'Afastamentos',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_LICENSE);
            }
          },
          {
            type: 'checkbox',
            checked: displayCharts.vacation,
            label: 'Férias',
            click: () => {
              BrowserWindow.getFocusedWindow().webContents.send(channels.TOGGLE_CHART_VACATION);
            }
          },
        ]
      },
    ]
  },
  {
    label: 'Visualização',
    submenu: [
      { role: 'minimize' },
      { role: 'zoom' },
      ...(isMac ? [
        { type: 'separator' },
        { role: 'front' },
        { type: 'separator' },
        { role: 'window' }
      ] : [
        { role: 'close' }
      ]),
      { role: 'reload' },
      { role: 'forceReload' },
      { role: 'toggleDevTools' },
      { type: 'separator' },
      { role: 'resetZoom' },
      { role: 'zoomIn' },
      { role: 'zoomOut' },
      { type: 'separator' },
      { role: 'togglefullscreen' }
    ]
  },
]


const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu);

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// abrir arquivo
ipcMain.on(channels.READ_FILE, (evt, data) => {
  BrowserWindow.getFocusedWindow().webContents.send(channels.FILE_CONTENT, readFile(data));
})

// gerar report
ipcMain.on(channels.GENERATE_REPORT, async (evt, data) => {
  const { canceled, filePaths } = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
    properties: ['openDirectory']
  })
  if (canceled) {
    return;
  }
  const [filePath] = filePaths;
  const reportPath = path.join(filePath, 'report.png');

  const img = await BrowserWindow.getFocusedWindow().capturePage();
  const optm = img.resize({
    quality: 'best'
  }).toPNG(1.0);

  generateReports(
    reportPath,
    optm,
  );
});

// salvar alteraçoes
ipcMain.on(channels.SAVE_CONTENT_RESPONSE, async (evt, data) => {
  
  const { canceled, filePaths } = await dialog.showOpenDialog(BrowserWindow.getFocusedWindow(), {
    properties: ['openDirectory']
  })
  if (canceled) {
    return;
  }
  const [filePath] = filePaths;
  const saveDataPath = path.join(filePath, 'data.xlsx');
  writeFile(data, saveDataPath);
})

// Auth logic (toDo: this is crap. add bcrypt or any kind of security layer)
ipcMain.on(channels.AUTH, (evt, data) => {
  let session = { createdAt: new Date().toString() };
  if (data) {
    if (permissions.ADMIN === data.nome && permissions.ADMIN_SECRET === data.password) {
      session = {
        ...session,
        user: data.nome, type: 'SUPER_USER',
      }
      const newTemplate = [...template];
      const fileTab = newTemplate.findIndex(el => el.label.toUpperCase() === 'ARQUIVO');
      newTemplate[fileTab].submenu.unshift(...[{
        label: 'Cadastrar policial',
        click: () => {
          BrowserWindow.getFocusedWindow().webContents.send(channels.ADD_COP);
        }
      }]);
      Menu.setApplicationMenu(Menu.buildFromTemplate(newTemplate));
    } else {
      session.error = 'Credenciais inválidas';
    }
    BrowserWindow.getFocusedWindow().webContents.send(channels.AUTH_RESPONSE, session);
  }
})

