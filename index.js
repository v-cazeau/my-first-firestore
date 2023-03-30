//FOR FIRESTORE RECIPES

// Import the tools we need from firebase-admin
import { initializeApp, cert } from "firebase-admin/app"; // we use to connect to our Firebase project
import { getFirestore } from "firebase-admin/firestore"; // we use to connect to Firestore

// Import our credentials from a secret file

import { credentials } from "./credentials.js"; 

// Connect to our Firebase project 
initializeApp({
    credential: cert(credentials)
});

// Connect to Firestore DB 

const db = getFirestore(); 

// Add a product to our products collection ; if we don't already have a products collection it will add one for you 

const candy2 = {
    name:"Twix", 
    unitPrice: 2.99,
    size: "12 oz", 
    color: "gold",
    inventory: 288,
    productNumber: 2
};

// The C in CRUD
// How to add a document to Firestore: 

// db.collection('products').add(candy2) //While we are waiting for the promise...
//  .then((doc) => {
//     console.log("added doc: " + doc.id)
//     // I can be sure inside .then() that the first process was completed successfully
    
//      return db.collection('products').get() //also returns a promise 
//      .then()
//      //.catch is not needed here because the other one will catch all of them 
// })
//  .catch(err => console.log(err)) 

//db.collection('products').doc('OK7dWcoPwuHu1uoGaZ0i').delete()

// How to update a document in Firestore:
db.collection('products').doc('OK7dWcoPwuHu1uoGaZ0i').update({
    inventory: 555, 
    customerFavorite: true

})

// How to read a document from Firestore: 

db.collection('products').doc('OK7dWcoPwuHu1uoGaZ0i').get() //OR you could break it down to lines 49-50 or 51 by dot 
    .then(doc => {
        console.log(doc.data());
    })
    .catch(err => console.log(err));
    // .catch(console.log) says almost the same thing as line 51 the only diffence is specificity; line 51 says error, line 52 sends whatever

// How to get a whole collection: 

db.collection('products').get()
    .then(collection => {
        const productList = collection.docs.map(doc => ({ ...doc.data(), id: doc.id }));
        console.table(productList);  /////console.log prints out as a list and .table prints as a table
    })
    .catch(console.log);