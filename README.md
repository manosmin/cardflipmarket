
# <img height="30px" src="/client/public/favicon.ico"/> CardFlipMarket

CardFlipMarket is a website that discovers and shows the latest card price spikes in MTGO, a digital collectible card game. Users can choose between different time ranges for price spikes, and can also see line charts with the full price history for the each of the spiked cards.

New price history data is automatically fetched from [Scryfall API](https://scryfall.com/docs/api) on a daily basis, and inserted into a database, in order to provide the most up-to-date card prices available. 

Users can exploit this information by predicting corresponding card price spikes in the real world, and can decide whether or not to invest in the actual market of the tabletop game.

The website is live at https://cardflipmarket-manosmin.onrender.com/




## Tech stack

Front End: React.js, Tailwind CSS

Back End: Node.js, Express.js, MongoDB

Libraries: Chart.js, node-cron, mongoose, axios


## Project Tree

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

In the root directory, we have the server file with an endpoint to hit on and some folders for each one of specific tasks done in the back end.

* *config*→ Configures and connects to the database.
* *models*→ Schemas for different documents.
* *routes*→ Configures and calls a specific controller when user hits the endpoint.
* *controllers*→ Functions that do certain operations, when users ask for them.
* *utils*→ Necessary files needed in our application. More specifically:
    * *fetch.js*→ Fetches bulk data from Scryfall API *(using [axios](https://axios-http.com/docs/intro))*
    * *schedule.js*→ Processes cards data on a daily basis *(using [node-cron](https://www.npmjs.com/package/node-cron))*
    * *upload.js*→ Inserts and updates collections in the database *(using [mongoose](https://mongoosejs.com/))*

The client directory is where the front end sits.

- *public*→ The index.html file and the website logo.
- *src*→ Source code for the application.
- *components*→ Different components of application.

## Environment Variables

Configure an .env file in the root folder using your own variables, e.g.

`DB_URL = mongodb://localhost:27017/cardflipmarket_db`

`PORT = 5000`

`NODE_ENV = PRODUCTION`



## Run Locally

Clone the project

```bash
  git clone https://github.com/manosmin/cardflipmarket
```

Build both front and back end using 

```bash
  npm run build
```

Start the server

```bash
  node index.js
```


## Screenshots

![Screenshot 0](screenshots/ss0.png)

![Screenshot 0](screenshots/ss1.png)

