import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
const User_form = () => {
 

  

  function checkemail(inputtxt){
    // console.log(inputtxt);
    var email1=/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    if(inputtxt.value.match(email1)){
      return true;
    }
    else{
      alert("please enter email")
    }
  }
 
  function allcode(inputtxt)
       
  {
    // console.log(inputtxt);
   var letters =/^USER00[0-9]+$/ ;
   if(inputtxt.value.match(letters))
     {
      return true;
     }
   else
     {
     alert("please enter valid code")
     return false;
     }
  }
  


function allLetter(inputtxt2)
       
{
  // console.log(inputtxt2);
 var letters = /^[A-Za-z]+$/;
 if(inputtxt2.value.match(letters))
   {
    return true;
   }
 else
   {
   alert("Only characters are allowed in " + inputtxt2.name);
   return false;
   }
}

  const [userdata, setUserdata] = useState("");

  const [code, setCode] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");

  const navigate = useNavigate();

  const hobbiesValue = [
    { id: 1, name: "Reading" },
    { id: 2, name: "Travelling" },
    { id: 3, name: "Music" },
    { id: 4, name: "Cricket" },
    { id: 5, name: "Dancing" },
    { id: 6, name: "Singing" },
  ];

  useEffect(() => {
    console.log("effect");
  }, [userdata]);

  const handlesubmit = async (e) => {
    e.preventDefault();
   const  code1 = document.userform.code;
   
    if(allcode(document.userform.code)&&allLetter(document.userform.firstname)&&allLetter(document.userform.lastname)&&checkemail(document.userform.email)){
      if(!gender){
        return(
          alert("Please select gender")
        )
        
      }
      else if(!country)
        {
          return(alert("please enter country"))
        }
       
      else{
        console.log("isha")
        const ans = await uploadFile();
        console.log(ans.data.message);
        try {
          const res = await axios.post("http://localhost:2222/adduser", {
            code: code,
            firstname: firstname,
            lastname: lastname,
            email: email,
            gender: gender,
            hobbies: hobbies,
            photo: ans.data.message,
            country: country,
          });
          console.log(res);
          console.log(res.data);
          setUserdata(res.data);
          navigate("/")
        } catch (err) {
          console.log(err);
        }
      }
    }
  
    else
  {

  }
  };
  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadFile = async () => { 
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("fileName", fileName);
      const res = await axios.post("http://localhost:2222/userimage",formData);
      return res;
    } catch (err) {
      throw "error accures in image upload";
    }
  };

  return (
    <>
    <Navbar/>
      <form className="col-4" onSubmit={handlesubmit} name='userform'>
      <div className="form-group">
            <label>Upload Profile Photo</label>
            <div className="form-group">
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={saveFile}
                required
              />
            </div>
          </div>
        <div className="form-group">
          <label>Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
            }}
            className="form-control"
            placeholder="Code"
            name="code"
            
          />
        </div>
        <div className="form-group">
          <label>Firstname</label>
          <input
            type="text"
            value={firstname}
            onChange={(e) => {
              setFirstname(e.target.value);
            }}
            name="firstname"
            className="form-control"
            placeholder="Firstname"
           
          />
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input
            type="text"
            value={lastname}
            name="lastname"
            onChange={(e) => {
              setLastname(e.target.value);
            }}
            className="form-control"
            placeholder="Lastname"
        
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="form-control"
            placeholder="Email"
            
          />
        </div>

        <div>
          <label className="form-label">Gender :</label>
          <div className="form-control">
            <input
              type="radio"
              style={{ marginLeft: "10px" }}
              name="gender"
              value="Male"
              id = "male"
              onChange={(e) => {
                setGender(e.target.value);
               
              }}
            
            />
            <label htmlFor="male">Male</label>
            <input
              type="radio"
              style={{ marginLeft: "10px" }}
              name="gender"
              id = "female"
              value="Female"
              onChange={(e) => {
                setGender(e.target.value);
                
              }}
             
            />
            <label htmlFor="female">Female</label>
          
          </div>
        </div>

        <div className="form-group">
          <label>Hobbies</label>
          <div className="row">
            {hobbiesValue.map((item, index) => {
              return (
                <div key={index} className="col-5">
               

                  <input
                    type="checkbox"
                    name="checkbox"
                    // id={item.name}
                    // value={item.id}
                    value={item.name}
                    id={item.name}
                    onChange={(e) => {
                      if (hobbies.includes(item.name)) {
                        let tempArr = hobbies.filter((item1) => {
                          return item.name != item1;
                        });
                        setHobbies(tempArr);
                      } else {
                        setHobbies([...hobbies, item.name]);
                      }
                    }}
                    checked={hobbies.includes(item.name) ? "true" : ""}
                   
                  />
                  <label htmlFor={item.name} >{item.name}</label>
                </div>
              );
            })}
          </div>
        </div>

     

        <div className="form-group">
          <label>Country</label>
          <select
            name="country"
            onChange={(e) => {
              setCountry(e.target.value);
            }}
            value={country}
            className="form-control"
          
          
          >
            <option value="India" selected="true" > India </option>
            <option value="USA"> USA </option>
            <option value="UK"> UK </option>
            <option value="Russia"> Russia </option>
            <option value="Canada"> Canada </option>
          </select>
        </div>
        <input type="submit" value="submit" className="btn btn-primary" />
        <button
          type="submit"
          className="btn btn-dark"
          style={{ marginLeft: "10px" }}
          onClick={() => {
              navigate("/");
          }}
        >
          Cancel
        </button>
      
      </form>
    </>
  );
};

