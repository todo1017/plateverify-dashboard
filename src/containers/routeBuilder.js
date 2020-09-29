import slugify from "slugify";

import Login from 'pages/auth/login';
import SchoolDashboard     from 'pages/school/dashboard/home/home';
import SchoolDashboardView from 'pages/school/dashboard/view/view';
import SchoolAlertList     from 'pages/school/alert/list/list';
import SchoolAlertView     from 'pages/school/alert/view/view';
import SchoolOffenderList  from 'pages/school/offender/list';
import SchoolMemberList    from 'pages/school/member/list';
import SchoolMemberView    from 'pages/school/member/view';
import SchoolMemberImport  from 'pages/school/member/import';
import SchoolVehicleList   from 'pages/school/vehicle/list';
import SchoolVehicleView   from 'pages/school/vehicle/view/view';
import SchoolVehicleImport from 'pages/school/vehicle/import';
import SchoolSetting       from 'pages/school/setting/setting';

const routeGenerator = (prefix) => [
  {
    path: '/login',
    roles: ['NO_ROLE'],
    component: Login
  },
  {
    path: `/${prefix}/dashboard`,
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Campus Dashboard',
    component: SchoolDashboard
  },
  {
    path: `/${prefix}/dashboard/:id`,
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Vehicle Detail',
    component: SchoolDashboardView
  },
  {
    path: `/${prefix}/alert`,
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Alerts',
    component: SchoolAlertList
  },
  {
    path: `/${prefix}/alert/:id`,
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Alerts',
    component: SchoolAlertView
  },
  {
    path: `/${prefix}/offender`,
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Offenders',
    component: SchoolOffenderList
  },
  {
    path: `/${prefix}/member`,
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Members',
    component: SchoolMemberList
  },
  {
    path: `/${prefix}/member/view/:id`,
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Members',
    component: SchoolMemberView
  },
  {
    path: `/${prefix}/member/import`,
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Import Members',
    component: SchoolMemberImport
  },
  {
    path: `/${prefix}/vehicle`,
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Vehicles',
    component: SchoolVehicleList
  },
  {
    path: `/${prefix}/vehicle/view/:id`,
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Vehicles',
    component: SchoolVehicleView
  },
  {
    path: `/${prefix}/vehicle/import`,
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Import Vehicles',
    component: SchoolVehicleImport
  },
  {
    path: `/${prefix}/setting`,
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Settings',
    component: SchoolSetting
  }
];

const builder = (user) => {
  let finalRoutes = [];

  if (user) {

    let prefix;
    if (user.roles.includes('ROLE_SCOPE_PLATEVERIFY')) {
      prefix = 'ppt';
    } else {
      prefix = slugify(user.school.name, { replacement: '-', lower: true });
    }

    const routes = routeGenerator(prefix);
    finalRoutes = routes.filter(route => {
      let merged = [...new Set([...user.roles, ...route.roles])];
      return merged.length === user.roles.length;
    });

  } else {
    const routes = routeGenerator('');
    finalRoutes = [routes[0]];
  }

  return finalRoutes;
}

export default builder;
