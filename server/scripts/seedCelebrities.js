import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Celebrity from '../models/Celebrity.js';
import { famousPeople } from '../../src/data/famousPeople.js';

dotenv.config();

const seedCelebrities = async () => {
    await connectDB();

    const existingCount = await Celebrity.countDocuments();
    if (existingCount > 0) {
        console.log(`Database already has ${existingCount} celebrities. Skipping seed.`);
        process.exit(0);
    }

    const celebrities = famousPeople.map(({ id, name, category, bio }) => ({
        celebrityId: id,
        name,
        category,
        bio
    }));

    await Celebrity.insertMany(celebrities);
    console.log(`Seeded ${celebrities.length} celebrities.`);
    process.exit(0);
};

seedCelebrities().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
});
