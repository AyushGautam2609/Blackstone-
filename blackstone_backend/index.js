import express from "express";
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import bodyParser from "body-parser";
import pg from 'pg';
import fs from 'fs';
import bcrypt from 'bcrypt';
import passport from 'passport';
import session from 'express-session';
import {Strategy} from 'passport-local';
import env from 'dotenv';
import GoogleStrategy from "passport-google-oauth20"

const app = express();
const port = process.env.BACKEND_SERVER_PORT || 3000;
const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
env.config();

app.use(express.json()); 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use('./static',express.static('public'));
app.use('/images', express.static(path.join(process.cwd(), 'public', 'images')));




app.use(session({
  secret: process.env.SECRET_SESSION, 
  resave: false,
  saveUninitialized: true,
  
}));

app.use(passport.initialize());
app.use(passport.session());


const db = new pg.Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT ? parseInt(process.env.POSTGRES_PORT) : 5432
});

db.connect();




// const Stock = [ 10, 20, 15, 5, 8, 12, 25, 30, 18, 22, 14, 9, 7, 11, 13, 17, 19, 21 ]
// const Names = ['Blackstone Knot','Sixteen Stone by Tiffany','Return to Tiffany','Paloma Picasso','Tiffany Solitaire','Tiffany HardWear','Union Square','Atlas','Tiffany T','Tiffany Victoria','Tiffany Paper Flowers','Tiffany Keys','Tiffany Embrace','Tiffany City HardWear','Tiffany True','Tiffany 1837','Tiffany T1','Tiffany T Square','Tiffany T Wire','Tiffany T Square Wire']
// const Price = [1000, 1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500, 9000, 9500, 10000]
// const Description = ['Sterling Silver and Steel with a Diamond Bezel','Yellow Gold with Diamonds and White Mother-of-pearl','Mini Double Heart Tag ','Olive Leaf Vine Pendant','Solitaire Pendant','Sterling Silver with Diamonds','Sterling Silver with Diamonds','Sterling Silver with Diamonds','18k Gold with Diamonds','Platinum with Diamonds','Platinum with Diamonds','18k Gold with Diamonds','18k Gold with Diamonds','18k Gold with Diamonds','18k Gold with Diamonds','18k Gold with Diamonds','18k Gold with Diamonds','18k Gold with Diamonds']
// async function seedDatabase() {
  

//   // Your exact folders on the E: drive
//   const categories = [
//     { name: 'Necklace', path: 'E:/Jewellery/Necklace',id: 0 },
//     { name: 'Bracelets', path: 'E:/Jewellery/Bracelets',id: 1 },
//     { name: 'Earing', path: 'E:/Jewellery/Earing',id: 2 },
//     { name: 'Rings', path: 'E:/Jewellery/Rings',id: 3 },
//     { name: 'Watches', path: 'E:/Jewellery/Watches',id: 4 }
//   ];

//   for (const cat of categories) {
//     const files = fs.readdirSync(cat.path);
    
//     for (const file of files) {
//       // Store the relative path for your website
//       const imagePath = `/images/${cat.name}/${file}`;
      

//       const query = `
//         INSERT INTO products (image_url, category_name, category_id ,catogory_name_des , price , stock ,description , is_active)
//         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
//       `;
//       const values = [imagePath, cat.name, cat.id, Names[Math.floor(Math.random()*Names.length)] , Price[Math.floor(Math.random()*Price.length)], Stock[Math.floor(Math.random()*Stock.length)], Description[Math.floor(Math.random()*Description.length)], true ];

//       await db.query(query, values);
//       console.log(`Inserted: ${file} into ${cat.name}`);
//     }
//   }

//   await db.end();
// }

// seedDatabase().catch((err) => {console.error('Error seeding database:', err); });

