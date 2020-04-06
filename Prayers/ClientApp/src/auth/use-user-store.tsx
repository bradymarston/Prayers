import { storesContext } from "../contexts";
import React from "react";

export const useUserStore = () => React.useContext(storesContext).userStore;