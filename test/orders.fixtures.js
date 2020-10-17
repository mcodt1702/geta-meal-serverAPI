function makeTestOrder() {
  return [
    {
      id: 1,
      provider_id: 1,
      consumer_id: 1,
      status: "completed",
    },
  ];
}

module.exports = { makeTestOrder };
