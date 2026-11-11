// Parts B & C — render the deals, live search, on-sale filter, CheapShark data.

const state = {
  games: DEALS,        // current data source
  currency: "R",       // sample data is in Rand; live CheapShark data is in US dollars
  query: "",
  onSaleOnly: false,
};

const listEl = document.getElementById("deals");
const statusEl = document.getElementById("status");
const summaryEl = document.getElementById("summary");
const searchEl = document.getElementById("search");
const onSaleEl = document.getElementById("onSaleOnly");
const liveEl = document.getElementById("useLive");

const money = (amount) => `${state.currency}${amount.toFixed(2)}`;

function createCard(game) {
  const li = document.createElement("li");
  li.className = "card";

  const sale = isOnSale(game);

  const top = document.createElement("div");
  top.className = "card-top";

  const title = document.createElement("h2");
  title.textContent = game.title; // textContent keeps API data from injecting HTML
  top.appendChild(title);

  if (sale) {
    // The "ON SALE" tag only appears for discounted games.
    const tag = document.createElement("span");
    tag.className = "tag";
    tag.textContent = "ON SALE";
    top.appendChild(tag);
  }
  li.appendChild(top);

  const store = document.createElement("p");
  store.className = "store";
  store.textContent = game.store;
  li.appendChild(store);

  const prices = document.createElement("p");
  prices.className = "prices";

  const salePrice = document.createElement("span");
  salePrice.className = "sale-price";
  salePrice.textContent = money(game.salePrice);
  prices.appendChild(salePrice);

  if (sale) {
    const was = document.createElement("s");
    was.className = "normal-price";
    was.textContent = money(game.normalPrice);
    prices.appendChild(was);

    const pct = document.createElement("span");
    pct.className = "pct";
    pct.textContent = `-${discountPercent(game)}%`;
    prices.appendChild(pct);
  }
  li.appendChild(prices);

  return li;
}

function render() {
  let visible = searchTitles(state.games, state.query);
  if (state.onSaleOnly) visible = getOnSale(visible);

  listEl.replaceChildren(...visible.map(createCard));

  const cheapest = findCheapest(visible);
  summaryEl.textContent = cheapest
    ? `${visible.length} deal${visible.length === 1 ? "" : "s"} · cheapest: ${cheapest.title} at ${money(cheapest.salePrice)}`
    : "";

  if (visible.length === 0) {
    statusEl.textContent = "No games match your search.";
  } else if (!statusEl.dataset.sticky) {
    statusEl.textContent = "";
  }
}

// ---- Stretch: real data from the CheapShark API ----
async function loadLive() {
  statusEl.dataset.sticky = "1";
  statusEl.textContent = "Loading live deals…";
  try {
    const [dealsRes, storesRes] = await Promise.all([
      fetch("https://www.cheapshark.com/api/1.0/deals?pageSize=24&sortBy=Title"),
      fetch("https://www.cheapshark.com/api/1.0/stores"),
    ]);
    if (!dealsRes.ok || !storesRes.ok) throw new Error("Bad response");

    const deals = await dealsRes.json();
    const stores = await storesRes.json();
    const storeNames = Object.fromEntries(stores.map((s) => [s.storeID, s.storeName]));

    state.games = deals.map((d) => ({
      id: d.dealID,
      title: d.title,
      normalPrice: parseFloat(d.normalPrice),
      salePrice: parseFloat(d.salePrice),
      store: storeNames[d.storeID] || "Unknown store",
    }));
    state.currency = "$"; // CheapShark prices are in USD
    statusEl.textContent = "Showing live prices in US dollars.";
  } catch (err) {
    // If the API is down or offline, fall back to the sample data.
    liveEl.checked = false;
    useSample();
    statusEl.textContent = "Couldn't load live data — showing sample deals instead.";
  }
  render();
}

function useSample() {
  state.games = DEALS;
  state.currency = "R";
}

searchEl.addEventListener("input", (e) => {
  state.query = e.target.value;
  render();
});

onSaleEl.addEventListener("change", (e) => {
  state.onSaleOnly = e.target.checked;
  render();
});

liveEl.addEventListener("change", (e) => {
  if (e.target.checked) {
    loadLive();
  } else {
    useSample();
    delete statusEl.dataset.sticky;
    statusEl.textContent = "";
    render();
  }
});

render();
