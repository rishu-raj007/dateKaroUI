const mongoose = require('mongoose');
require('dotenv').config({ path: './server/.env' });
const Profile = require('./server/models/Profile');
const User = require('./server/models/User');

async function checkDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to DB');

        const totalUsers = await User.countDocuments();
        console.log('Total Users:', totalUsers);

        const totalProfiles = await Profile.countDocuments();
        console.log('Total Profiles:', totalProfiles);

        const completeProfiles = await Profile.find({ isProfileComplete: true });
        console.log('Complete Profiles Count:', completeProfiles.length);

        if (completeProfiles.length > 0) {
            console.log('Sample Genders:', completeProfiles.map(p => p.genderIdentity));
            console.log('Sample Desires:', completeProfiles.map(p => p.lookingFor));
        }

        await mongoose.connection.close();
    } catch (err) {
        console.error('DB Check Error:', err);
    }
}

checkDB();
