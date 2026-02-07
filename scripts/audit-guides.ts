import * as dotenv from 'dotenv';
import path from 'path';

// Load .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

async function auditGuides() {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

    if (!apiKey || !baseId) {
        console.error('Missing credentials');
        process.exit(1);
    }

    const tableName = 'Guides';
    const url = `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(tableName)}`;

    try {
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
        
        console.log(`\n=== Guide Audit Report (Total: ${records.length} records) ===\n`);

        const emptyGuides = [];
        const missingSlugGuides = [];
        const publishedGuides = [];

        for (const record of records) {
            const fields = record.fields;
            const title = fields.title || fields.name || 'No Title';
            const slug = fields.slug;
            const content = fields.MainContent;
            const status = fields.Status;

            if (status !== 'Published' && status !== '公開') {
                // Skip non-published if useful, but let's check all for now
            }

            if (!slug) {
                missingSlugGuides.push({ title, status });
            }

            if (!content || (typeof content === 'string' && content.trim() === '')) {
                emptyGuides.push({ title, slug, status });
            } else {
                publishedGuides.push({ title, slug, status });
            }
        }

        console.log('--- Empty Guides (No MainContent) ---');
        if (emptyGuides.length === 0) console.log('(None)');
        emptyGuides.forEach(g => console.log(`- ${g.title} [Status: ${g.status || 'N/A'}] (Slug: ${g.slug || 'MISSING'})`));

        console.log('\n--- Guides with Content ---');
        if (publishedGuides.length === 0) console.log('(None)');
        publishedGuides.forEach(g => console.log(`- ${g.title} [Status: ${g.status || 'N/A'}] (Slug: ${g.slug || 'MISSING'})`));

        console.log('\n--- Guides Missing Slug ---');
        if (missingSlugGuides.length === 0) console.log('(None)');
        missingSlugGuides.forEach(g => console.log(`- ${g.title} [Status: ${g.status || 'N/A'}]`));

    } catch (error) {
        console.error('Audit FAILED:', error);
        process.exit(1);
    }
}

auditGuides();
