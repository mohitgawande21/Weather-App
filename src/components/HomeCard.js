import { Loader } from "./Loader";
import Timeline from "./Timeline";

export const HomeCard = ({
  temp,
  check,
  weatherData,
  url,
  loading,
  changeUnit,
  overviewData,
}) => {
  console.log("homecard", weatherData);
  return (
    <>
      <div className="d-flex justify-content-center  my-3 ">
        {loading && !weatherData ? (
          <Loader />
        ) : (
          <div className="card mb-5 bg-light shadow" style={{ width: "500px" }}>
            <div className="row g-0">
              <div className="bg-info bg-gradient shadow">
                <div className="d-flex align-items-center justify-content-between p-3">
                  <div className="">
                    <h5 className="card-title text">
                      {temp ? temp : weatherData?.main?.temp}{" "}
                      {!check ? "°C" : "°F"}
                      <span className=" mx-2 form-switch">
                        <input
                          checked={check}
                          onChange={changeUnit}
                          className="form-check-input"
                          type="checkbox"
                        />
                      </span>
                    </h5>
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
                  <img
                    src={url}
                    alt={url}
                    className="img-fluid rounded-start"
                  />
                </div>
              </div>
              <Timeline check={check} />
            </div>
          </div>
        )}
      </div>
    </>
  );
};
