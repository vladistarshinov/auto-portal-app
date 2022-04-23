import axios from "axios";

export const addPayPalScript = async (setSdk) => {
	
  const { data: clientId } = await axios.get("/api/config/paypal");
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
  script.async = true;
  script.onload = () => {
    setSdk(true);
  };
  document.body.appendChild(script);
};
