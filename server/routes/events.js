const express = require("express");
const router = express.Router();

const eventful = require("../connectors/eventful");

// Get events
router.get("/events/:lat,:lng/:when/:range/:category", async (req, res) => {
  const { lat, lng, when, range, category } = req.params;

  try {
    const r = await eventful.get("/events/search", {
      params: {
        location: `${lat},${lng}`,
        within: range,
        date: when,
        category,
        page_size: 9999,
        include: "categories,price"
      }
    });

    let items = [];
    if (parseInt(r.data.total_items)) {
      // Simplify the data we send to the client
      items = r.data.events.event.reduce((acum, item) => {
        acum.push({
          id: item.id,
          lat: parseFloat(item.latitude),
          lng: parseFloat(item.longitude),
          title: item.title,
          description: item.description,
          categories: item.categories,
          free: parseInt(item.free) == 1,
          price: item.price
        });
        return acum;
      }, []);
    }

    res.status(200).json({
      success: true,
      data: {
        total: parseInt(r.data.total_items),
        items: items
      }
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      error: e
    });
  }
});

// Gets one event given its ID
router.get("/events/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const r = await eventful.get("/events/get", {
      params: {
        id,
        image_sizes: "block250"
      }
    });

    const item = r.data;

    res.status(200).json({
      success: true,
      data: {
        id: item.id,
        address: item.venue_address,
        city: item.city_name,
        zip: parseInt(item.postal_code),
        state: item.region_abbr,
        country: item.country_abbr,
        title: item.title,
        description: item.description,
        venueName: item.venue_name,
        startTime: item.start_time,
        stopTime: item.stop_time,
        allDay: parseInt(item.all_day) === 1,
        privacy: parseInt(item.privacy) === 1 ? "public" : "private",
        price: item.price,
        free: parseInt(item.free) == 1,
        links: item.links ? item.links.link : [],
        categories: item.categories ? item.categories.category : [],
        image: item.images
      }
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      error: e
    });
  }
});

module.exports = router;
