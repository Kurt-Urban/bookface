export const onImgError = (e) => {
  e.target.onerror = null;
  e.target.src =
    "http://localhost:3001/images/1620255528604-stormtrooper-profile.jpg";
};
