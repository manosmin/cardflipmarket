
# Card Price Tracker

A web application designed to track and analyze the prices of items in a digital collectible card game named [MTGO](https://www.mtgo.com/en/mtgo), helping players spot potential price spikes on a daily basis.

It's currently being hosted and maintained, in order to help the community make informed and data-driven decisions on buying, selling and trading their cards.

You can check it out [here](https://cardflipmarket-manosmin.onrender.com/), or deploy it on your machine following the instructions given below.

## Tech Stack

<img src="https://github.com/tandpfun/skill-icons/raw/main/icons/MongoDB.svg" alt="mongodb" height=45> <img src="https://github.com/tandpfun/skill-icons/raw/main/icons/ExpressJS-Dark.svg" alt="expressjs" height=45> <img src="https://github.com/tandpfun/skill-icons/raw/main/icons/React-Dark.svg" alt="reactjs" height=45> <img src="https://github.com/tandpfun/skill-icons/raw/main/icons/NodeJS-Dark.svg" alt="nodejs" height=45>

## File Structure

```bash
.
└── cardflipmarket/
    ├── node_modules
    ├── client/
    │   ├── node_modules
    │   ├── public
    │   ├── src/
    │   │   ├── components/
    │   │   │   ├── ChartPopover.js
    │   │   │   ├── Footer.js
    │   │   │   ├── Header.js
    │   │   │   └── Table.js
    │   │   ├── App.js
    │   │   ├── index.css
    │   │   ├── index.js
    │   │   └── tailwind.css
    │   ├── package-lock.json
    │   ├── package.json
    │   └── tailwind.config.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   └── oracleCardControllers.js
    ├── models/
    │   ├── OracleCard.js
    │   └── OracleCardPrices.js
    ├── routes/
    │   └── oracleCardRoutes.js
    ├── utils/
    │   ├── fetch.js
    │   ├── schedule.js
    │   └── upload.js
    ├── .env
    ├── .gitignore
    ├── index.js
    ├── package-lock.json
    └── package.json

```

## Environment

Before you build the application, you should create an `.env` file in the root folder using your own variables, e.g.

`DB_URL = mongodb://localhost:27017/cardflipmarket_db`

`PORT = 5000`

`NODE_ENV = PRODUCTION`



## Installation

Build both client and server using

```bash
  npm run build
```

and start it

```bash
  npm run server
```




