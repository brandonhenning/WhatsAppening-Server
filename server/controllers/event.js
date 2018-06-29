const Listing = require('../models/event')


exports.getEvents = (request, response) => {
    Listing.find((error, events) => {
        if (error)
            return response.status(500).json({error: error.message})
        return response.status(200).json(events)
    })
}

exports.postEvent = (request, response) => {
    let listing = new Listing(request.body)
    if (checkNoFieldsBlank(request) && checkForAllFields(request)) {
        listing.save(error => {
            if (error)
               return response.status(500).json({error: error.message})
            return response.status(200).json({ message: 'Event added to the listings!' })
        })
    } else response.status(400).json({error: 'Create event error: Not all fields are formatted correctly, please adjust and resubmit'})
}


function checkNoFieldsBlank(request) {
    let rb = request.body
    if (rb.title === '' || rb.category === '' || rb.location === '' || rb.description === ''
        || rb.imageURL === '' || rb.email === '' || rb.time === '' || rb.date === '') {
            return false
        } else return true
}

function checkForAllFields (request) {
    let rb = request.body
    if (!rb.title || !rb.category || !rb.location || !rb.description
        || !rb.imageURL || !rb.email || !rb.time || !rb.date || !rb.pins) {
            return false
        } else return true
}

exports.getEvent = (request, response) => {
    Listing.findById(request.params.event_id, (error, event) => {
        if (error)
            return response.status(500).json({error: error.message}) 
        return response.status(200).json(event)
    })
}

exports.deleteEvent = (request, response) => {
    Listing.findByIdAndRemove(request.params.event_id, (error, event) => {
        if (error)
            return response.status(500).json({error: error.message}) 
        return response.status(200).json({ message: 'Event removed from the listings!' })
    })
}

exports.updateEvent = (request, response) => {
    if (checkForAllFields(request)) {
        Listing.findByIdAndUpdate(request.params.event_id, request.body, (error, event) => {
            if (error)
                return response.status(500).json({error: error.message}) 
            return response.status(200).json({ message: 'Event updated!' })
        })
    } else response.send('Not all fields are formatted correctly, please adjust and resubmit')
}


