import React from "react";
import { useNavigate } from "react-router-dom";
import Iconlogo from "@/assets/ICON CRM 1.png";

export default function logo() {
  const navigate = useNavigate();

  const navigateToHome = () => navigate("/");

  return (
    <div
      role="button"
      onClick={navigateToHome}
      className="flex justify-center p-5 items-center "
    >
      <div>
        <img className="w-12" src={Iconlogo} alt="Money" />
      </div>

      <div className="px-3">
        <p className="font-bold text-3xl text-foreground">Lucrativo</p>
        <p className="text-foreground">CRM INTELIGÊNTE</p>
      </div>
    </div>
  );
}
