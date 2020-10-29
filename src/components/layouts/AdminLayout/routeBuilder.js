import AdminSchoolList     from 'pages/admin/school/list';
import AdminSchoolEdit     from 'pages/admin/school/edit';
import AdminUserList       from 'pages/admin/user/list';
import AdminOffenderList   from 'pages/admin/offender/list';
import AdminOffenderImport from 'pages/admin/offender/import';
import AdminMigration      from 'pages/admin/migration';

const routeGenerator = () => [
  {
    path: '/admin/school',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    pageTitle: 'Schools',
    component: AdminSchoolList
  },
  {
    path: '/admin/school/:id',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    pageTitle: 'Edit School',
    component: AdminSchoolEdit
  },
  {
    path: '/admin/user',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    pageTitle: 'Users',
    component: AdminUserList
  },
  {
    path: '/admin/offender',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    pageTitle: 'Offenders',
    component: AdminOffenderList
  },
  {
    path: '/admin/offender/import',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    pageTitle: 'Offenders',
    component: AdminOffenderImport
  },
  {
    path: '/admin/migration',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    pageTitle: 'Migration',
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
