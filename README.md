# 🎮 Game Deals

A small web page that lists game deals, flags the ones that are on sale, and lets you search and filter them.

- **Part A:** pure functions in `deals.js` (filter on-sale games, discount %, cheapest game, case-insensitive search), tested in `test.js`
- **Part B:** `index.html` + `app.js` list the deals with the sale price and an **ON SALE** tag only on discounted games
- **Part C (stretch):** live search, an "On sale only" filter, real data from the CheapShark API, and nicer styling

A game is **on sale** when its `salePrice` is lower than its `normalPrice`.

---

## Setup instructions

No installs or build step are needed.

1. Download or clone this project.
2. Open `index.html` in any modern browser (double-click it).
3. To run the Part A tests (needs [Node.js](https://nodejs.org)):
   ```bash
   node test.js
   ```
   You should see `All tests passed ✅`.

> Tip: the live-data toggle calls the CheapShark API. If your browser blocks it when opening the file directly, run a tiny local server instead, e.g. `npx serve` or `python -m http.server`, and open the address it prints.

## File overview

| File | Purpose |
|---|---|
| `deals.js` | Sample data + the Part A functions (works in the browser and in Node) |
| `test.js` | Assertions for every Part A function, including edge cases |
| `index.html` | Page structure |
| `app.js` | Rendering, search, filter, CheapShark loading |
| `styles.css` | Styling |

## Choices I made

- **Pure functions, separate from the page.** The Part A functions take a list and return a result without touching the page, so they are easy to test and reuse in Part B.
- **One `isOnSale` rule.** Everything (the filter, the tag, the discount %) uses the same definition, so they can't disagree.
- **Discount % is rounded to a whole number** and is `0` for games that aren't discounted (or have a normal price of 0, to avoid dividing by zero).
- **`textContent` instead of `innerHTML`** when drawing cards, so text from the API can never inject HTML.
- **Fallback to sample data.** If the CheapShark request fails, the page shows a message and goes back to the sample deals instead of breaking.
- **Plain HTML/CSS/JS** with no framework, because the project is small and this keeps setup to zero.

## Assumptions

- Sample prices are in **Rand (R)** as the brief says. CheapShark returns **US dollars**, so the page switches the symbol to `$` for live data rather than pretending it is Rand (no exchange rate is applied).
- "Cheapest" means the lowest **sale price** (not the biggest discount). On a tie, the first game in the list wins. An empty list returns `null`.
- Search matches anywhere in the title (`"cel"` finds Celeste), ignores case, and ignores spaces at the start and end. An empty search shows all games.
- A game whose sale price equals its normal price (Stardew Valley, Terraria) is **not** on sale, so it gets no tag, no strikethrough price and no discount %.
- The cheapest game shown in the header reflects what is currently visible after searching or filtering.

## Obstacles

<!-- TODO (you): replace with what genuinely got in your way. Be specific, e.g. a bug, how you found it and how you fixed it. -->
- _Add your own: what was hard or confusing, and how you got past it._

## Resources used

- MDN Web Docs (JavaScript array methods, `fetch`, DOM APIs): https://developer.mozilla.org
- CheapShark API documentation: https://apidocs.cheapshark.com
- Claude (AI assistant) helped draft and structure the code and README; I reviewed, ran and understood it.
<!-- TODO (you): edit this list to match what you actually used, and be honest about AI help. -->

## Time taken

<!-- TODO (you): fill in your real time, e.g. "About 3 hours: 1h Part A, 1h Part B, 1h stretch goals + README". -->
- _Add your real time here._

## What I'd do differently

- Add a **sort** option (price, biggest discount, A–Z).
- Convert the live USD prices to Rand using a currency API so everything is comparable.
- Add **debouncing** to search and **pagination** for large API results.
- Show a **loading skeleton** and a **retry** button when the API fails.
- Host it on GitHub Pages so reviewers can try it without downloading anything.
<!-- TODO (you): add anything you personally would change. -->
