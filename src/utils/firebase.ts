const FIREBASE_API_KEY = "AIzaSyBOx3jtk_ryNLoQFvIuy9a0hbV_zS1tITw";

export const verifyFirebaseToken = async (token: string) => {
  try {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${FIREBASE_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: token }),
      }
    );

    const data = await response.json();
    return data.users?.length > 0;
  } catch (error) {
    console.error("Error verifying Firebase token:", error);
    return false;
  }
};
