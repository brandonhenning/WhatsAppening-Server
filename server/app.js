require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const router = express.Router()
const cors = require('cors')
const eventController = require('./controllers/event')

app.use(cors())
app.use(bodyParser())
app.use(router)


mongoose.connect(process.env.MONGODB_URI)
    .catch(error => { console.log(error.message) })


// Endpoint handlers for /events
router.route('/events')
    .get(eventController.getEvents)
    .post(eventController.postEvent)

// Endpoint handlers for /events/:event_id
router.route('/events/:event_id')
    .get(eventController.getEvent)
    .delete(eventController.deleteEvent)
    .put(eventController.updateEvent)


app.listen(port)

