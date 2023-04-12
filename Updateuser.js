import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, link } from 'react-router-dom';
import Navbar from './Navbar';
// import Navbar from './Navbar';

const Updateuser = () => {

  function allLetter(inputtxt)
       
{
  console.log(inputtxt);
 var letters = /^[A-Za-z]+$/;
 if(inputtxt.value.match(letters))
   {
    return true;
   }
 else
   {
   alert("Only characters are allowed in " + inputtxt.name);
   return false;
   }
}
  const [code, setCode] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [photo, setPhoto] = useState("");
  const [country, setCountry] = useState("");
  const [dispstatus, setDispstatus] = useState("");
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
    updatesetdata();
  }, [])


  const updatesetdata = async () => {
    try {
      console.log("update set data")
      const code = localStorage.getItem("tempcode");
      console.log("LOCAL STORE GET Code", code);
      const res = await axios.get("http://localhost:2222/getuser",
        { params: { code } })
      //console.log("update click", code);
      setCode(code);
      console.log(res.data)
      console.log("response", res)

      // console.log("fisrtname", res.data[0].firstname);
      setFirstname(res.data[0].firstname)
      setLastname(res.data[0].lastname)
      setEmail(res.data[0].email);
      setGender(res.data[0].gender);
      setPhoto(res.data[0].photo);
      setDispstatus(res.data[0].dispstatus);

      console.log(res.data[0].hobbies.split(","));
      // setHobbies(res.data[0].hobbies.split(",").map((item)=>Number(item)));

      setHobbies(res.data[0].hobbies.split(","));
      setCountry(res.data[0].country);

    }
    catch (err) {
      console.log(err);
    }
  }

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };
  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    try {
      const res = await axios.post(
        "http://localhost:2222/userimage", formData
      );
      return res;
    } catch (err) {
      throw "error accures in image upload";
    }
  };

  const findImageName = (tData) =>{
    console.log(tData);
    let ansss = tData.split('/');
    ansss = ansss[ansss.length-1];
    return ansss;
}

  const handlesubmit = async (e) => {
    e.preventDefault();

    if (allLetter(document.updateuser.firstname)&&allLetter(document.updateuser.lastname))
    
    {
      let ans;
      if(fileName){
        ans = await uploadFile();
        ans  = ans.data.message;
      }else{
        ans = photo;
      }
      
      console.log(ans)
      const res = await axios.post("http://localhost:2222/updatesetdata", {
        code: code,
        firstname: firstname,
        lastname: lastname,
        email: email,
        gender: gender,
        photo:ans,
        hobbies: hobbies,
        country: country,
        dispstatus: dispstatus
      })
        .then((res) => {
          console.log("return data upadated")
          console.log(res.data);
          setFirstname(res.data.firstname)
          navigate("/");

        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  return (
    <>
      <Navbar />
      <form className="col-4" onSubmit={handlesubmit} name="updateuser" >
        <div className="form-group">
          <div style={{display:"flex" }}>
          <p> <img src={`http://localhost:2222/getimage/${findImageName(photo)}`} style={{ height: "200px", width: "200px", borderRadius: "1000px" }} /></p>
        <div className="input-container" style={{marginTop:"150px"}}>
          <label >Change Profile Photo</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={saveFile}
          />
        </div>
          </div>
      
          <label>Code:</label>
          <b className="form-control">{code}</b>
        </div>

        <div className="form-group">
          <label>Firstname</label>
          <input type="text" value={firstname} onChange={(e) => { setFirstname(e.target.value) }} 
          name="firstname"
          className="form-control" placeholder="Firstname" />
        </div>
        <div className="form-group">
          <label>Lastname</label>
          <input type="text" value={lastname}
          name="lastname" onChange={(e) => { setLastname(e.target.value) }} className="form-control" placeholder="Lastname" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => { setEmail(e.target.value) }} className="form-control" placeholder="Email" />
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
              checked={gender == 'Male' ? "true" : ""}
            />
            <label htmlFor='male'>Male</label>
            <input
              type="radio"
              style={{ marginLeft: "10px" }}
              name="gender"
              id = "female"
              value="Female"
              onChange={(e) => {
                setGender(e.target.value);
              }}
              checked={gender == 'Female' ? "true" : ""}
            />
            <label htmlFor='female'>Female</label>
          </div>
        </div>

        <div className="form-group">
          <label>Status</label>
          <input type="text" value={dispstatus} onChange={(e) => { setDispstatus(e.target.value) }} className="form-control" placeholder="Status" />
        </div>

        <div className="form-group">
          <label>Hobbies</label>
          <div className="row">
            {hobbiesValue.map((item, index) => {
              return (
                <div key={index} className="col-5">
                  {/* <input
                    type="checkbox"
                    name="checkbox"
                    id={item.name}
                    value={item.id}
                    onChange={(e) => {
                      if (hobbies.includes(item.id)) {
                        let tempArr = hobbies.filter((item1) => {
                          return item.id != item1;
                        });
                        setHobbies(tempArr);
                      } else {
                        setHobbies([...hobbies, item.id]);
                      }
                    }}
                    checked={hobbies.includes(item.id) ? "true" : ""}
                  /> */}


                  <input
                    type="checkbox"
                    name="checkbox"
                    value={item.name}
                    id={item.name}
                    onChange={(e) => {
                      console.log(item.name);
                      if (hobbies.includes(item.name)) {
                        let tempArr = hobbies.filter((item1) => {
                          return item.name != item1;
                        });
                        setHobbies(tempArr);
                      } else {
                        setHobbies([...hobbies, item.name]);
                      }
                      console.log(hobbies)
                    }}
                    checked={hobbies.includes(item.name) ? "true" : ""}
                  />

                  <label htmlFor={item.name}>{item.name}</label>
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
            className="form-control"
            value={country}
          >
            <option value="India"> India </option>
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
  )
}

export default Updateuser









// <div className="form-group">
// <label>Upload Profile Photo</label>
// <div className="form-group">
//   <input
//     type="file"
//     name="image"
//     accept="image/*"
//     onChange={saveFile}
//     required
//   />
// </div>
// </div>



// const saveFile = (e) => {
//   setFile(e.target.files[0]);
//   setFileName(e.target.files[0].name);
// };

// const saveFile = (e) => {
//   setFile(e.target.files[0]);
//   setFileName(e.target.files[0].name);
// };

// const ans = await uploadFile();


// const uploadFile = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("fileName", fileName);
//     const res = await axios.post("http://localhost:2222/userimage",formData);
//     return res;
//   } catch (err) {
//     throw "error accures in image upload";
//   }
// };
