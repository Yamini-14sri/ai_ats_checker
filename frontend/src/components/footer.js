import React from "react";

export default function Footer() {
  return (
    <footer className="mt-20 bg-white border-t py-6 text-center text-gray-500">
      © {new Date().getFullYear()} ATS Pro. All rights reserved.
    </footer>
  );
}