
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true

});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];
const price = Math.floor(Math.random() * 30 + 10)
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const rand1000 = Math.floor(Math.random() * cities.length);
        const price = Math.floor(Math.random() * 30 + 10)

        const camp = new Campground({
            author: '60979fe893b44217fcccecd2',
            geometry: {
                type: "Point",
                coordinates: [
                    cities[rand1000].longitude,
                    cities[rand1000].latitude
                ]
            },
            location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eveniet magnam numquam debitis placeat ipsum illum eaque eos repudiandae fugit vero! Quas ipsum itaque, voluptatibus porro iste maxime deserunt in possimus.',
            price: price,
            images: [
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ahfnenvca4tha00h2ubt.png',
                    filename: 'YelpCamp/ahfnenvca4tha00h2ubt'
                },
                {
                    url: 'https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/YelpCamp/ruyoaxgf72nzpi4y6cdi.png',
                    filename: 'YelpCamp/ruyoaxgf72nzpi4y6cdi'
                }
            ]
        })
        await camp.save();

    }
}
seedDB().then(() => {
    mongoose.connection.close();
})