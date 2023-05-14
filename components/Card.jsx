import React from "react";
import { useDispatch } from "react-redux";
import { addToTeam, removeFromTeam } from "../slices/dataSlice";

const Card = ({ data }) => {
  const {
    available,
    avatar,
    domain,
    email,
    first_name,
    gender,
    id,
    last_name,
  } = data;
  const dispatch = useDispatch();

  return (
    <>
      <div className="card">
        <div className="imgContainer">
          {<img src={avatar} alt={first_name} />}
        </div>
        <div className="details">
          <div>
            Name :<span>{first_name}</span>
          </div>
          <div>
            Email :<span>{email}</span>
          </div>
          <div>
            Last name :<span>{last_name}</span>
          </div>
          <div>
            Gender :<span>{gender}</span>
          </div>
          <div>
            Domain :<span>{domain}</span>
          </div>
          <div>
            Availability :
            <span>{available === false ? "Not available" : "Available"}</span>
          </div>
        </div>
        <div className="btnContainer">
          <button onClick={() => dispatch(removeFromTeam(id))}>Remove</button>
          <button onClick={() => dispatch(addToTeam(id))}>Add</button>
        </div>
      </div>
    </>
  );
};

export default Card;
