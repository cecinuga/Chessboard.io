import { useMoralis } from "react-moralis";
import Moralis from 'moralis';

Moralis.start({serverUrl:"https://0z076nfdvktd.usemoralis.com:2053/server",appId:"DCChTAiOFY3h9djTsMKGLppRjDoqsPYbAjJQQtfb"});
export const login = async ()=>{await Moralis.authenticate()}
export const logout = async ()=>{await Moralis.logout()}