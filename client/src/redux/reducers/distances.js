const defaultState = {
  selected: 15,
  items: [
    { value: 15, name: "15 Miles" },
    { value: 25, name: "25 Miles" },
    { value: 45, name: "45 Miles" },
    { value: 60, name: "60 Miles" },
    { value: 100, name: "100 Miles" }
  ]
};

export default (state = defaultState, { type, payload }) => {
  switch (type) {
    default:
      return state;
  }
};
