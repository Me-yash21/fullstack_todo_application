import dotenv from 'dotenv/config'
import app from './src/app.js'
import { connectDB } from './src/common/config/db.config.js'


async function startServer() {
  try {
    await connectDB();

    const port = process.env.PORT;
    app.listen(port, () => {
      console.log(`Server is Running on Port:${port}.`)
    })

  } catch (error) {
    console.error("Fatal error while starting Server:- ", error.message)
    process.exit(1);
  }
}

startServer();