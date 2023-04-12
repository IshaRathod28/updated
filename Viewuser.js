import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, link } from 'react-router-dom';
import 'moment';
import Navbar from './Navbar';

// import Navbar from './Navbar';

const Viewuser = () => {

    const [code, setCode] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [hobbies, setHobbies] = useState([]);
    const [photo, setPhoto] = useState("");
    const [country, setCountry] = useState("");
    const[dateadded,setDateadded] = useState("");
    const[dateupdated,setDateupdated] = useState("");
    const[status,setStatus] = useState("");

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");
  
    const navigate = useNavigate();
    

    useEffect(() => {
        view_user();
    }, [])

    function dateFormate(date) {
        let ans = ""; ans = date.slice(0, 10)
        var hours = date.slice(11, 13); 
        var minutes = date.slice(14, 16); 
        var AmOrPm = hours >= 12 ? 'PM' : 'AM';
        hours = (hours % 12) || 12; 
        var finalTime = hours + ":" + minutes + AmOrPm; 
        return ans + " " + finalTime;
    }


    const view_user = async () => {     
        try {
            console.log("update set data")
            const code = localStorage.getItem("tempcode");
            console.log("LOCAL STORE GET Code", code);
            const res = await axios.get("http://localhost:2222/getuser", 
            { params: { code } })
            //console.log("update click", code);
            setCode(code);
            console.log(res.data)
            console.log("response",res)            
            console.log("fisrtname",res.data[0].firstname);
            setFirstname(res.data[0].firstname)
            setLastname(res.data[0].lastname)
            setEmail(res.data[0].email);
            setGender(res.data[0].gender);
            setPhoto(res.data[0].photo);           
            console.log(res.data[0].hobbies.split(","));
            setHobbies(res.data[0].hobbies.split(",").map((item)=>(item)));
            setCountry(res.data[0].country);
           
            const date = dateFormate(res.data[0].dateadded)
            const dateupdated = dateFormate(res.data[0].dateupdated)
            setDateadded(date);
            setDateupdated(dateupdated);
            setStatus(res.data[0].status);
            // const datec = moment(res.data[0].dateadded).format('YYYY-MM-DD HH:mm:ss');           
        }
        catch (err) {
            console.log(err);
        }
    }

// const cnf = () => {
//     window.confirm('Are you sure you wish to delete this item?') ? console.log("ttt") : console.log("fff");
// }
// <button className='delete-button' onClick = {cnf} >dcvd</button>              

    const findImageName = (tData) =>{
        console.log(tData);
        let ansss = tData.split('/');
        ansss = ansss[ansss.length-1];
        return ansss;
    }

    return (
        <>
            <Navbar />
            <form className="col-4">
                <div className="form-group">
                    <p> <img src={`http://localhost:2222/getimage/${findImageName(photo)}`} style={{ height: "200px", width: "200px", borderRadius: "1000px" }} /></p>
                    <p>Firstname : <b>{firstname}</b></p>
                    <p>lastname : <b>{lastname}</b></p>
                    <p>Email : <b>{email}</b></p>
                    <p>Gender : <b>{gender}</b></p>
                    <p>Hobbies : <b>{hobbies}</b></p>
                    <p>Country : <b>{country}</b></p>
                    <p>Date Added : <b>{dateadded}</b></p>
                    <p>Date Updated: <b>{dateupdated}</b></p>
                    <p>Status: <b>{status}</b></p>
                </div>
                <button
                    type="submit"
                    className="btn btn-dark"
                    style={{ marginLeft: "10px" }}
                    onClick={() => {
                        navigate("/");
                    }}>                
                    Cancel
                </button>
            </form>
        </>
    )
}

export default Viewuser
