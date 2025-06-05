import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';

export default function Breadcrumbs({ extraCrumbs = [] }) {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <Breadcrumb className="my-3">
      <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
        Home
      </Breadcrumb.Item>

      {pathnames.map((name, index) => {
        const to = '/' + pathnames.slice(0, index + 1).join('/');
        const isLast = index === pathnames.length - 1;

        const extra = extraCrumbs.find((c) => c.path === to);

        return isLast ? (
          <Breadcrumb.Item active key={to}>
            {extra?.label || decodeURIComponent(name)}
          </Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item linkAs={Link} linkProps={{ to }} key={to}>
            {extra?.label || decodeURIComponent(name)}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
