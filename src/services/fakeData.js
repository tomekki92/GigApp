const gigs = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    name: "gig0",
    date: "2021-07-30",
    time: "20:00 GMT+3",
    venue: "Loftas",
    country: "Vilnius, LTU",
    status: { title: "Approved", color: "green" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    name: "gig1",
    date: "2021-08-30",
    time: "16:00 GMT+3",
    venue: "Arena BBs",
    country: "Plunge, LTU",
    status: { title: "Cancelled", color: "red" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    name: "gig2",
    date: "2022-01-30",
    time: "20:00 GMT+3",
    venue: "Lemmy",
    country: "Kaunas, LTU",
    status: { title: "Pending", color: "black" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    name: "gig3",
    date: "2020-01-30",
    time: "20:00 GMT+3",
    venue: "Zhiguli",
    country: "Kaliningrad, RUS",
    status: { title: "Happened", color: "gray" },
  },
];

export function getGigs() {
  return gigs;
}
