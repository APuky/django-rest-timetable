import React, { useEffect } from "react"
import axios from "axios"


function Fetch() {
    useEffect(() => {
        axios
          .get("http://localhost:8000/api/Machine")
          .then((res) => {
            console.log('Res from api/machine', res.data);
          })
          .catch((err) => {
            console.log("Something went wrong!");
          })
      }, [])

      useEffect(() => {
        axios
          .get("http://localhost:8000/api/Order")
          .then((res) => {
            console.log('Res from api/order', res.data);
          })
          .catch((err) => {
            console.log("Something went wrong!");
          })
      }, [])
    
      return (
        <div className="App">
          <h1>Hello from Fetch</h1>
        </div>
      );
    }

export default Fetch