app.get("/products/category/:id", async (req, res) => {
    
    const query = `SELECT * FROM  products where category_id = ${req.params.id}`;

    try {
            const result = await db.query(query);
            console.log(`Query Fetched For Item ID - ${req.params.id}`)
            res.json(result.rows);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

)

app.get("/products/category/item/:serial_id", async (req, res) => {
  
    const query = `SELECT * FROM  products where serial_id = ${req.params.serial_id}`;

    try {
            const result = await db.query(query);
            res.json(result.rows[0]);
            console.log(`Query Fetched For Item Serial ID - ${req.params.serial_id}`)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }
}

)

app.get("/products/option/jewels", async (req, res) => {

     const query = `SELECT * FROM products ORDER BY RANDOM() LIMIT 10`;

    try {
            const result = await db.query(query);
            res.json(result.rows);
            console.log(`Query Fetched For Options`)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal Server Error' });
        }

}
)

//INSERTION IN CART
app.post("/cart/add", async (req, res) => {
  // 1. Enforce active user verification
  if (!req.isAuthenticated() || !req.user) {
    return res.status(401).json({ message: "Unauthorized. Please log in." });
  }

  const { productId, quantity } = req.body;
  const userEmail = req.user.email; // Pulled safely from secure session cookies

  if (!productId) {
    return res.status(400).json({ message: "Product ID is required." });
  }

  try {
    // 2. Check if this item is already sitting in their cart
    const checkCart = await db.query(
      "SELECT * FROM cart_items WHERE user_email = $1 AND product_id = $2",
      [userEmail, productId]
    );

    if (checkCart.rows.length > 0) {
      // Item exists -> Increment the quantity counter
      const newQuantity = checkCart.rows[0].quantity + (quantity || 1);
      await db.query(
        "UPDATE cart_items SET quantity = $1 WHERE user_email = $2 AND product_id = $3",
        [newQuantity, userEmail, productId]
      );
      return res.status(200).json({ message: "Cart quantity updated successfully!" });
    } else {
      // Brand new item -> Insert clean table row mapping parameters from step 1
      await db.query(
        "INSERT INTO cart_items (user_email, product_id, quantity) VALUES ($1, $2, $3)",
        [userEmail, productId, quantity || 1]
      );
      return res.status(201).json({ message: "Item added to your cart selection!" });
    }
  } catch (err) {
    console.error("PostgreSQL Cart Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//Initial authentication
app.get("/auth/status", (req, res) => {
  
  if (req.isAuthenticated() && req.user) {
    res.status(200).json({
      isAuthenticated: true,
      user: {
        name: req.user.name,
        email: req.user.email,
        number: req.user.number,
      }
    });
  } else {
    
    res.status(200).json({ isAuthenticated: false, user: null });
  }
});

//Sign in with google
app.get("/auth/google" , passport.authenticate("google" , {
  scope : ["profile" , "email"],
}))

app.get("/auth/google/secrets" , passport.authenticate("google" , {

  successRedirect : "http://localhost:5173/",
  failureRedirect : "http://localhost:5173/Account"
}))


//LOGIN
app.post('/login',
    passport.authenticate("local", {
    successRedirect: "http://localhost:5173/",
    failureRedirect: "http://localhost:5173/Account",
  })
)

//Registration Endpoint
app.post('/register', async (req, res) => {
    const { name , email , password , confirmpassword , number} = req.body;

    try {
        
        const checkUserQuery = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (checkUserQuery.rows.length > 0) {
            console.log("User already registered");
            return res.status(400).json({ message: "The user is already registered. Try Logging in" });
        }

        
        const hash = await bcrypt.hash(password, saltRounds);

        
        const now = new Date();
        const insertUserQuery = await db.query(
            `INSERT INTO users (email, password_hash, name, number, created_at) 
             VALUES ($1, $2, $3, $4, $5) RETURNING *`, 
            [email, hash, name, number, now]
        );
        
        const user = insertUserQuery.rows[0];
        
       
        req.login(user, (err) => {
            if (err) {
                console.error(`Login mapping error: ${err}`);
                return res.status(500).json({ message: "Internal Server Error during login step" });
            }
            console.log("User successfully registered");
            return res.status(201).json({ message: "User Successfully Registered" });
        });

    } catch (err) {
        console.error("Critical server registration failure:", err);
        if (!res.headersSent) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
});

//Passport
passport.use(
  new Strategy(async function verify(username, password, cb) {
    try {
      const result = await db.query("SELECT * FROM users WHERE email = $1 ", [
        username,
      ]);
      if (result.rows.length > 0) {
        const user = result.rows[0];
        const storedHashedPassword = user.password_hash;
        bcrypt.compare(password, storedHashedPassword, (err, valid) => {
          if (err) {
            //Error with password check
            console.error("Error comparing passwords:", err);
            return cb(err);
          } else {
            if (valid) {
              //Passed password check
              return cb(null, user);
            } else {
              //Did not pass password check
              return cb(null, false);
            }
          }
        });
      } else {
        return cb("User not found");
      }
    } catch (err) {
      console.log(err);
    }
  })
);

passport.use(
  "google",
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENTSECRET,
    callbackURL: process.env.GOOGLE_CALLBACK,
    userProfileURL: process.env.GOOGLE_USERPROFILE
  }, 
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const email = profile.emails[0].value;
      const name = profile.displayName;
      
      
      let result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
      
      if (result.rows.length === 0) {
        
        const now = new Date();
        const insertQuery = await db.query(
          `INSERT INTO users (email, name, created_at) VALUES ($1, $2, $3) RETURNING *`,
          [email, name, now]
        );
        return cb(null, insertQuery.rows[0]);
      } else {
        
        return cb(null, result.rows[0]);
      }
    } catch (err) {
      console.error("Error managing database resolution tracking inside Google strategy:", err);
      return cb(err);
    }
  })
);


passport.serializeUser((user, cb) => {
  cb(null, user.email);
});
passport.deserializeUser(async (email, cb) => {
  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    cb(null, result.rows[0] || false);
  } catch (err) {
    cb(err);
  }
});

app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
}); 