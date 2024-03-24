export const sendEvent = async (event: string, data: any, id: string) => {
  const options = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ event, data, frame_id: id }),
  };

  fetch("https://api.pinata.cloud/farcaster/frames/interactions", options)
    .then((response) => response.json())
    .then((response) => console.log(response))
    .catch((err) => console.error(err));
};
