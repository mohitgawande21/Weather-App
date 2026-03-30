import { memo } from "react";

const Card = memo(({ time, url, temperature, description, check }) => {
  return (
    <>
      <div className=" mx-1 card  m-auto my-1  bg-light bg-gradient ">
        <div className="card-body text-center shadow ">
          <h6 className="card-text">{new Date(time).toDateString()}</h6>
          <img alt={description} src={url} />
          <div>
            <strong className="card-text">{temperature}</strong>
          </div>
          <div>
            <strong className="card-text">{description}</strong>
          </div>
        </div>
      </div>
    </>
  );
});

export default Card;
