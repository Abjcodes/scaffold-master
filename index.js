import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

export default function selectBoilerplate() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const currentDir = process.cwd();
  const boilerplateChoices = [
    {
      name: "Express with TypeScript",
      value: "express-typescript",
    },
    {
      name: "Chrome Extension",
      value: "chrome-extension",
    },
  ];

  inquirer
    .prompt([
      {
        type: "list",
        name: "selectBoilerplate",
        message: "Which boilerplate code do you want?",
        choices: boilerplateChoices,
      },
    ])
    .then((answers) => {
      const selectedBoilerplate = answers.selectBoilerplate;
      const prjFolder = `./templates/${selectedBoilerplate}`;
      const source = path.join(__dirname, prjFolder);
      try {
        fs.copySync(source, currentDir, { overwrite: true });
        console.log(
          `Boilerplate "${selectedBoilerplate}" copied to the current working directory.`
        );
      } catch (error) {
        console.error("Error copying the boilerplate:", error);
      }
    });
}
