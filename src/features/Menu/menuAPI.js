import { useMoralis } from "react-moralis";

export const login = async () =>{ const {authenticate}=useMoralis();await authenticate() }
export const logout = async () =>{ const {logout}=useMoralis();await logout() }
