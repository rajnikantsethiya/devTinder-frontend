import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Body = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  useEffect(() => {
    if (!user) {
      navigate("/login", { replace: true });
    }
  }, []);

  return (
    <div className="bg-base-300 h-auto">
      <Navbar />
      <Outlet />
      <footer
        className="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4"
        style={{ position: "fixed", bottom: 0 }}
      >
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved
            DevTinder
          </p>
        </aside>
      </footer>
    </div>
  );
};

export default Body;
