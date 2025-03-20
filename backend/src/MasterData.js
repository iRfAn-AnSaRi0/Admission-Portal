import mongoose from "mongoose";
import { StateName } from "./MasterDataModel/StateModel.js";
import { CityName } from "./MasterDataModel/CityModel.js";
import { CourseName } from "./MasterDataModel/CourseModel.js";
import { DbConnection } from "./db/DbConnection.js";
import dotenv from "dotenv"

dotenv.config({
    path:'./.env'
})

async function MasterData() {
    try {
        await DbConnection(); // Connect to MongoDB

        // Clear existing data
        await StateName.deleteMany({});
        await CityName.deleteMany({});
        await CourseName.deleteMany({});
        console.log("✅ Existing data cleared");

        // Insert States and Cities
        const statesData = [
            { name: "Andhra Pradesh", cities: ["Visakhapatnam", "Vijayawada", "Guntur", "Tirupati"] },
            { name: "Arunachal Pradesh", cities: ["Itanagar", "Tawang", "Pasighat", "Ziro"] },
            { name: "Assam", cities: ["Guwahati", "Dibrugarh", "Silchar", "Jorhat"] },
            { name: "Bihar", cities: ["Patna", "Gaya", "Muzaffarpur", "Bhagalpur"] },
            { name: "Chhattisgarh", cities: ["Raipur", "Bilaspur", "Durg", "Korba"] },
            { name: "Goa", cities: ["Panaji", "Margao", "Vasco da Gama"] },
            { name: "Gujarat", cities: ["Ahmedabad", "Surat", "Vadodara", "Rajkot"] },
            { name: "Haryana", cities: ["Gurgaon", "Faridabad", "Panchkula", "Rohtak"] },
            { name: "Himachal Pradesh", cities: ["Shimla", "Manali", "Dharamshala", "Solan"] },
            { name: "Jharkhand", cities: ["Ranchi", "Jamshedpur", "Dhanbad", "Bokaro"] },
            { name: "Karnataka", cities: ["Bangalore", "Mysore", "Mangalore", "Hubli"] },
            { name: "Kerala", cities: ["Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur"] },
            { name: "Madhya Pradesh", cities: ["Bhopal", "Indore", "Gwalior", "Jabalpur"] },
            { name: "Maharashtra", cities: ["Mumbai", "Pune", "Nagpur", "Nashik"] },
            { name: "Manipur", cities: ["Imphal", "Thoubal", "Churachandpur", "Senapati"] },
            { name: "Meghalaya", cities: ["Shillong", "Tura", "Jowai", "Nongstoin"] },
            { name: "Mizoram", cities: ["Aizawl", "Lunglei", "Champhai", "Serchhip"] },
            { name: "Nagaland", cities: ["Kohima", "Dimapur", "Mokokchung", "Mon"] },
            { name: "Odisha", cities: ["Bhubaneswar", "Cuttack", "Rourkela", "Sambalpur"] },
            { name: "Punjab", cities: ["Chandigarh", "Ludhiana", "Amritsar", "Jalandhar"] },
            { name: "Rajasthan", cities: ["Jaipur", "Udaipur", "Jodhpur", "Kota"] },
            { name: "Sikkim", cities: ["Gangtok", "Namchi", "Gyalshing", "Mangan"] },
            { name: "Tamil Nadu", cities: ["Chennai", "Coimbatore", "Madurai", "Tiruchirapalli"] },
            { name: "Telangana", cities: ["Hyderabad", "Warangal", "Karimnagar", "Nizamabad"] },
            { name: "Tripura", cities: ["Agartala", "Dharmanagar", "Udaipur", "Ambassa"] },
            { name: "Uttar Pradesh", cities: ["Lucknow", "Kanpur", "Varanasi", "Agra"] },
            { name: "Uttarakhand", cities: ["Dehradun", "Haridwar", "Nainital", "Roorkee"] },
            { name: "West Bengal", cities: ["Kolkata", "Howrah", "Darjeeling", "Asansol"] }
        ];

        let insertedStates = [];
        for (let state of statesData) {
            let newState = await StateName.create({ name: state.name });
            insertedStates.push(newState);
        }
        console.log("✅ States added");

        let cities = [];
        for (let i = 0; i < statesData.length; i++) {
            for (let city of statesData[i].cities) {
                cities.push({ name: city, stateId: insertedStates[i]._id });
            }
        }
        await CityName.insertMany(cities);
        console.log("✅ Cities added");

        // Insert Courses
        const coursesData = [
            { name: "B.Tech (Computer Science & Engineering)" },
            { name: "B.Tech (Mechanical Engineering)" },
            { name: "B.Tech (Electrical Engineering)" },
            { name: "B.Tech (Civil Engineering)" },
            { name: "B.Tech (Electronics & Communication Engineering)" },
            { name: "B.Tech (Biotechnology)" },
            { name: "BBA (Bachelor of Business Administration)" },
            { name: "B.Com (Bachelor of Commerce)" },
            { name: "BA (Bachelor of Arts)" },
            { name: "B.Sc (Bachelor of Science)" },
            { name: "BCA (Bachelor of Computer Applications)" },
            { name: "B.Pharm (Bachelor of Pharmacy)" },
            { name: "B.Arch (Bachelor of Architecture)" },
            { name: "LLB (Bachelor of Law)" },
            { name: "MBBS (Bachelor of Medicine, Bachelor of Surgery)" },
            { name: "BDS (Bachelor of Dental Surgery)" },
            { name: "B.Ed (Bachelor of Education)" },
            { name: "BHM (Bachelor of Hotel Management)" },
            { name: "BPT (Bachelor of Physiotherapy)" },
            { name: "B.Sc (Nursing)" }
        ];

        console.log("📌 Course Data Before Insertion:", coursesData);
await CourseName.insertMany(coursesData);
console.log("✅ Courses added successfully");


        console.log("🎉 Master Data Seeding Completed!");
        process.exit();
    } catch (error) {
        console.error("❌ Error seeding data:", error);
        process.exit(1);
    }
}

// Run the function
MasterData();
