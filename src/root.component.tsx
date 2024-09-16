import { RouterProvider } from "react-router-dom";
import router from "./root.router";
import './root.variables.scss';
import './root.style.scss';

const Root: React.FC = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default Root;
