import { useState } from "react";
import { Outlet } from "react-router";
import ProfileContext from "../contexts/profile.context";

export default function ProfileProvider({ children }) {
  const [data, setData] = useState({});
  const [stepId, setStepId] = useState(0);
  const updateData = (newData) => {
    setData({ ...data, ...newData });
  };
  return (
    <ProfileContext.Provider
      value={{
        data,
        updateData,
        setStepId,
        stepId,
      }}
    >
      <Outlet />
    </ProfileContext.Provider>
  );
}
