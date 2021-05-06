export const onProfileImgError = (e) => {
  e.target.onerror = null;
  e.target.src = "/images/1620255528604-stormtrooper-profile.jpg";
};
