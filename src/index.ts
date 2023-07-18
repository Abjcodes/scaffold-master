import JSZip from 'jszip';
import { saveAs } from 'file-saver';

async function generateTemplate(name: string, version: string, description: string): Promise<void> {
  try {
    const zip = new JSZip();

    // Add manifest file
    const manifestTemplate = await fetch('templates/manifest.json');
    const manifestContent = (await manifestTemplate.text())
      .replace('$NAME$', name)
      .replace('$VERSION$', version)
      .replace('$DESCRIPTION$', description);
    zip.file('manifest.json', manifestContent);

    // Add background script
    const backgroundTemplate = await fetch('templates/background.ts');
    const backgroundContent = await backgroundTemplate.text();
    zip.file('background.ts', backgroundContent);

    // Add content script
    const contentTemplate = await fetch('templates/content.ts');
    const contentContent = await contentTemplate.text();
    zip.file('content.ts', contentContent);

    // Add popup script
    const popupTemplate = await fetch('templates/popup.ts');
    const popupContent = await popupTemplate.text();
    zip.file('popup.ts', popupContent);

    const zipBlob = await zip.generateAsync({ type: 'blob' });
    saveAs(zipBlob, `${name}.zip`);

    console.log('Chrome extension template generated successfully!');
  } catch (error) {
    console.error('Error generating template:', error);
  }
}

export default generateTemplate;
