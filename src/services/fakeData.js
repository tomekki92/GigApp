import * as statusAPI from "./fakeStatus";

const gigs = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "gig0",
    date: "2021-07-30",
    time: "20:00",
    venue: "Loftas",
    country: "Vilnius, LTU",
    status: {
      _id: "5b21ca3eeb7f6fbccd471818",
      title: "Approved",
      color: "green",
    },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "gig1",
    date: "2021-08-30",
    time: "16:00",
    venue: "Arena BBs",
    country: "Plunge, LTU",
    status: {
      _id: "5b21ca3eeb7f6fbccd471814",
      title: "Cancelled",
      color: "red",
    },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "gig2",
    date: "2022-01-30",
    time: "20:00",
    venue: "Lemmy",
    country: "Kaunas, LTU",
    status: {
      _id: "5b21ca3eeb7f6fbccd471820",
      title: "Pending",
      color: "black",
    },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "gig3",
    date: "2020-01-30",
    time: "20:00",
    venue: "Zhiguli",
    country: "Kaliningrad, RUS",
    status: {
      _id: "5b21ca3eeb7f6fbccd471839",
      title: "Happened",
      color: "gray",
    },
  },
];

export function getGigs() {
  return Promise.resolve(gigs);
}

export function getGig(id) {
  return gigs.find((g) => g._id === id);
}

export function saveGig(gig) {
  let gigInDb = gigs.find((g) => g._id === gig._id) || {};
  gigInDb.name = gig.name;
  gigInDb.date = gig.date;
  gigInDb.time = gig.time;
  gigInDb.venue = gig.venue;
  gigInDb.country = gig.country;
  gigInDb.status = statusAPI.status.find((s) => s._id === gig.statusId);

  if (!gigInDb._id) {
    gigInDb._id = Date.now().toString();
    gigs.push(gigInDb);
  }

  return gigInDb;
}
