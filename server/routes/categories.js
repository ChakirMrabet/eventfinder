const express = require("express");
const router = express.Router();

const eventful = require("../connectors/eventful");

// Get events
router.get("/categories", async (req, res) => {
  try {
    const r = await eventful.get("/categories/list");

    // Simplify the data we send to the client
    const items = r.data.category.reduce(
      (acum, item) => {
        acum.push({
          value: item.id,
          name: item.name
        });
        return acum;
      },
      [{ value: "all", name: "All" }]
    );

    res.status(200).json({
      success: true,
      data: items
    });
  } catch (e) {
    res.status(404).json({
      success: false,
      error: e
    });
  }
});

module.exports = router;
