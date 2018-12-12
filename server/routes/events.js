const express = require("express");
const router = express.Router();

const eventful = require("../connectors/eventful");

// Get events
router.get("/events/:lat,:lng", async (req, res) => {
  const { lat, lng } = req.params;

  try {
    const r = await eventful.get("", {
      params: {
        location: `${lat},${lng}`,
        include: "categories,links",
        within: 50,
        page_size: 9999,
        date: "Today"
      }
    });

    // Simplify the data we send to the client
    const items = r.data.events.event.reduce((acum, item) => {
      acum.push({
        id: item.id,
        lat: parseFloat(item.latitude),
        lng: parseFloat(item.longitude),
        address: item.venue_address,
        city: item.city_name,
        zip: parseInt(item.postal_code),
        state: item.region_abbr,
        country: item.country_abbr,
        title: item.title,
        description: item.description,
        venueId: item.venue_id,
        venueName: item.venue_name,
        startTime: item.start_time,
        stopTime: item.stop_time,
        allDay: parseInt(item.all_day) === 1,
        image: item.image
      });
      return acum;
    }, []);

    res.status(200).json({
      success: true,
      data: {
        total: parseInt(r.data.total_items),
        currentPage: parseInt(r.data.page_number),
        totalPages: parseInt(r.data.page_count),
        pageSize: parseInt(r.data.page_size),
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

module.exports = router;