export default User_form;


















CSE 154: Web Programming
Node.js/Express “Cheat Sheet”
This reference summarizes the most useful methods/properties used in CSE 154 for Node.js/Express. It is not an
exhaustive reference for everything in Node.js/Express (for example, there exist many more fs
methods/properties than are shown below), but provide most functions/properties you will be using in this class.
Note that this Cheat Sheet is more comprehensive than the one provided in CSE154 exams.
Basic Node.js Project Structure
example-node-project/
.gitignore
APIDOC.md
app.js
node_modules/
...
package.json
public/
img/
...
index.html
index.js
styles.css
Example Express app Template
"use strict";
/* File comment */
const express = require("express");
// other modules you use
// program constants
const app = express();
// if serving front-end files in public/
app.use(express.static(“public”));
// if handling different POST formats
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(multer().none());
// app.get/app.post endpoints
// helper functions
const PORT = process.env.PORT || 8000;
app.listen(PORT);
npm Commands
Command Description
npm init Initializes a node project. Creates packages.json to track required
modules/packages, as well as the node_modules folder to track
imported packages.
npm install Installs any requirements for the local node package based on the
contents of package.json.
npm install <package-name> Installs a package from NPM’s own repository as well as any
requirements specified in that package’s package.json file.
CSE 154 Node.js Cheat Sheet Summer 2019 - Version 08/21/19
Glossary
Term Definition
API Application Programming Interface.
Web Service A type of API that supports HTTP Requests, returning data such as
JSON or plain text.
Express A module for simplifying the http-server core module in Node to
implement APIs
npm The Node Package Manager. Used to initialize package.json files
and install Node project dependencies.
Module A standalone package which can be used to extend the
functionality of a Node project.
Package Any project with a package.json file.
API Documentation A file detailing the endpoints, usage, and functionality of various
endpoints of an API.
Server A publicly accessible machine which exchanges information with
one or more clients at a time.
Client A private or public machine which requests information from a
server.
Useful Core Modules
Module Description
fs The “file system” module with various functions to process data in the file system.
path Provides functions to process path strings.
util Provides various “utility” functions, such as util.promisify.
CSE 154 Node.js Cheat Sheet Summer 2019 - Version 08/21/19
Other Useful Modules
The following modules must be installed for each new project using npm install <module-name>.
Module Description
express A module for simplifying the http-server core module in Node to implement APIs.
glob Allows for quick traversal and filtering of files in a complex directory.
multer Used to support FormData POST requests on the server-side so we can access the req.body parameters.
mysql Provides functionality for interacting with a database and tables.
promise-mysql Promisified wrapper over mysql module - each function in the mysql module returns a promise instead of
taking a callback as the last argument (recommended).
cookie-parser A module to access cookies with req/res objects in Express.
Express Route Functions
Function Description
app.get(“path”, middlewareFn(s));
app.get(“/”, (req, res) => {
...
});
app.get(“/:city”, (req, res) => {
let city = req.params.city;
...
});
app.get(“/cityData”, (req, res) => {
let city = req.query.city;
...
});
// Example with multiple middleware functions
app.get(“/”, validateInput, (req, res) => {
...
}, handleErr);
Defines a server endpoint which accepts a valid GET request.
Request and response objects are passed as req and res
respectively. Path parameters can be specified in path with
“:varname” and accessed via req.params. Query parameters
can be accessed via req.query.
app.post(“path”, middlewareFn(s));
app.post(“/addItem”, (req, res) => {
let itemName = req.body.name;
...
}
Defines a server endpoint which accepts a valid POST request.
Request and response objects are passed as req and res
respectively. POST body is accessible via req.body. Requires
POST middleware and multer module for FormData POST
requests.
CSE 154 Node.js Cheat Sheet Summer 2019 - Version 08/21/19

