import { createContext, useContext, useReducer } from "react";

export const StateContext = createContext();

// eslint-disable-next-line react/prop-types
export const StateProvider = ({ initialState, reducer, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateProvider = () => useContext(StateContext);
