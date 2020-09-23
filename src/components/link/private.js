import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import slugify from "slugify";

const PrivateLink = ({ roles, to, children }) => {

  const authState = useSelector(state => state.Auth);
  const manage = authState.user.roles.includes('ROLE_MANAGE_ALL');
  const merged = [...new Set([...authState.user.roles, ...roles])];
  const hasAccess = manage || merged.length === authState.user.roles.length;
  const slug = slugify(authState.user.school.name, { replacement: '-', lower: true });

  return (
    <>
      {hasAccess &&
        <Link to={`/${slug}${to}`}>
          {children}
        </Link>
      }
    </>
  );
};

export default PrivateLink;