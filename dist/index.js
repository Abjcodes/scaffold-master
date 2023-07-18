import fs from 'fs';
import path from 'path';

// Get the absolute paths of the source and destination directories
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
    } else if (stats.isDirectory()) {
      // If it's a directory, create the corresponding directory in the destination
      fs.mkdirSync(destFile, { recursive: true });
      console.log(`Created directory: ${destFile}`);

      // Recursively copy the contents of the subdirectory
      copyFiles(sourceFile, destFile);
    }
  });
}

// Call the function to start copying
copyFiles(sourcePath, destPath);

export {};
//# sourceMappingURL=index.js.map