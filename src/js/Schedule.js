function Schedule1(event,eventStartTime, eventEndTime ) {
    const { google } = require('googleapis')
    const {OAuth2} = google.auth
    const oath2Client = new OAuth2(
        '28311222963-rcdis1o9mqlcesueiut7i3nau0phhaar.apps.googleusercontent.com', 
        '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'
    )

    oath2Client.setCredentials({refresh_token: '1//04ITGZ_Yesf5yCgYIARAAGAQSNwF-L9IrWYdM31vOe1uXjc5QX2DJ4Ej0-Cfof7LU_6pH3yfsEk1pb825tZPITzeWBDVO8f_dVeI'})
    const calendar = google.calendar({version: 'v3', auth: oath2Client})

    calendar.freebusy.query({
        resource:{
            timeMin: eventStartTime,
            timeMax: eventEndTime,
            timeZone: 'America/Denver',
            items: [{id:'primary'} ]
        }
    }, (err,res)=>{
        if (err) return console.log("Free query busy error")
    
        const eventsArray = res.data.calendars.primary.busy;
        if(eventsArray.length === 0){
            return calendar.events.insert({
                calendarId:'primary',
                resource: event
            }, err =>{
                if (err) return console.error("Calendar Event Creation Error", err)
                return console.log("Calendar Event Created")
            })
        }
    
        return console.log("Sorry I am busy")
    
    });
}

export default Schedule1;



