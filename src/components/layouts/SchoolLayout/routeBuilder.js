import SchoolDashboard       from 'pages/school/dashboard/dashboard';
import SchoolDashboardRecord from 'pages/school/dashboard/record';
import SchoolAlertList       from 'pages/school/alert/list';
import SchoolAlertRecord     from 'pages/school/alert/record';
import SchoolOffenderList    from 'pages/school/offender/list';
import SchoolMemberList      from 'pages/school/member/list';
import SchoolMemberView      from 'pages/school/member/record';
import SchoolMemberImport    from 'pages/school/member/import';
import SchoolVehicleList     from 'pages/school/vehicle/list';
import SchoolVehicleView     from 'pages/school/vehicle/record';
import SchoolVehicleImport   from 'pages/school/vehicle/import';
import SchoolSetting         from 'pages/school/setting/setting';

const routeGenerator = () => [
  {
    path: '/dashboard',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Campus Dashboard',
    component: SchoolDashboard
  },
  {
    path: '/dashboard/:id',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Vehicle Detail',
    component: SchoolDashboardRecord
  },
  {
    path: '/alert',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Alerts',
    component: SchoolAlertList
  },
  {
    path: '/alert/:id',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Alerts',
    component: SchoolAlertRecord
  },
  {
    path: '/offender',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Offenders',
    component: SchoolOffenderList
  },
  {
    path: '/member',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Members',
    component: SchoolMemberList
  },
  {
    path: '/member/view/:id',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Members',
    component: SchoolMemberView
  },
  {
    path: '/member/import',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Import Members',
    component: SchoolMemberImport
  },
  {
    path: '/vehicle',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Vehicles',
    component: SchoolVehicleList
  },
  {
    path: '/vehicle/view/:id',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Vehicles',
    component: SchoolVehicleView
  },
  {
    path: '/vehicle/import',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Import Vehicles',
    component: SchoolVehicleImport
  },
  {
    path: '/setting',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Settings',
    component: SchoolSetting
  },
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
