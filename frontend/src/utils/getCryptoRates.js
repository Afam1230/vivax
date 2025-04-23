// utils/getCryptoRates.js
import axios from "axios";

export const getCryptoRates = async () => {
  const res = await axios.get(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,tether&vs_currencies=usd"
  );
  return {
    btc: res.data.bitcoin.usd,
    eth: res.data.ethereum.usd,
    usdt: res.data.tether.usd,
  };
};
