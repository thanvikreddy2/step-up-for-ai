export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export const isNewThisWeek = (dateString: string): boolean => {
  const submitted = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - submitted.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays <= 7;
};

export const formatAskAmount = (amount: number): string => {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(1).replace(/\.0$/, "")} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, "")} L`;
  }
  return `₹${amount.toLocaleString("en-IN")}`;
};

export const formatLakhs = (amount: number): string => {
  return formatAskAmount(amount);
};
