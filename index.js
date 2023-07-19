import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";

export default function selectBoilerplate() {
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
      const templatePath = path.join(
        currentDir,
        "templates",
        selectedBoilerplate
      );

      try {
        fs.copySync(templatePath, currentDir, { overwrite: true });
        console.log(
          `Boilerplate "${selectedBoilerplate}" copied to the current working directory.`
        );
      } catch (error) {
        console.error("Error copying the boilerplate:", error);
      }
    });
}
