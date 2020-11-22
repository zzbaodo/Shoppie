import React from "react";
import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
  const fullStar = Math.floor(value / 1);
  const halfStar = value % 1;
  const remainingStar = Array.from(
    { length: Math.floor(5 - value) },
    (v, i) => i
  );
  let fullStarList = Array.from({ length: fullStar }, (v, i) => i);
  return (
    <div className="rating">
      <span>
        {fullStarList.length > 0 ? (
          fullStarList.map((value) => (
            <i key={value} style={{ color }} className="fas fa-star"></i>
          ))
        ) : (
          <p>No Review</p>
        )}
        {halfStar !== 0 && (
          <i style={{ color }} className="fas fa-star-half-alt"></i>
        )}
        {remainingStar.length > 0 &&
          remainingStar.map((value) => (
            <i style={{ color }} className="far fa-star" key={value}></i>
          ))}
      </span>{' '}
      {text && text}
    </div>
  );
};
Rating.propTypes = {
  value: PropTypes.number,
  text: PropTypes.string.isRequired,
  color: PropTypes.string,
};
export default Rating;
