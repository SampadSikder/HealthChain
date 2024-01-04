const fs = require('fs');
const csv = require('csv-parser');
const axios = require('axios');


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
                    patientID: "0x24334a06bbdbf847dbb88532d06cb37d2297f90f",
                    doctorID: "0x9552c165bab5a01236c4014bbccc18f1c3647288",
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
            try {
                const startTime = Date.now();

                for (const record of records) {

                    const currentDate = new Date();
                    const milliseconds = currentDate.getMilliseconds().toString().padStart(3, '0');

                    const customFormat = new Intl.DateTimeFormat('en-US', {
                        year: 'numeric', month: '2-digit', day: '2-digit',
                        hour: '2-digit', minute: '2-digit', second: '2-digit',
                        hour12: false
                    });

                    const localTimestampString = customFormat.format(currentDate) + `.${milliseconds}`;
                    console.log(localTimestampString);
                    const response = await axios.post("http://127.0.0.1:5000/api/v1/namespaces/default/apis/HealthRecord-v1/invoke/healthRecordStore", {

                        idempotencyKey: localTimestampString,
                        input: {
                            _bloodPressure: record.bloodPressure,
                            _date: record.date,
                            _diagnosedWith: record.diagnosedWith,
                            _drug: record.drug,
                            _patientID: record.patientID,
                            _pulseRate: record.pulseRate,
                            _thingsToFollow: record.thingsToFollow,
                            _unit: record.unit
                        },
                        key: record.doctorID,
                    })
                    console.log(response.data);
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

async function read_data(req, res) {
}


module.exports = {
    push_data,
    read_data
}