import { memo } from "react";

const Card = memo(({ time, url, temperature, description, date }) => {
  return (
    <>
      <div className=" mx-1 card  my-1  bg-light bg-gradient ">
        <div className="card-body text-center shadow">
          <p
            className="card-text fw-bold"
            style={{ fontFamily: `'Courier New', Courier, monospace` }}
          >
            {time}, {date}
          </p>
          <img alt={description} src={url} />
          <p className="card-text fw-bold">{temperature}</p>
          <p className="card-text fw-bold">{description}</p>
        </div>
      </div>
    </>
  );
});

export default Card;
