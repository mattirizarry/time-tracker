import { app, Menu, MenuItemConstructorOptions } from 'electron'

export default (): void => {

  // CREATE MENU
  const template: MenuItemConstructorOptions[] = [
    {
      label: process.platform === 'darwin' ? app.name : 'File',
      submenu: [{ role: 'about' }, { type: 'separator' }, { role: 'quit' }]
    },
    {
      label: 'Edit',
      submenu: [{ role: 'selectAll' }, { role: 'cut' }, { role: 'copy' }, { role: 'paste' }, { role: 'delete' }]
    },
    {
      label: 'View',
      submenu: [{ role: 'reload' }, { role: 'toggleDevTools' }]
    }
  ]

  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
}
