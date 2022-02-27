import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [data, setData] = useState();
  const API = "2400124db3abe2d2cb83db9f8b660fc2";

  function getData(e) {
    if (e.key === "Enter") {
      axios(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=Imperial&appid=${API}`
      )
        .then((res) => {
          setData(res.data);
          setCity("");
        })
        .catch((err) => console.log(err));
    }
  }
  return (
    <>
      <AppStyled>
        <div className="header">
          <input
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={getData}
            placeholder="Enter City..."
            autoComplete="off"
            value={city}
          />
        </div>
        <div className="main">
          {typeof data == "undefined" ? (
            <p>Search to see the weather!</p>
          ) : data.cod == "200" ? (
            <div className="data">
              <p className="name">
                {data.name}, {data.sys.country}
              </p>
              <img
                src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
                alt=""
              />
              <p className="temp">{Math.round(data.main.temp)} F</p>
              <p>
                Min: {Math.round(data.main.temp_min)} F | Max:{" "}
                {Math.round(data.main.temp_max)} F
              </p>
              <p>
                Humidity: {data.main.humidity}% | Pressure: {data.main.pressure}{" "}
                hPa | Wind: {data.wind.speed} miles/hour
              </p>
              {/* <p>{data.weather[0].main}</p> */}
              <p className="desc">{data.weather[0].description}</p>
            </div>
          ) : (
            <p className="msg">No Data</p>
          )}
        </div>
      </AppStyled>
    </>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  .header {
    height: 20vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: grey;
    input {
      width: 50%;
      height: 20%;
      padding: 10px;
      border: none;
      border-radius: 10px;
      outline: none;
      text-align: center;
      font-size: 1.2rem;
    }
  }
  .main {
    width: 100vw;
    height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-size: 1.2rem;
    .msg {
      text-transform: capitalize;
      font-size: 1.2rem;
    }
    .data {
      border: 1px solid lightgray;
      border-radius: 10px;
      padding: 50px;
      img {
        height: 100px;
        width: auto;
      }
      p {
        margin: 10px;
      }
      .name {
        font-size: 3rem;
        font-weight: bolder;
        margin-bottom: 40px;
      }
      .temp {
        font-size: 2rem;
        margin: 20px;
        padding: 20px;
        font-weight: bold;
      }
      .desc {
        text-transform: capitalize;
      }
    }
  }
`;

export default App;
