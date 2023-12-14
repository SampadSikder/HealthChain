const { HealthRecords } = require('../models');
const fs = require('fs');
const csv = require('csv-parser');

async function push_data(req, res) {
    const number_of_records = req.body.records;
    if (!fs.existsSync('../dataset/mock_data_50000.csv')) {
        return res.status(404).json({ error: 'CSV file not found' });
    }

    const records = [];
    fs.createReadStream('../dataset/mock_data_50000.csv')
        .pipe(csv())
        .on('data', (row) => {
            if (records.length < number_of_records) {
                const record = {
                    patientID: row.patient_id,
                    doctorID: row.doctor_id,
                    date: row.date,
                    diagnosedWith: row.diagnosed_with,
                    bloodPressure: row.blood_pressure,
                    pulseRate: row.pulse_rate,
                    drug: row.drug,
                    unit: row.unit,
                    thingsToFollow: row.things_to_follow,
                };
                records.push(record);
            }
        })
        .on('end', async () => {
            //console.log(records);
            try {
                const startTime = Date.now();

                for (const record of records) {
                    await HealthRecords.create(record);
                }

                const endTime = Date.now();
                const totalTime = endTime - startTime;
                console.log('Time:(in ms)' + totalTime)
                res.status(200).json({ message: 'Time:(in ms)', totalTime });
            } catch (error) {
                res.status(500).json({ error: 'Internal server error' });
            }
        });
}



module.exports = {
    push_data
};