const base = require('@playwright/test');
import fs from 'fs';

export const test = base.extend({
  sessionVariable: async ({}, use) => {
    const filePath = 'testData/shared-data.json';

    let data = fs.existsSync(filePath)
            ? JSON.parse(fs.readFileSync(filePath, 'utf8'))
            : {}; // Empty object

            await use(data);

        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  }
});