const BASE_URL = "https://localhost:5001/api";

export const getStandards = async () => {
  const res = await fetch(`${BASE_URL}/Master/GetStandards`);
  return res.json();
};

// export const getHobbies = async () => {
//   const res = await fetch(`${BASE_URL}/Master/GetHobbies`);
//   return res.json();
// };

// export const getInquirySources = async () => {
//   const res = await fetch(`${BASE_URL}/Master/GetInquirySources`);
//   return res.json();
// };