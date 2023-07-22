import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

export async function saveBoilerplate() {
  const cwd = process.cwd();
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const templatePath = path.join(__dirname, "templates");

  const answers = await inquirer.prompt([
    {
      name: "folderName",
      message: "Enter the folder name for the boilerplate:",
      validate: (input) => {
        if (input.trim() === "") {
          return "Folder name cannot be empty.";
        }
        return true;
      },
    },
    {
      type: "checkbox",
      name: "filesToAvoid",
      message: "Select the files to avoid copying into the template folder:",
      choices: fs.readdirSync(cwd),
    },
  ]);

  const folderName = answers.folderName;
  const filesToAvoid = answers.filesToAvoid;
  // const destinationPath = path.join(templatePath, folderName);
  const prjFolder = path.join(`./templates/`, folderName);
  const destinationPath = path.join(__dirname, prjFolder);

  try {
    await fs.ensureDir(destinationPath);

    const filesToCopy = fs
      .readdirSync(cwd)
      .filter((file) => !filesToAvoid.includes(file));
    for (const file of filesToCopy) {
      const sourceFile = path.join(cwd, file);
      const destinationFile = path.join(destinationPath, file);
      await fs.copy(sourceFile, destinationFile);
    }

    console.log(`Boilerplate "${folderName}" saved in the template folder.`);
  } catch (error) {
    console.error("Error saving the boilerplate:", error);
  }
}
