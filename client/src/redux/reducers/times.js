const defaultState = {
  selected: "today",
  items: [
    { value: "today", name: "Today" },
    { value: "this week", name: "This Week" },
    { value: "next saturday", name: "Next Week" },
    { value: "date", name: "Date" }
  ]
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
