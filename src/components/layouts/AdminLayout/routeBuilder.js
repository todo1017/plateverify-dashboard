import AdminSchoolList     from 'pages/admin/school/list';
import AdminSchoolCreate   from 'pages/admin/school/create';
import AdminSchoolRecord   from 'pages/admin/school/record';
import AdminUserList       from 'pages/admin/user/list';
import AdminUserCreate     from 'pages/admin/user/create';
import AdminOffenderList   from 'pages/admin/offender/list';
import AdminOffenderImport from 'pages/admin/offender/import';
import AdminMigration      from 'pages/admin/migration/migration';

const routeGenerator = () => [
  {
    path: '/admin/school',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    component: AdminSchoolList
  },
  {
    path: '/admin/school/create',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    component: AdminSchoolCreate
  },
  {
    path: '/admin/school/view/:id',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    component: AdminSchoolRecord
  },
  {
    path: '/admin/user',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    component: AdminUserList
  },
  {
    path: '/admin/user/create',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    component: AdminUserCreate
  },
  {
    path: '/admin/offender',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    component: AdminOffenderList
  },
  {
    path: '/admin/offender/import',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    component: AdminOffenderImport
  },
  {
    path: '/admin/migration',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    component: AdminMigration
  }
];

const builder = (user) => {
  let finalRoutes = [];
  const routes = routeGenerator();
  if (user) {
    finalRoutes = routes.filter(route => {
      let merged = [...new Set([...user.roles, ...route.roles])];
      return merged.length === user.roles.length;
    });
  } else {
    finalRoutes = [routes[0]];
  }
  return finalRoutes;
}

export default builder;
