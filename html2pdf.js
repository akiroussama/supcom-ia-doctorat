// Convert multi-slide HTML to multi-page PDF
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const HTML_FILES = [
    'index.html',
    'index-non-supervisee.html',
    'svm_revision_examen.html',
    'revision-supervisee-complete.html',
];

async function htmlToPdf(htmlPath) {
    const pdfPath = htmlPath.replace(/\.html$/, '.pdf');
    console.log(`Converting: ${htmlPath} -> ${pdfPath}`);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

    const fileUrl = `file:///${htmlPath.replace(/\\/g, '/')}`;
    await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForTimeout(3000); // wait for KaTeX

    // Inject print styles
    await page.addStyleTag({
        content: `
          @page { margin: 0; size: 1920px 1080px; }
          body { overflow: visible !important; height: auto !important; }
          .slide { position: relative !important; top: 0 !important; left: 0 !important;
                   right: auto !important; bottom: auto !important;
                   opacity: 1 !important; transform: none !important;
                   pointer-events: all !important; display: flex !important;
                   height: 1080px !important; width: 100% !important;
                   page-break-after: always; overflow: hidden !important;
                   padding: 1rem 2rem !important; }
          .slide:last-child { page-break-after: avoid; }
          header, nav { display: none !important; }
        `
    });
    await page.waitForTimeout(500);

    await page.pdf({
        path: pdfPath,
        printBackground: true,
        width: '1920px',
        height: '1080px',
    });

    await browser.close();
    const sizeKb = (fs.statSync(pdfPath).size / 1024).toFixed(1);
    console.log(`  Done: ${pdfPath} (${sizeKb} KB)`);
}

(async () => {
    for (const htmlFile of HTML_FILES) {
        const fullPath = path.resolve(htmlFile);
        if (!fs.existsSync(fullPath)) {
            console.log(`SKIP (not found): ${fullPath}`);
            continue;
        }
        try {
            await htmlToPdf(fullPath);
        } catch (e) {
            console.error(`FAIL: ${htmlFile}: ${e.message}`);
        }
    }
    console.log('\nAll PDFs generated!');
})();
