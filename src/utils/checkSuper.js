const checkSuper = () => {
  const isSuper = window.localStorage.getItem("isSuperAdmin");
  if (isSuper) return true;
  return false;
};

export default checkSuper;
