const express = require("express");
const app = express();
const oracledb = require("oracledb");
const cors = require("cors");
const nodemailer = require("nodemailer");

app.use(cors());
app.use(express.json());



const dbConfig = {
  user: "c##se",
  password: "123",
  connectString: "localhost/orcl",
};

async function initialize() {
  try {
    await oracledb.createPool(dbConfig);
  } catch (err) {
    console.error("Error creating a connection pool: " + err.message);
  }
}

initialize();
app.post('/checkEmail', async (req, res) => {
  const {email} = req.body;
  let connection;

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute("SELECT email FROM CREDENTIALS WHERE email = :email", [email], { outFormat: oracledb.OUT_FORMAT_OBJECT });
    
    if (result.rows.length === 0) {
      // Email does not exist in the database
      res.send('no');
    } else {
      // Email already exists in the database
      res.send('yes');
    }

    
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).send('error');
  }
  finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
});

app.post('/getUsername', async (req, res) => {
  const { email } = req.body;
  let connection;
  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(
      'SELECT username FROM credentials WHERE email = :email',
      [email]
    );
console.log(result.rows);
   res.send(result.rows);

    await connection.close();
  } catch (error) {
    console.error('Error executing SQL query:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
  finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
});


app.post("/login", async (req, res) => {
  let connection; // Declare the connection variable outside the try block

  try {
    const { email, pass } = req.body;
    connection = await oracledb.getConnection();
    const result = await connection.execute("SELECT email, pass FROM CREDENTIALS WHERE email = :email AND pass = :pass", [email, pass], { outFormat: oracledb.OUT_FORMAT_OBJECT });

    if (result.rows.length > 0) {
      // Successful login
      res.send({ success: true, message: "Login successful" });
    } else {
      // Invalid credentials
      res.status(401).send({ success: false, message: "Invalid email or password" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error during login");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.post("/send-otp", async (req, res) => {
  let connection;

  try {
    const { email } = req.body;
    connection = await oracledb.getConnection();

    // Generate OTP
    const otpCode = Math.floor(Math.random() * 8999) + 1000;
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 10); // Set OTP expiry to 10 minutes

    // Store OTP in the database
    await connection.execute("INSERT INTO OTP (email, code, expiry) VALUES (:email, :code, :expiry)", [email, otpCode, expiry]);

    // Commit the transaction
    await connection.commit();

    // Now, retrieve and log the data from the OTP table
    const selectQuery = "SELECT * FROM OTP";
    const result = await connection.execute(selectQuery);

    // Log the result to the console
    console.log("Data in OTP table:", result);

    // Sending email with OTP
    const mailTransporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'doctorappointmentbookingapp@gmail.com',
        pass: 'aatl npfc fcdu ivzo',
      },
    });

    const mailDetails = {
      from: 'doctorappointmentbookingapp@gmail.com',
      to: email,
      subject: 'Your OTP for Password Reset',
      text: `Your OTP is: ${otpCode}`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        console.error(err);
        res.status(500).send("Error sending OTP email");
      } else {
        res.send({ success: true, message: "OTP sent successfully" });
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error generating OTP");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});


app.post("/verify-otp", async (req, res) => {
  let connection;

  try {
    const { email, otp } = req.body;
    connection = await oracledb.getConnection();

    // Check if the OTP is valid and not expired
    const result = await connection.execute("SELECT * FROM OTP WHERE email = :email AND code = :code AND expiry > CURRENT_TIMESTAMP", [email, otp]);

    // Now, retrieve and log the data from the OTP table
    const selectQuery = "SELECT * FROM OTP";
    const table_otp = await connection.execute(selectQuery);

    // Log the result to the console
    console.log("Data in OTP table:", table_otp);

    if (result.rows.length === 1) {
      // Valid OTP
      console.log("Data matching the criteria in OTP table:", result);
      res.send({ success: true, message: "OTP verified successfully" });
    } else {
      // Invalid OTP
      console.log("No data matching the criteria in OTP table:", result);
      res.status(401).send({ success: false, message: "Incorrect OTP or OTP expired" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error verifying OTP");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});

app.post("/update-password", async (req, res) => {
  let connection;

  try {
    const { email, newPassword } = req.body;
    connection = await oracledb.getConnection();

    // Update the password in the CREDENTIALS table
    const updateQuery = "UPDATE CREDENTIALS SET pass = :newPassword WHERE email = :email";
    const result = await connection.execute(updateQuery, [newPassword, email]);

    // Now, retrieve and log the data from the CREDENTIALS table
    const selectQuery = "SELECT * FROM CREDENTIALS";
    const table_credentials = await connection.execute(selectQuery);

    // Log the result to the console
    console.log("Data in CREDENTIALS table after updating password:", table_credentials);

    await connection.commit();

    res.send({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating password");
  } finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err);
      }
    }
  }
});
app.post("/adddetails", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    console.log(req.body);
    const connection = await oracledb.getConnection();
    const insertSQL =
      "BEGIN INSERT INTO CREDENTIALS  VALUES (:username, :email, :password); END;"
    const result = await connection.execute(
      insertSQL,
      {
        username,
        email,
        password,
      },
      { autoCommit: true }
      
    );
    console.log('done');
    res.send("Values Inserted");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error inserting values");
  }
  finally {
    if (connection) {
      try {
        await connection.close();
      } catch (err) {
        console.error(err.message);
      }
    }
  }
});

//get locations
const query1="select distinct city from doctor";

app.get("/Location", async (req, res) => {
  console.log("in location on back");
  let connection; // Declare the connection variable outside the try-catch block

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query1);
    console.log(result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  } finally {
    // Release the connection in the finally block
    if (connection) {
      try {
        await connection.close(); // or connection.release() based on your Oracle driver
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
});

const query2="select distinct speciality from doctor";

app.get("/Category", async (req, res) => {
  let connection; // Declare the connection variable outside the try-catch block

  try {
    connection = await oracledb.getConnection();
    const result = await connection.execute(query2);
    console.log(result.rows);
    res.send(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching data");
  } finally {
    // Release the connection in the finally block
    if (connection) {
      try {
        await connection.close(); // or connection.release() based on your Oracle driver
      } catch (err) {
        console.error("Error closing database connection:", err);
      }
    }
  }
});


//getdoctors
app.get("/doctors", async (req, res) => {
  console.log('here');
const location = req.query.location;
let category = req.query.category;
console.log('location:', location);
console.log('category:', category);

let connection;
try {

  const querySQL = "select doc_name, speciality,fee,reviews,rating,image from doctor where city= :location and speciality=:category";
  const querySQL2 = "select doc_name, speciality,fee,reviews,rating,image from doctor where city= :location ";
  // if (speciality==null){
  //   querySQL=querySQL2;
  // }
  let flag=0;
  if (category === undefined) {
    flag = 1; // Set flag to 1 if category is undefined
    category = ''; // Assign an empty string to category
  }
  connection = await oracledb.getConnection();
  if (flag==0){
  console.log(flag);
  const result = await connection.execute(
    querySQL,
    {
      location,
      category,
    },
  );
  console.log("result:", result.rows);
  res.send(result.rows);
  }
  else{
    console.log(flag);
    const result2 = await connection.execute(
      querySQL2,
      {
        location,
      },
    );
    console.log("result:", result2.rows);
    res.send(result2.rows);
  }

} catch (err) {
  console.error(err.message);
  res.status(500).send("Error fetching employees");
} finally {
  if (connection) {
    try {
      await connection.close();
    } catch (err) {
      console.error(err.message);
    }
  }
}
});




app.listen(3001, () => {
  console.log("Your server is running on port 3001");
});