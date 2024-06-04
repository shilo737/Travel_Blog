import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTravelAgents,
  deleteTravelAgents,
  getAllTravelAgents,
} from "../redux/features/travelAgentSlice";

const useTravelAgents = () => {
  const { travelAgents, loading, error } = useSelector(
    (store) => store.travelAgentReducer
  );
  const dispatch = useDispatch();

  const getAllAgents = () => {
    dispatch(getAllTravelAgents());
  };

  const addAgents = (_bodyData) => {
    dispatch(addTravelAgents(_bodyData));
  };

  const deleteAgent = (_id) => {
    dispatch(deleteTravelAgents(_id));
  };

  return {
    travelAgents,
    loading,
    error,
    getAllAgents,
    addAgents,
    deleteAgent,
  };
};

export default useTravelAgents;
