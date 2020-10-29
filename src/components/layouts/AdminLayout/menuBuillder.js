import PetsIcon from '@material-ui/icons/Pets';
import GroupIcon from '@material-ui/icons/Group';
import BusinessIcon from '@material-ui/icons/Business';
import BackupIcon from '@material-ui/icons/Backup';

const menuGenerator = () => [
  {
    name: 'Management',
    type: 'section',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    children: [
      {
        name: 'School',
        type: 'item',
        Icon: BusinessIcon,
        link: '/admin/school'
      },
      {
        name: 'User',
        type: 'item',
        Icon: GroupIcon,
        link: '/admin/user'
      },
      {
        name: 'Offender',
        type: 'item',
        Icon: PetsIcon,
        link: '/admin/offender'
      }
    ]
  },
  {
    name: 'Migration',
    type: 'section',
    roles: ['ROLE_SCOPE_PLATEVERIFY'],
    children: [
      {
        name: 'Migration',
        type: 'item',
        Icon: BackupIcon,
        link: '/admin/migration',
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
