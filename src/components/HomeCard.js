import Timeline from "./Timeline";

export const HomeCard = ({ temp, check, weatherData, url, changeUnit }) => {
  console.log("homecard", weatherData);
  return (
    <>
      <div className="d-flex justify-content-center  my-3 ">
        <div
          className="mb-5 bg-light shadow"
          style={{ borderRadius: "10px 10px 0 0" }}
        >
          <div
            className="bg-info bg-gradient shadow"
            style={{ borderRadius: "10px 10px 0 0" }}
          >
            <div className="d-flex align-items-center justify-content-between p-3">
              <div className="">
                <div className="card-title fw-bold">
                  <label htmlFor="SwitchCheck">
                    {temp ? temp : weatherData?.main?.temp}{" "}
                    {!check ? "°C" : "°F"}
                  </label>
                  <span className=" mx-2 form-switch">
                    <input
                      id="SwitchCheck"
                      checked={check}
                      onChange={changeUnit}
                      className="form-check-input"
                      type="checkbox"
                    />
                  </span>
                </div>
                {weatherData && (
                  <h5 className="card-title text">{weatherData.name}</h5>
                )}
                <p className="card-text">
                  <small className="text-muted">
                    {new Date().toLocaleString("en-us", {
                      weekday: "long",
                    })}
                  </small>
                </p>
                <p className="card-text">
                  {weatherData?.main?.temp
                    ? weatherData.weather[0].description
                    : ""}
                </p>
              </div>
              <img src={url} alt={url} className="img-fluid rounded-start" />
            </div>
          </div>
          <Timeline check={check} />
        </div>
      </div>
    </>
  );
};
