import Login from 'pages/auth/login';
import SchoolDashboard     from 'pages/school/dashboard/home/home';
import SchoolDashboardView from 'pages/school/dashboard/view/view';
import SchoolAlertList     from 'pages/school/alert/list/list';
import SchoolAlertView     from 'pages/school/alert/view/view';
import SchoolOffenderList  from 'pages/school/offender/list';
import SchoolMemberList    from 'pages/school/member/list/list';
import SchoolMemberView    from 'pages/school/member/view/view';
import SchoolMemberImport  from 'pages/school/member/import';
import SchoolVehicleList   from 'pages/school/vehicle/list';
import SchoolVehicleView   from 'pages/school/vehicle/view/view';
import SchoolVehicleImport from 'pages/school/vehicle/import';
import SchoolSetting       from 'pages/school/setting/setting';
import AdminSchoolList     from 'pages/admin/school/list';
import AdminSchoolEdit     from 'pages/admin/school/edit';
import AdminUserList       from 'pages/admin/user/list';
import AdminOffenderList   from 'pages/admin/offender/list';
import AdminOffenderImport from 'pages/admin/offender/import';
import AdminMigration      from 'pages/admin/migration';

const routeGenerator = () => [
  {
    path: '/login',
    roles: ['NO_ROLE'],
    component: Login
  },
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
    component: SchoolDashboardView
  },
  {
    path: '/alert',
    roles: ['ROLE_SCOPE_SCHOOL'],
    pageTitle: 'Alerts',
    component: SchoolAlertList
  },
  {
    path: '/alert/:id',
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Alerts',
    component: SchoolAlertView
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
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Members',
    component: SchoolMemberView
  },
  {
    path: '/member/import',
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
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
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Vehicles',
    component: SchoolVehicleView
  },
  {
    path: '/vehicle/import',
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Import Vehicles',
    component: SchoolVehicleImport
  },
  {
    path: '/setting',
    roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
    pageTitle: 'Settings',
    component: SchoolSetting
  },
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