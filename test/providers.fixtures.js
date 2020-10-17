function makeTestProviders() {
  return [
    {
      id: 1,
      name: "Joes Pizza",
      address: "2020 marine rd",
      zip: 12099,
      phone: "(918)555-5511",
      email: "joe@pizza.com",
      password: "$2a$10$aaB8w.hv0g/afxkx/lG.fOGyAAJBNKyrZt2DOAIabqHCVTvTd.9uW",
      type: "Italian",
    },
  ];
}

module.exports = { makeTestProviders };
