import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ changeSubmitData, changeSorteddata }) => {
    const hobbiesValue = [
        { id: 1, name: "Reading" },
        { id: 2, name: "Travelling" },
        { id: 3, name: "Music" },
        { id: 4, name: "Cricket" },
        { id: 5, name: "Dancing" },
        { id: 6, name: "Singing" },
    ];

    const [filterclick, setFilterclick] = useState(false);
    const [searchdata, setSearchdata] = useState([]);
    const [hobbies, setHobbies] = useState([]);
    const [gender, setGender] = useState("");
    const [dispstatus, setDispStatus] = useState("");
    const [sort, setSort] = useState("");

    const filter = () => {
        if (!filterclick) {
            setFilterclick(true);
            console.log("true");
        } else {
            setFilterclick(false);
            console.log("false");
        }
    };

    const filterFunction = async (e) => {
        e.preventDefault();
        console.log("filter called");

        try {
            console.log(gender);
            const res = await axios.get("http://localhost:2222/filterdata", {
                params: {
                    searchdata,
                    gender,
                    hobbies,
                    dispstatus
                }
            });
            console.log(res);
            console.log(res.data);
            changeSubmitData(res.data);
            //navigate("/")
        } catch (err) {
            console.log(err);
        }
    };

    const resetFunction =  () => {
        window.location.reload()
    };


    const sortData = async (e) => {
        console.log("sort change", sort)
        e.preventDefault();
        setSort(e.target.value);
        try {
            const res = await axios.get("http://localhost:2222/sortdata", {
                params: {
                    sort
                }
            });
            console.log(res);
            console.log(res.data);
            console.log("sort sss", res.data)
            changeSorteddata(res.data);
            //navigate("/")
        } catch (err) {
            console.log(err);
        }
    }

    const navigate = useNavigate();
    return (
        <>
            {filterclick ?
             (
                <>


                    <div
                        style={{ height: "100px", backgroundColor: "black" }}
                        className="d-flex justify-content-between h-25 py-3"
                    >
                        <div
                            style={{ fontSize: "46PX", color: "WHITE",backgroundColor:"black", marginLeft: "50PX" }}
                        >
                            USER MANAGEMENT
                        </div>
                        <div>
                            <div className="d-flex align-items-center">
                                <div>

                                    <select className="me-5"
                                        name="sort"
                                        onChange={(e) => { sortData(e) }}
                                        value={sort}>
                                        <option value="dateadded"> Name </option>
                                        <option value="firstname"> Date </option>
                                    </select>
                                </div>
                                <div>
                                    <button

                                        className="btn  btn-light me-3"
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        HOME
                                    </button>
                                    <button

                                        className="btn btn-light me-5"
                                        onClick={filter}
                                    >
                                        FILTER
                                    </button>
                                </div>
                            </div>
                            <form>
                                <div>
                                    <div><input type="text" name="search" value={searchdata} onChange={(e) => { setSearchdata(e.target.value) }}  ></input></div>
                                    <div>


                                        <div>
                                            <label style={{ color: "whitesmoke" }}>GENDER:</label>
                                            <input
                                                type="radio"
                                                style={{ marginLeft: "10px" }}
                                                name="gender"
                                                value="M"
                                                id="m"
                                                onChange={(e) => {
                                                    setGender(e.target.value);

                                                }}
                                                required
                                            />
                                            <label for="m"  style={{ color: "whitesmoke" }} >Male</label>
                                            <input
                                                type="radio"
                                                style={{ marginLeft: "10px" }}
                                                name="gender"
                                                value="F"
                                                id="f"
                                                onChange={(e) => {
                                                    setGender(e.target.value);

                                                }}
                                                required
                                            />
                                            <label for="f" style={{ color: "whitesmoke" }}>Female</label>
                                        </div>
                                    </div>

                                    <div>
                                        <label style={{ color: "whitesmoke" }}>HOBBIES</label>
                                        <select
                                            name="hobbies"
                                            onChange={(e) => {
                                                setHobbies(e.target.value);
                                            }}
                                            value={hobbies} >

                                            <option value="Reading"> Reading </option>
                                            <option value="Travelling"> Travelling </option>
                                            <option value="Music"> Music </option>
                                            <option value="Cricket"> Cricket </option>
                                            <option value="Dancing"> Dancing </option>
                                            <option value="Singing"> Singing </option>
                                        </select>
                                    </div>

                                    <div>
                                        <label style={{ color: "whitesmoke" }}>STATUS</label>
                                        <select
                                            name="dispstatus"
                                            onChange={(e) => {
                                                setDispStatus(e.target.value);
                                            }}
                                            value={dispstatus}
                                        >

                                            <option value="Active"> Active </option>
                                            <option value="Inactive"> Inactive </option>
                                        </select>

                                    </div>

                                </div>


                                <button style={{ margin: "4px" }} onClick={filterFunction}> FILTER </button>
                                <button onClick={resetFunction}> RESET </button>
                                    
                               
                                {/* <input type="submit" value="RESET" style={{ margin: "4px" }} onClick={window.re}> RESET </input> */}
                            </form>
                        </div>
                    </div>
                </>
            )

                :

                (
                    <>




                        <div
                            style={{ height: "100px", backgroundColor: "black" }}
                            className="d-flex justify-content-between h-25 py-3">


                            <div
                                style={{ fontSize: "46PX", color: "WHITE", marginLeft: "50PX" }}
                            >
                                USER MANAGEMENT
                            </div>




                            <div className="d-flex align-items-center">
                                <div>

                                    <select className="me-5"
                                        name="sort"
                                        onChange={(e) => { sortData(e) }}
                                        value={sort}>
                                        <option value="dateadded"> Name </option>
                                        <option value="firstname"> Date </option>
                                    </select>
                                </div>
                                <div>
                                    <button

                                        className="btn  btn-light me-3"
                                        onClick={() => {
                                            navigate("/");
                                        }}
                                    >
                                        HOME
                                    </button>
                                    <button

                                        className="btn btn-light me-5"
                                        onClick={filter}
                                    >
                                        FILTER
                                    </button>

                                </div>
                            </div>
                        </div>
                    </>
                )}
            <div></div>
        </>
    );
};

export default Navbar;
