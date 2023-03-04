const app = require("./src/app");

const DEV_APP_PORT = process.env.DEV_APP_PORT || 3002

const server = app.listen(DEV_APP_PORT, () => {
    console.log(`WSV eCommerce start with ${DEV_APP_PORT}`);
})

process.on('SIGINT', () => {
    server.close(() => console.log("Exit Server Express"));
    
})