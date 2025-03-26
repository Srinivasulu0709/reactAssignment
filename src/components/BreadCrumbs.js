import React, { useEffect, useState } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useLocation } from 'react-router-dom';

function BreadCrumbs() {

    const location = useLocation();
    const [breadcrumbs,setBreadcrumbs] = useState([]);

    useEffect(() => {
        const paths = location.pathname.split('/').filter((item) => item);
        setBreadcrumbs(paths);
    },[location]);

  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      {breadcrumbs.map((crumb, index) => {
        const path = `/${breadcrumbs.slice(0, index + 1).join('/')}`;
        return (
          <Breadcrumb.Item key={index} href={path}>
            {crumb.charAt(0).toUpperCase() + crumb.slice(1)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  )
}

export default BreadCrumbs