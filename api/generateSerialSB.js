const { createClient } = require('@supabase/supabase-js');

// Supabase client setup using environment variables from Vercel
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Given digit frequencies and total counts
const digitFrequencies = [
    [31, 9501, 17158, 9417, 4054, 3663, 3512, 3490],
    [14242, 5474, 9350, 6144, 3718, 3455, 3361, 3426],
    [11642, 4910, 2877, 4377, 3650, 3526, 3541, 3531],
    [5367, 1138, 1657, 3031, 3594, 3455, 3371, 3435], 
    [2821, 1354, 533, 2518, 3547, 3324, 3411, 3377],
    [14, 3652, 1553, 2058, 3317, 3324, 3446, 3317],
    [7, 4747, 845, 1896, 3150, 3456, 3388, 3406],
    [4, 1787, 60, 1726, 3119, 3313, 3512, 3529],
    [7, 832, 92, 1578, 3125, 3432, 3353, 3293],
    [72, 812, 79, 1460, 2933, 3258, 3312, 3403]
];

const totalCounts = [
    31334, 32234, 33534, 35334, 37334, 38334, 39334, 40334
];

const weights = [2, 2, 2, 2, 1, 1, 1, 1];

// Function to calculate score for a given serial number
function calculateScore(serial) {
    let score = 0;
    let weightSum = 0;

    for (let i = 0; i < serial.length; i++) {
        let digit = parseInt(serial[i]);
        let positionFrequency = digitFrequencies[digit][i];
        let totalFrequency = totalCounts[i];

        let positionScore = (positionFrequency / totalFrequency) * 100;
        score += positionScore * weights[i];
        weightSum += weights[i];
    }

    score = (score / weightSum) / 100;
    return score;
}

// Function to insert records into Supabase in batches
async function insertRecords(start, count) {
    const batchSize = 1000; // Adjust batch size based on your testing and Supabase limits
    for (let i = start; i < start + count; i += batchSize) {
        const batch = [];
        for (let j = i; j < i + batchSize && j < start + count; j++) {
            const serialNumber = j.toString().padStart(8, '0');
            const score = calculateScore(serialNumber);
            batch.push({ serial_number: serialNumber, score: score });
        }

        const { error } = await supabase
            .from('serial_numbers')
            .insert(batch);

        if (error) {
            console.error('Error inserting batch:', error);
            // Implement retry logic or break based on the type of error
        } else {
            console.log(`Inserted batch starting at ${i}`);
        }

        // Sleep to avoid hitting rate limits (adjust the delay as needed)
        await new Promise(resolve => setTimeout(resolve, 500));
    }
}

// Start inserting records from 10000000 to 109999999
const startSerial = 10000000;
const totalRecords = 49999999;
insertRecords(startSerial, totalRecords)
    .then(() => console.log('Insertion complete'))
    .catch(err => console.error('Error during insertion:', err));
