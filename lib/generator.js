import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

export async function selectBoilerplate() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const currentDir = process.cwd();

  const templatePath = path.join(__dirname, "templates");
  const templateFolders = await fs.readdir(templatePath);
  const boilerplateChoices = templateFolders.map((folder) => ({
    name: folder,
    value: folder,
  }));

  try {
    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "selectBoilerplate",
        message: "Which boilerplate code do you want?",
        choices: boilerplateChoices,
      },
    ]);

    const selectedBoilerplate = answers.selectBoilerplate;
    const prjFolder = `./templates/${selectedBoilerplate}`;
    const source = path.join(__dirname, prjFolder);

    await fs.copy(source, currentDir, { overwrite: true });
    console.log(
      `Boilerplate "${selectedBoilerplate}" copied to the current working directory.`
    );
  } catch (error) {
    console.error("Error copying the boilerplate:", error);
  }
}
