function makeTestOrder() {
  return [
    {
      provider_id: 1,
      consumer_id: 1,
      status: "completed",
    },
  ];
}

module.exports = { makeTestOrder };
