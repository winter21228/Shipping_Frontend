// ----------------------------------------------------------------------
function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  rates: path(ROOTS_DASHBOARD, "/rates"),
  ship: path(ROOTS_DASHBOARD, "/ship"),
  reviewShip: (id) => path(ROOTS_DASHBOARD, `/ship/${id}`),
  singleShipping: path(ROOTS_DASHBOARD, "/ship/single"),
  reports: path(ROOTS_DASHBOARD, "/reports"),
  settings: path(ROOTS_DASHBOARD, "/settings"),
};
