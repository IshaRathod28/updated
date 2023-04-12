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
