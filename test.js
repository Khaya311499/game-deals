// Run with: node test.js
const assert = require("assert");
const { DEALS, isOnSale, getOnSale, discountPercent, findCheapest, searchTitles } = require("./deals.js");

// getOnSale: 6 of the 8 games are discounted (Stardew Valley and Terraria are not)
const onSale = getOnSale(DEALS);
assert.strictEqual(onSale.length, 6);
assert.ok(!onSale.some((g) => g.title === "Stardew Valley" || g.title === "Terraria"));

// isOnSale edge cases
assert.strictEqual(isOnSale({ normalPrice: 10, salePrice: 10 }), false);
assert.strictEqual(isOnSale({ normalPrice: 10, salePrice: 9.99 }), true);

// discountPercent
const byTitle = (t) => DEALS.find((g) => g.title === t);
assert.strictEqual(discountPercent(byTitle("Hollow Knight")), 50);
assert.strictEqual(discountPercent(byTitle("Celeste")), 75);
assert.strictEqual(discountPercent(byTitle("Portal 2")), 90);
assert.strictEqual(discountPercent(byTitle("Disco Elysium")), 75);
assert.strictEqual(discountPercent(byTitle("Stardew Valley")), 0);
assert.strictEqual(discountPercent({ normalPrice: 0, salePrice: 0 }), 0);

// findCheapest
assert.strictEqual(findCheapest(DEALS).title, "Portal 2");
assert.strictEqual(findCheapest([]), null);

// searchTitles
assert.deepStrictEqual(searchTitles(DEALS, "HADES").map((g) => g.title), ["Hades"]);
assert.deepStrictEqual(searchTitles(DEALS, "  cel ").map((g) => g.title), ["Celeste"]);
assert.strictEqual(searchTitles(DEALS, "").length, DEALS.length);
assert.strictEqual(searchTitles(DEALS, "zzz").length, 0);

console.log("All tests passed ✅");
