import slugify from "slugify";
import DashboardIcon from '@material-ui/icons/Dashboard';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PetsIcon from '@material-ui/icons/Pets';
import GroupIcon from '@material-ui/icons/Group';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import SettingsIcon from '@material-ui/icons/Settings';
import BackupIcon from '@material-ui/icons/Backup';

const menuGenerator = (prefix) => [
  {
    name: 'Stream',
    type: 'section',
    children: [
      {
        name: 'Dashboard',
        type: 'item',
        Icon: DashboardIcon,
        link: `/${prefix}/dashboard`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      },
      {
        name: 'Alert',
        type: 'item',
        Icon: NotificationsIcon,
        link: `/${prefix}/alert`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      }
    ]
  },
  {
    name: 'Manage',
    type: 'section',
    children: [
      {
        name: 'Offender',
        type: 'item',
        Icon: PetsIcon,
        link: `/${prefix}/offender`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      },
      {
        name: 'Member',
        type: 'item',
        Icon: GroupIcon,
        link: `/${prefix}/member`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      },
      {
        name: 'Vehicle',
        type: 'item',
        Icon: DriveEtaIcon,
        link: `/${prefix}/vehicle`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      },
      {
        name: 'Setting',
        type: 'item',
        Icon: SettingsIcon,
        link: `/${prefix}/setting`,
        roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
      }
    ]
  },
  {
    name: 'Temporary',
    type: 'section',
    roles: ['ROLE_SCOPE_ADMIN', 'ROLE_MANAGE_ALL'],
    children: [
      {
        name: 'Integration',
        type: 'item',
        Icon: BackupIcon,
        link: '/admin/setting',
      }
    ]
  }
];

const builder = (user) => {
  let finalMenus = [];

  if (user) {

    let prefix;
    if (user.roles.includes('ROLE_SCOPE_PLATEVERIFY')) {
      prefix = 'ppt';
    } else {
      prefix = slugify(user.school.name, { replacement: '-', lower: true });
    }

    const menus = menuGenerator(prefix);
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
    const menus = menuGenerator('');
    finalMenus = menus[0];
  }

  return finalMenus;
}

export default builder;