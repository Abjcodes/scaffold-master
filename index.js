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
      {
        type: "input",
        name: "name",
        message: "Enter your project name:",
      },
      {
        type: "input",
        name: "version",
        message: "Enter the project version:",
        default: "1.0.0",
      },
      {
        type: "input",
        name: "description",
        message: "Enter a brief description of your project:",
      }
    ])
    .then((answers) => {
      const selectedBoilerplate = answers.selectBoilerplate;
      const prjFolder = `./templates/${selectedBoilerplate}`;
      const source = path.join(__dirname, prjFolder);

      const projectDetails = {
        name: answers.name,
        version: answers.version,
        description: answers.description,
      };

      try {
        fs.copySync(source, currentDir, { overwrite: true });
        console.log(
          `Boilerplate "${selectedBoilerplate}" copied to the current working directory.`
        );
        const manifestFile = path.join(currentDir, "manifest.json");
        if (fs.existsSync(manifestFile)) {
          updateManifest(manifestFile, projectDetails);
          // console.log("Updated manifest file:", manifestFile);
        }

        const packageJson = path.join(currentDir, "package.json");
        if (fs.existsSync(packageJson)) {
          updateManifest(packageJson, projectDetails);
        }

      } catch (error) {
        console.error("Error copying the boilerplate:", error);
      }

      function updateManifest(manifestPath) {
        const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
        manifest.name = projectDetails.name;
        manifest.version = projectDetails.version;
        manifest.description = projectDetails.description;
      
        fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
      }

    });
}
