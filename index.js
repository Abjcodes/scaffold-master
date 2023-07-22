import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

export default async function selectBoilerplate() {
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
    {
      name: "Hardhat Nextjs DApp",
      value: "HArdhat-Nextjs",
    },
  ];

  try {
    const answers = await inquirer.prompt([
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
      },
    ]);

    const selectedBoilerplate = answers.selectBoilerplate;
    const prjFolder = `./templates/${selectedBoilerplate}`;
    const source = path.join(__dirname, prjFolder);

    const projectDetails = {
      name: answers.name,
      version: answers.version,
      description: answers.description,
    };

    await fs.copy(source, currentDir, { overwrite: true });
    console.log(
      `Boilerplate "${selectedBoilerplate}" copied to the current working directory.`
    );

    const filesToUpdate = ["manifest.json", "package.json"];
    for (const file of filesToUpdate) {
      const filePath = path.join(currentDir, file);
      if (fs.existsSync(filePath)) {
        await updateManifest(filePath, projectDetails);
      }
    }
  } catch (error) {
    console.error("Error copying the boilerplate:", error);
  }

  async function updateManifest(manifestPath, projectDetails) {
    try {
      const manifest = await fs.readJson(manifestPath);
      manifest.name = projectDetails.name;
      manifest.version = projectDetails.version;
      manifest.description = projectDetails.description;
      await fs.writeJson(manifestPath, manifest, { spaces: 2 });
    } catch (error) {
      console.error("Error updating the manifest:", error);
    }
  }
}
