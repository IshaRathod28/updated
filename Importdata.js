import React from 'react'
import papa from "papaparse";
import { useState } from 'react';


function Importdata(){
    
  const [parsedData, setParsedData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [values, setValues] = useState([]);
  const Handleimportdata = (e) => {
    console.log("hello")
    console.log(e.target.files[0]);
    papa.parse(e.target.files[0], {
      header: true,
      skipEmptyLines: true,
      complete: function (result) {
        console.log(result.data);
        const rowsArray = [];
        const valuesArray = [];

        result.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });


        setParsedData(result.data);
        setTableRows(rowsArray[0]);
        setValues(valuesArray);
      },
    });

  };
    return(
        <><label htmlFor='imp'>import </label>
        <input type="file" id="imp" name="file" accept=".csv" onChange={Handleimportdata} />
  
  </>
    )
}
export default Importdata
