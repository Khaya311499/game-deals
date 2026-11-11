// Part A — Thinking in code
// Small, pure functions over a list of game deals.
// All prices in the sample data are in Rand (R).

const DEALS = [
  { id: 1, title: "Hollow Knight", normalPrice: 14.99, salePrice: 7.49, store: "Steam" },
  { id: 2, title: "Stardew Valley", normalPrice: 13.99, salePrice: 13.99, store: "GOG" },
  { id: 3, title: "Celeste", normalPrice: 19.99, salePrice: 4.99, store: "Steam" },
  { id: 4, title: "Hades", normalPrice: 24.99, salePrice: 12.49, store: "Epic Games" },
  { id: 5, title: "Portal 2", normalPrice: 9.99, salePrice: 0.99, store: "Steam" },
  { id: 6, title: "Terraria", normalPrice: 9.99, salePrice: 9.99, store: "GOG" },
  { id: 7, title: "Disco Elysium", normalPrice: 39.99, salePrice: 9.99, store: "GOG" },
  { id: 8, title: "Cuphead", normalPrice: 19.99, salePrice: 14.99, store: "Steam" },
];

// A game is on sale when its sale price is lower than its normal price.
function isOnSale(game) {
  return game.salePrice < game.normalPrice;
}

// 1. Filter the games that are on sale.
function getOnSale(games) {
  return games.filter(isOnSale);
}

// 2. Discount percentage, rounded to a whole number. 0 if not discounted.
function discountPercent(game) {
  if (!isOnSale(game) || game.normalPrice <= 0) return 0;
  return Math.round(((game.normalPrice - game.salePrice) / game.normalPrice) * 100);
}

// 3. Cheapest game by sale price. Returns null for an empty list.
//    If two games tie, the first one in the list wins.
function findCheapest(games) {
  if (games.length === 0) return null;
  return games.reduce((cheapest, game) =>
    game.salePrice < cheapest.salePrice ? game : cheapest
  );
}

// 4. Case-insensitive title search. An empty query returns everything.
function searchTitles(games, query) {
  const q = String(query).trim().toLowerCase();
  if (q === "") return games;
  return games.filter((game) => game.title.toLowerCase().includes(q));
}

// Lets Node (tests) and the browser (script tag) both use this file.
if (typeof module !== "undefined") {
  module.exports = { DEALS, isOnSale, getOnSale, discountPercent, findCheapest, searchTitles };
}
