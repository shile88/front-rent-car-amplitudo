import Welcome from "../../../components/welcome/Welcome.jsx";
import withAuth from "../../../authHOC/authHOC.jsx";
import withRole from "../../../roleHOC/roleHOC.jsx";

const AdminHome = () => {
  return (
    <>
      <Welcome
        component={<h2>Welcome. Feel free to check our cars for rent</h2>}
      />
    </>
  );
};

export default withRole(withAuth(AdminHome));
