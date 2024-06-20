const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("node:path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: false,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("generate-docx", async (event, formData, callback) => {
  try {
    const content = fs.readFileSync(path.resolve("template.docx"), "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    doc.setData(formData);

    try {
      doc.render();
    } catch (error) {
      console.error("Error rendering docx:", error);
      throw error;
    }

    const buf = doc.getZip().generate({
      type: "nodebuffer",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      compression: "DEFLATE",
    });

    const downloadsPath = app.getPath("downloads");
    let date = new Date();
    let day = date.getDate().toString();
    let month = date.getMonth() + 1;
    let year = date.getFullYear().toString();
    let seconds = date.getSeconds().toString();
    let filName = "output";
    let uniquestring = filName.concat(day, month, year, seconds, ".docx");
    const outputPath = path.resolve(downloadsPath, uniquestring);

    // Write the file asynchronously
    fs.writeFile(outputPath, buf, (err) => {
      if (err) {
        dialog.showErrorBox("Error writing docx file", err);
      } else {
        dialog.showErrorBox("Document saved successfully at:", outputPath);

      }
    });
  } catch (error) {
    console.error("Error generating docx:", error);
  }
});
