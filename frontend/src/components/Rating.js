import React from "react";
import PropTypes from "prop-types";
import styled from 'styled-components';

const Rating = ({ value, color, fontSize }) => {

  const Star = styled.span`
    margin-right: 0.2rem;
  `;

  return (
    <div className="rating">
      <Star>
        <i
          style={{ color, fontSize }}
          className={
            value >= 1
              ? "fas fa-star"
              : value >= 0.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </Star>
      <Star>
        <i
          style={{ color, fontSize }}
          className={
            value >= 2
              ? "fas fa-star"
              : value >= 1.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </Star>
      <Star>
        <i
          style={{ color, fontSize }}
          className={
            value >= 3
              ? "fas fa-star"
              : value >= 2.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </Star>
      <Star>
        <i
          style={{ color, fontSize }}
          className={
            value >= 4
              ? "fas fa-star"
              : value >= 3.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </Star>
      <Star>
        <i
          style={{ color, fontSize }}
          className={
            value >= 5
              ? "fas fa-star"
              : value >= 4.5
              ? "fas fa-star-half-alt"
              : "far fa-star"
          }
        ></i>
      </Star>
    </div>
  );
};

Rating.defaultProps = {
  color: "orange",
  fontSize: '0.8rem'
};

Rating.propTypes = {
  value: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default Rating;
