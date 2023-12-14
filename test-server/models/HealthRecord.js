module.exports = (sequelize, DataTypes) => {
    const HealthRecords = sequelize.define("HealthRecords", {
        patientID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        doctorID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        diagnosedWith: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bloodPressure: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pulseRate: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        drug: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        thingsToFollow: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });
    return HealthRecords;
}