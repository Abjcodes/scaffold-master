import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

export default async function selectBoilerplate() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const currentDir = process.cwd();

  const templatePath = path.join(__dirname, "templates");
  const templateFolders = await fs.readdir(templatePath);
  const boilerplateChoices = templateFolders.map((folder) => ({
    name: folder,
    value: folder,
  }));
  // const boilerplateChoices = [
  //   {
  //     name: "Express with TypeScript",
  //     value: "express-typescript",
  //   },
  //   {
  //     name: "Chrome Extension",
  //     value: "chrome-extension",
  //   },
  //   {
  //     name: "Hardhat Nextjs DApp",
  //     value: "HArdhat-Nextjs",
  //   },
  // ];

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
      {
        type: "input",
        name: "author",
        message: "Enter author's name:",
      },
    ]);

    const selectedBoilerplate = answers.selectBoilerplate;
    const prjFolder = `./templates/${selectedBoilerplate}`;
    const source = path.join(__dirname, prjFolder);

    const projectDetails = {
      name: answers.name,
      version: answers.version,
      description: answers.description,
      author: answers.author,
      dependencies: {},
    };

    if (selectedBoilerplate === "express-typescript") {
      try{
        const dependenciesAnswers = await inquirer.prompt([
          {
            type: "checkbox",
            name: "dependencies",
            message: "Select the dependencies you want to include:",
            choices: [
              { name: "cors" },
              { name: "body-parser" },
            ],
          },
        ]);

        const dependencies = dependenciesAnswers.dependencies;
        for (const dep of dependencies) {
          projectDetails.dependencies[dep] = getLatestVersions(dep);
        }
        console.log(projectDetails.dependencies)
      } catch (error) {
        console.error("Error selecting dependencies", error);
      }
    }

    await fs.copy(source, currentDir, { overwrite: true });
    console.log(`Boilerplate "${selectedBoilerplate}" copied to the current working directory.`);

    const filesToUpdate = ["manifest.json", "package.json"];
    // console.log(des);
    for (const file of filesToUpdate) {
      const filePath = path.join(currentDir, file);
      if (fs.existsSync(filePath)) {
        await updateBoilerplate(filePath, projectDetails);
      }
    }
  } catch (error) {
    console.error("Error copying the boilerplate:", error);
  }

  async function updateBoilerplate(filePath, projectDetails) {
    try {
      const manifest = await fs.readJson(filePath);
      manifest.name = projectDetails.name;
      manifest.version = projectDetails.version;
      manifest.description = projectDetails.description;
      manifest.author = projectDetails.author;
      manifest.dependencies = {
        ...manifest.dependencies,
        ...projectDetails.dependencies,
      };

      await fs.writeJson(filePath, manifest, { spaces: 2 });
    } catch (error) {
      console.error("Error updating the manifest:", error);
    }
  }

  function getLatestVersions(dependencies) {
    if(dependencies === "cors")
      return "2.8.13";
    else if(dependencies === "body-parser" )
      return "1.19.0";
  }
}
