export function capitalize(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getInitials = (firstName: string, lastName: string) => {
  return `${firstName?.[0] || ""}${lastName?.[0] || ""}`;
};
