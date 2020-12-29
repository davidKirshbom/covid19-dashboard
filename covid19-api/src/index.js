require('./db/mongodb');
const Person = require('./models/personModel');
const Status = require('./schemas/statusSchema');
const City = require('./models/cityModel');
const Hospital = require('./models/hospitalModel')






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