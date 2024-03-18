
// import { MongoClient, Db,MongoClientOptions } from 'mongodb';  
// // 

// export let db: Db;
// export let mongoClient: MongoClient;

// export class Mongo {
//     public async mongoSetup() {
//         try {
//             const client: MongoClient = await MongoClient.connect(process.env.DB_URL as string, { useUnifiedTopology: true, useNewUrlParser: true });
//             mongoClient = client;
            
//             db = client.db(); // set the database
           
//             // const cursor: any = await db.collection('Contact').find({}).project({firstName: 1,lastName: 1,_id: 1});
//             // const recList: any = []; // initialize a variable to hold the record list
      
//             // await cursor.forEach((data) => {
//             //   recList.push({
//             //     _id: data._id,
//             //     fullName: data.firstName + " " + data.lastName
//             //   });
//             // });


//             // console.log("sdsdsd",JSON.stringify(recList))
      
//            // await db.collection('Modules').insertMany(data);

//           //await db.collection('UserSocketConnection').deleteMany({});
//         // await db.collection('UserAttendance').deleteMany({"_id" : new ObjectID("65b68922e119bb3520f33e48")});
//         //   await db.collection('User').deleteMany({"email" : "vimalmah@yahoo.co.in"});

//             // const record = (await db.collection('Account').updateMany({},{ $set: { gallery : [] } },{
//             //     upsert: false,
//             //     returnOriginal: false
//             // } )).value;

//             //status: 'Published'

//             // db.createCollection( "User", { validator : { }})
//             // db.command({ collMod: 'Account',validator: {}})

//         } catch (err) {
          
//             console.log('err --> ', err);
//             throw err;
//         }
//     }
// }

