require('./db/mongodb');
const Person = require('./models/personModel');
const Status = require('./schemas/statusSchema');
const City = require('./models/cityModel');

const express = require('express');
const cors = require('cors');
const logger=require('./middleware/logger')
const peopleRouter = require('./routers/peopleRouter')
const cityRouter = require('./routers/cityRouter')
const hospitalRouter= require('./routers/hospitalRouter')
const app = express();
//middleware
app.use(cors())
app.use(logger)
app.use(express.json())


app.use('/people', peopleRouter)
app.use('/city', cityRouter)
app.use('/hospital',hospitalRouter)
const port = process.env.PORT
app.listen(port, () => {
    console.log('Server connected, port:',port)
})





// new Hospital({
//     name: 'שיבא',
//     general_occupation: 101.14,
//     covid19_occupation: 10,
//     quarantine_stuff: [{
//         position: 'רופאים/ות',
//         count:10,
//     },{
//         position: 'אחים/ות',
//         count:30,
//     },{
//         position: 'פארמדיקים',
//         count:12,
//     },{
//         position: 'פסיכולוגיה',
//         count:1,
//     }]
// }).save()

// new City({
//     name: 'רמת גן',
//     color_by_gov: 'צהוב',
//     colors_calculated: ['צהוב', 'אדום', 'ירוק', 'ירוק', 'כתום']
// }).save();
// new Person({
//     gender: 'נקבה',
//     age: 55,
//     statuses: [{
//         name: 'חולה',
//         detail: 'קל',
//         isRespiratory: false,
//     }]
// }).save();