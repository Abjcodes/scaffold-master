import fs from 'fs';
import path from 'path';

const manifestFile = 'manifest.json'; // Specify the manifest file name here

// Define the values to update in the manifest file
const manifestUpdates = {
    name: 'How do we figure out to put name from terminal in here?',
    version: '1.0.2',
    description: 'A simple Chrome Extension created using a template',
};

const sourcePath = './template';
const destPath = process.cwd();

// Function to recursively copy files and directories
function copyFiles(source, destination) {
  // Read the contents of the source directory
  const files = fs.readdirSync(source);

  // Loop through each file/directory
  files.forEach(file => {
    const sourceFile = path.join(source, file);
    const destFile = path.join(destination, file);

    // Get the stats of the current file/directory
    const stats = fs.statSync(sourceFile);

    if (stats.isFile()) {
      // If it's a file, copy it to the destination
      fs.copyFileSync(sourceFile, destFile);
      console.log(`Copied file: ${sourceFile} to ${destFile}`);

      // Check if the copied file is the manifest file
      if (file === manifestFile) {
        updateManifest(destFile);
        console.log(`Updated manifest file: ${destFile}`);
      }
    } else if (stats.isDirectory()) {
      // If it's a directory, create the corresponding directory in the destination
      fs.mkdirSync(destFile, { recursive: true });
      console.log(`Created directory: ${destFile}`);

      // Recursively copy the contents of the subdirectory
      copyFiles(sourceFile, destFile);
    }
  });
}

// Function to update the manifest file with user-defined values
function updateManifest(manifestPath) {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

  // Update manifest properties based on the defined values
  manifest.name = manifestUpdates.name;
  manifest.version = manifestUpdates.version;
  manifest.description = manifestUpdates.description;
  // Add more property updates as needed

  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
}

// Call the function to start copying
copyFiles(sourcePath, destPath);
