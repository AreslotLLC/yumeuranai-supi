import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function main() {
    console.log('Testing Direct Airtable Connection (using fetch)...');
    console.log('Loading .env.local from:', envPath);

    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    console.log('API KEY:', apiKey ? 'Set' : 'Not Set');
    console.log('BASE ID:', baseId ? 'Set' : 'Not Set');

    if (!apiKey || !baseId) {
        console.error('Missing credentials');
        return;
    }

    const tables = ['Keywords', 'Categories', 'Guides', 'Affiliate'];

    for (const tableName of tables) {
        const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}?maxRecords=1`;

        try {
            console.log(`Fetching ${tableName} table via API...`);
            const response = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Airtable API error: ${response.status} ${response.statusText}`);
            }

            const data: any = await response.json();
            const records = data.records || [];
            console.log(`Successfully fetched ${records.length} records from ${tableName}.`);

            if (records.length > 0) {
                console.log('Record Fields:', JSON.stringify(records[0].fields, null, 2));
            }
        } catch (error) {
            console.error(`Connection to ${tableName} FAILED:`, error);
        }
    }
}

main();
