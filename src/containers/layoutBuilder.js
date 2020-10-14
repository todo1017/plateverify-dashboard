import AuthLayout from "containers/layouts/authLayout";
import AdminLayout from "containers/layouts/adminLayout";
import SchoolLayout from "containers/layouts/schoolLayout";

const builder = (user) => {
  if (user === null) {
    return AuthLayout;
  }
  if (user.school) {
    return SchoolLayout;
  }
  return AdminLayout;
};

export default builder;
