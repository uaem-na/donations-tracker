export const generateRandomID = () => {
  const a = (Math.random() * 46656) | 0;
  const b = (Math.random() * 46656) | 0;
  const i = ("000" + a.toString(36)).slice(-3);
  const j = ("000" + b.toString(36)).slice(-3);
  return i + j;
};
