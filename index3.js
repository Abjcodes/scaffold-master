import inquirer from "inquirer";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

export async function deleteBoilerplate() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  // const currentDir = process.cwd();

  const templatePath = path.join(__dirname, "templates");
  const templateFolders = await fs.readdir(templatePath);
  const boilerplateChoices = templateFolders.map((folder) => ({
    name: folder,
    value: folder,
  }));

  try {
    const deleteAnswers = await inquirer.prompt([
      {
        type: "list",
        name: "selectBoilerplate",
        message: "Select the boilerplate to delete:",
        choices: boilerplateChoices,
      },
    ]);
    const selectedBoilerplate = deleteAnswers.selectBoilerplate;
    const deletePath = path.join(templatePath, selectedBoilerplate);
    await fs.remove(deletePath);
    console.log(`Boilerplate "${selectedBoilerplate}" deleted.`);
  } catch (error) {
    console.error("Error performing the action:", error);
  }
}
