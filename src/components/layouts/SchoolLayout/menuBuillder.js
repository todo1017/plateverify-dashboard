import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PetsIcon from '@material-ui/icons/Pets';
import GroupIcon from '@material-ui/icons/Group';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import SettingsIcon from '@material-ui/icons/Settings';

const menuGenerator = () => [
  {
    name: 'Stream',
    type: 'section',
    roles: ['ROLE_SCOPE_SCHOOL'],
    children: [
      {
        name: 'Dashboard',
        type: 'item',
        Icon: DashboardIcon,
        link: '/dashboard',
      },
      {
        name: 'Alert',
        type: 'item',
        Icon: NotificationsIcon,
        link: '/alert',
      }
    ]
  },
  {
    name: 'Manage',
    type: 'section',
    roles: ['ROLE_SCOPE_SCHOOL'],
    children: [
      {
        name: 'Offender',
        type: 'item',
        Icon: PetsIcon,
        link: '/offender',
      },
      {
        name: 'Member',
        type: 'item',
        Icon: GroupIcon,
        link: '/member',
      },
      {
        name: 'Vehicle',
        type: 'item',
        Icon: DriveEtaIcon,
        link: '/vehicle',
      },
      {
        name: 'Setting',
        type: 'item',
        Icon: SettingsIcon,
        link: '/setting',
      }
    ]
  }
];

const builder = (user) => {
  let finalMenus = [];

  if (user) {

    const menus = menuGenerator();
    finalMenus = menus.filter(m => {
      if (m.roles) {
        let merged = [...new Set([...user.roles, ...m.roles])];
        return merged.length === user.roles.length;
      }
      return true;
    });

    finalMenus = finalMenus.map(m => {
      if (m.children) {
        let newChildren = m.children.filter(m1 => {
          if (m1.roles) {
            let merged = [...new Set([...user.roles, ...m1.roles])];
            return merged.length === user.roles.length;
          }
          return true;
        });
        m.children = newChildren;
      }
      return m;
    });

  } else {
    finalMenus = [];
  }

  return finalMenus;
}

export default builder;
