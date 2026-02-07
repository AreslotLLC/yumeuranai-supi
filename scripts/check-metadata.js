const dotenv = require('dotenv');
const path = require('path');

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function checkMetadata() {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
        console.error('Missing credentials');
        process.exit(1);
    }

    const url = `https://api.airtable.com/v0/meta/bases/${baseId}/tables`;

    try {
        console.log(`Checking metadata for base: ${baseId}`);
        const response = await fetch(url, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
            },
        });

        if (!response.ok) {
            console.error(`Metadata API error: ${response.status} ${response.statusText}`);
            const body = await response.text();
            console.error(`Response body: ${body}`);
            process.exit(1);
        }

        const data = await response.json();
        console.log('\n--- Tables in Base ---');
        data.tables.forEach(t => console.log(`- ${t.name} (ID: ${t.id})`));

    } catch (error) {
        console.error('Metadata check FAILED:', error);
        process.exit(1);
    }
}

checkMetadata();
