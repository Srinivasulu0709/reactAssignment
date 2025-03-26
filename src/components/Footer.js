import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-light py-2">
      <div className="text-center mt-3">
        <p>&copy; {new Date().getFullYear()} YourCompany. All Rights Reserved.</p>
      </div>
  </footer>
  )
}

export default Footer