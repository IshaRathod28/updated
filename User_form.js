



Module : User Management
Definition:
Screen Fields:
Code – Textbox - unique
First name - Textbox
Last Name - Textbox
Email - Textbox
Gender – Radio (Male, Female)
Hobbies – Checkbox (Reading, Travelling, Music, Cricket, Dancing, Singing) – consider array of object
with numeric key and value - [{key: 1, value: “Reading”}]
Photo – Image upload control
Country – Dropdown ( Country list – India, USA, etc)
Table name – users
Table Fields:
recid – bigint(20) – Auto Increment and Primary Key
code – char(6) – this will be unique for all user ( USR001, USR002, etc )
firstname – varchar(100)
lastname – varchar(100)
email - varchar(255)
gender – char(1) – (“M” for male, “F” for female)
hobbies – varchar(255) – comma separated key of hobbies (example - 1,3,4)
photo – varchar(100) – Path of the image will be stored
country – varchar(30)
status – char(1) – (“Y” for active, “N” for Inactive)
dateadded – datetime – current datetime when entry is added.
dateupdated– datetime – current datetime when entry is updated.
endeffdt – datetime – current datetime when entry is deleted.
Functionalities:
• Listing
- Display of following fields:
Code, Name ( Firstname + Lastname), email, image, gender, hobbies, dateadded, status,
action
Status – Active / Inactive – It will be a link and by clicking on it, status can be updated. For
example, if current status is Active and if we click on it, then status will be converted to
Inactive.
Action – View, Edit and Delete – View will open separate page where all the details are
printed. Edit will take to the Edit view and delete will delete the record.in case of delete,
confirmation box is required.
Dateformat – 20/06/2022 02:44:22
• Add & Update Operations
- Add / update with following fields.
Code, First name, Last Name, Email, Gender, Hobbies, Photo, Country
Javascript/client side validation for the above all fields. All fields are mandatory and also
check for the email validation. Code can be added only in add case, add unique validation for
code, in edit case it will display as a label only.
Status will be added as Inactive by default.
• View Detail Case
- This will open page where all the below details should be printed.
- Code, First name, Last Name, Email, Gender, Hobbies, Photo, Country, Date added, Date
Updated, Status
• Filters, Sorting & Pagination
Pagination – Consider search criteria.
Sorting – name, date
- Filters: add below filters:
Search box – search the result by user’s code, firstname, lastname and email
Gender – Radio filter – Male and Female
Hobbies – Multi select dropdown
Status – single select dropdown - Active and Inactive.
Reset – this will clear the search.
• Export to CSV / Excel
- Export the following fields for those records which are currently displayed on the screen.
Code, Name ( Firstname + Lastname), email, gender, hobbies, status, dateadded,
dateupdated
• Import from CSV / Excel
- Import the following fields to system.
Code, firstname, lastname, email, gender, hobbies, country
Import functionality will work on the basis of code. If code is already exist in the system
then the record should be updated, otherwise new record will be created in the system.



















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

 
 
 
 
 
 
 
 
 V1.01NODE JSCHEATSHEETADAM ODZIEMKOWSKI 
HEEELLLOOOOO!I’m Andrei Neagoie, Founder and Lead Instructor of theZeroToMasteryAcademy.AfterworkingasaSeniorSoftwareDeveloperovertheyears,Inowdedicate100%ofmytimeto teachingothersvaluablesoftwaredevelopmentskills,helpthembreakintothetechindustry,and advance their careers.In only a few years, over 600,000 studentsaround the world have taken Zero To Masterycourses and many of them are now working at top tier companies like Apple, Google, Amazon, Tesla,IBM, Facebook, and Shopify, just to name a few.Thischeatsheet, createdbyourNodeJSinstructor(AdamOdziemkowski)providesyou with thekeyNode JSconceptsthatyouneedtoknowandremember. Ifyouwanttonotonlylearn node.jsbutalsogettheexact stepstobuild yourown projectsandget hired asa backend orfullstackdeveloper, thencheckoutourCareerPaths. HappyCoding! AndreiFounder & Lead Instructor, Zero To Mastery Andrei NeagoieP.S. I also recently wrote a book called Principles For Programmers. You can download the first five chapters for free here.
Node JS Cheat Sheet: Zero To Mastery1Node JS Cheat Sheet: Zero To MasteryTABLE OF CONTENTSRunning Node.jsNode.js Global ObjectNode.js Module SystemThe require FunctionBuilt-in ModulesCreating ModulesECMAScript ModulesNode.js PackagesNPM Commandspackage.jsonnode_modulespackage-lock.jsonNode.js Event EmitterBackend ConceptsExpress.jsGET RoutesPOST RoutesRoutersNode.js Folder StructureCross Origin Resource SharingPM2 CommandsUseful Links
Node JS Cheat Sheet: Zero To Mastery2Running Node.jsFor running Node.js:CommandCommentsnodeRun the Node REPL in your terminalnode —version  Print your current Node versionnode filename.js Execute the Node code in filename.jsREPL stands for Read Eval Print Loop. This is the list of steps that happenwhen you run the node command and then type some code.Node.js Global ObjectIn Node, we have a global object that we can always access. Features that we expect to be available everywhere live in this global object. For example, to have some code execute after 5 seconds we can use eitherglobal.setTimeout or just setTimeout. The global keyword is optional.setTimeout(() => {   console.log('hello'); }, 5000);Probably the most famous global is global.console.log which we write as just console.log .Node.js Module SystemIn Node.js each file is treated as a separate module. Modules provide us a way of re-using existing code.The require FunctionWe can re-use existing code by using the Node built-in require() function. This function imports code from another module.
2
of 14
