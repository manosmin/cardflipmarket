
# Card Price Tracker

Web application that monitors prices in a digital collectible card game named **[MTGO](https://www.mtgo.com/en/mtgo)**, aiming to discover and show potential price spikes or collapses. It uses bulk data fetched on a daily basis from **[Scryfall](https://scryfall.com/docs/api)** and inserts into a database, providing card price history and other relevant information through a REST API.

**It's currently being hosted and maintained, in order to help the game's player base catch-up on the real market, as well as make data-driven decisions on buying or selling digital or real collectible cards of the specified game.**

*This project is live **[here](https://cardflipmarket-manosmin.onrender.com/)** in order to give it a quick look instead of deploying it locally.*




## Tech stack

**Front End:** React

**Back End:** Node.js, Express.js, MongoDB

**Libraries:** Chart.js, node-cron, mongoose, axios


## Project Structure

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

In the root directory, there is a server file with an endpoint to hit on, and some folders for each one of specific tasks done in the back end.

* **config**→ *Configures and connects to the database.*
* **models**→ *Schemas for card info and card price history documents.*
* **routes**→ *Configures and calls a specific controller when user hits the endpoint.*
* **controllers**→ *Functions that do certain operations in the database, when users ask for them.*
* **utils**→ *Necessary files needed in our application. More specifically:*
    * **fetch.js**→ *Fetches bulk data from Scryfall (using [axios](https://axios-http.com/docs/intro))*
    * **schedule.js**→ *Processes card data on a daily basis (using [node-cron](https://www.npmjs.com/package/node-cron))*
    * **upload.js**→ *Inserts and updates cards and price history collections in the database (using [mongoose](https://mongoosejs.com/))*

The client directory is where the front end sits.

- **public**→ *The index.html file and the website logo.*
- **src**→ *Source code for the application.*
- **components**→ *Different components of application, including the table where the cards data is shown and the price history chart.*

## Environment Variables

Before you build the application, you should create an `.env` file in the root folder using your own variables, e.g.

`DB_URL = mongodb://localhost:27017/cardflipmarket_db`

`PORT = 5000`

`NODE_ENV = PRODUCTION`



## Run Locally

Build both front and back end using 

```bash
  npm run build
```

and start the server

```bash
  npm run server
```


## Screenshots

![Screenshot 0](screenshots/ss0.png)



