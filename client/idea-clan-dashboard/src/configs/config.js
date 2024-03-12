export const config = {
    headers: {
      Authorization: sessionStorage.getItem("token"),
      "Content-Type": "application/json",
    },
  };
  