import fs from 'fs';
import path from 'path';

function generateTemplate(name: string, version: string, description: string): void {
  const targetDirectory = path.join(process.cwd(), name);

  // Create the extension directory
  fs.mkdirSync(targetDirectory);

  // Copy manifest file
  const manifestTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'manifest.json'), 'utf-8');
  const manifestContent = manifestTemplate
    .replace('$NAME$', name)
    .replace('$VERSION$', version)
    .replace('$DESCRIPTION$', description);
  fs.writeFileSync(path.join(targetDirectory, 'manifest.json'), manifestContent);

  // Copy background script
  const backgroundTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'background.ts'), 'utf-8');
  fs.writeFileSync(path.join(targetDirectory, 'background.ts'), backgroundTemplate);

  // Copy content script
  const contentTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'content.ts'), 'utf-8');
  fs.writeFileSync(path.join(targetDirectory, 'content.ts'), contentTemplate);

  // Copy popup script
  const popupTemplate = fs.readFileSync(path.join(__dirname, 'templates', 'popup.ts'), 'utf-8');
  fs.writeFileSync(path.join(targetDirectory, 'popup.ts'), popupTemplate);

  console.log('Chrome extension template generated successfully!');
}

export default generateTemplate;
