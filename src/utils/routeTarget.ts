function getHasValue(param: Record<string, any>) {
  const hasValue = {};
  Object.keys(param).forEach((key) => {
    const value = param[key];
    if (value && !Number.isNaN(value)) {
      hasValue[key] = value;
    }
  });
  return hasValue;
}

export const RouteTarget = {
  accountList: (param: Record<string, any>) => {
    const hasValue = getHasValue(param);
    return `/authority/account?${new URLSearchParams(hasValue).toString()}`;
  },
};
