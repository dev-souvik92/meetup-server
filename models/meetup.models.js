const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    eventImageUrl: {
      type: String,
      required: true,
    },
    eventMode: {
      type: String,
      enum: ["Online Event", "Offline Event"],
      required: true,
    },
    eventStartingTime: {
      type: String,
      required: true,
    },
    eventEndTime: {
      type: String,
      required: true,
    },
    eventDetails: {
      type: String,
      required: true,
    },
    dressCode: {
      type: String,
      required: true,
    },
    age: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    fees: {
      type: Number,
      required: true,
    },
    speakers: [
      {
        name: String,
        speakerImage: String,
        title: String,
      },
    ],
    eventTags: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

const Meetup = mongoose.model("Meetup", meetupSchema);

module.exports = Meetup;
