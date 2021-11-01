const express = require("express")

const app = express()

const startApp = () => {
    const PORT = 3001
    try {
        app.listen(PORT, () => {
            console.log(`Server started on http://localhost:${PORT}/`)
        })
    } catch (e) {
        console.log(e)
    }
}

startApp()