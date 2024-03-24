export async function fetchUserData(fid: number, token: string) {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`, // Make sure to replace <token> with the actual token
    },
  };

  try {
    const response = await fetch(
      `https://api.pinata.cloud/v3/farcaster/users/${fid}`,
      options,
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.error(err);
    throw err; // Rethrowing the error so Promise.all can catch it
  }
}
