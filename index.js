const express = require("express");
const app = express();
const { initializeDatabase } = require("./db/db.connect");
// const fs = require("fs");
const Meetup = require("./models/meetup.models");

initializeDatabase();

// CORS
const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

// const jsonData = fs.readFileSync("meetup.json", "utf-8");
// const meetupData = JSON.parse(jsonData);

app.use(express.json());

// function seedData() {
//   try {
//     for (const meetup of meetupData) {
//       const newMeetup = new Meetup({
//         title: meetup.title,
//         eventImageUrl: meetup.eventImageUrl,
//         eventMode: meetup.eventMode,
//         eventStartingTime: meetup.eventStartingTime,
//         eventEndTime: meetup.eventEndTime,
//         eventDetails: meetup.eventDetails,
//         dressCode: meetup.dressCode,
//         age: meetup.age,
//         address: meetup.address,
//         fees: meetup.fees,
//         speakers: meetup.speakers,
//       });

//       newMeetup.save();
//     }
//   } catch (error) {
//     console.log("Error seeding the data", error);
//   }
// }

// seedData();

// Find all the data from database
app.get("/meetup", async (req, res) => {
  try {
    const meetup = await Meetup.find();
    res.json(meetup);
  } catch (error) {
    res.status(500).json({ error: "Error occured while fetching data." });
  }
});

async function createMeetup(newMeetup){
  try{
    const meetup = new Meetup(newMeetup)
    const saveMeetup = await meetup.save()
    return saveMeetup
  } catch(error){
    throw error
  }
}

app.post("/meetup", async (req, res) => {
  try{
    const saveMeetups = await createMeetup(req.body)
    res.status(201).json({message: "Meetup added successfully.", meetup: saveMeetups})
  } catch(error){
    res.status(500).json({error: "Failed to add meetup."})
  }
})

// update data

async function readMeetupDataById(meetupId, dataToUpdate){
  try{
    const updatedMeetup = await Meetup.findByIdAndUpdate(meetupId, dataToUpdate, {new: true})
    return updatedMeetup
  } catch (error){
    console.log("Error in updating meetup data.", error)
  }
}

app.post("/meetup/:meetupId", async (req, res) => {
  try{
    const updatedMeetup = await readMeetupDataById(req.params.meetupId, req.body)
    if(updatedMeetup){
      res.status(200).json({message: "Meetup data updated successfully.", updatedMeetup: updatedMeetup})
    } else{
      res.status(404).json({error: "Meetup not found."})
    }
  } catch(error){
    res.status(500).json({error: "Failed to update meetup data."})
  }
})

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
