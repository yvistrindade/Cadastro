console.log("Electron - Processo principal")

// importação dos recursos do framework
// app (aplicação)
// BrowserWindow (criação da janela)
// nativeTheme esta relacionado ao tema (claro ou escuro)
// Menu deifinir um menu personalizado
// Shell ( acessar links no navegador padrao)
const { app, BrowserWindow, nativeTheme, Menu, shell } = require('electron/main')

// janela principal
let win
const createWindow = () => {
  //definindo o tema da janela claro ou escuro
  nativeTheme.themeSource = 'light'
  win = new BrowserWindow({
    width: 1010,
    height: 720,
    //frame: false, // totem de pedido
    //resizable: false, // retira o redimensionamento
    //minimizable: false, // retira a opção de minimizar
    //closable: false, // retira a opção close
    //autoHideMenuBar: true // esconder o menu
  })

  // carregar o menu personalizado 
  // ATENÇÃO: antes de importar o recurso Menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))

  // carregar o documento html na janela
  win.loadFile('./src/views/index.html')
}

// Janela sobre
function aboutWindow() {
  nativeTheme.themeSource = 'light'
  // obter a janela principal
  const mainWindow = BrowserWindow.getFocusedWindow()
  // Validação (se exisitr a janela principal)
  if (mainWindow) {
    about = new BrowserWindow({
      width: 320,
      height: 280,
      autoHideMenuBar: true,
      resizable: false,
      minimizable: false,
      // estabelecer uma relação hierarquica entre janelas
      parent: mainWindow,
      // criar uma janela modal ( se retornar a principal quando encerrado)
      modal: true
    })

  }
  about.loadFile('./src/views/sobre.html')
}

// inicialização da aplicação (assincronismo)
app.whenReady().then(() => {
  createWindow()

  // só ativa a janela principal se nenhuma outra estiver ativa
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// se o sistema não for MAC encerrar a aplicação quando a janela for fechada
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

//Reduzir a verbozidade de logs nao criticos (devtools)
app.commandLine.appendSwitch('log-level', '3')

// template do menu
const template = [
  {
    label: 'Cadastro',
    submenu: [
      {
        label: 'Criar nota',
        accelerator: 'Ctrl+N'
      },
      {
        type: 'separator',
      },
      {
        label: 'Sair',
        accelerator: 'Alt+F4',
        click: () => app.quit()
      }
    ]
  },
  {
    label: 'Relatorios',
    submenu: [
      {
        label: 'Clientes'
      },
      {
        type: 'separator',
      },
    ]
  },
  {
    label: 'Ferramentas',
    submenu: [
      {
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar o zoom padrao',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'DevTools',
        role: 'toggleDevTools'
      }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'repositorio',
        click: () => shell.openExternal('https://github.com/yvistrindade/Cadastro')
      },
      {
        label: 'sobre',
        click: () => aboutWindow()
      }
    ]
  },
]
