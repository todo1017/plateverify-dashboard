import slugify from "slugify";

const menuGenerator = (prefix) => [
  {
    name: '',
    type: 'section',
    children: [
      {
        name: 'Dashboard',
        type: 'item',
        icon: 'view-dashboard',
        link: `/${prefix}/dashboard`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      },
      {
        name: 'Alert',
        type: 'item',
        icon: 'notifications',
        link: `/${prefix}/alert`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      },
      {
        name: 'Offender',
        type: 'item',
        icon: 'fire',
        link: `/${prefix}/offender`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      },
      {
        name: 'Member',
        type: 'item',
        icon: 'accounts',
        link: `/${prefix}/member`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      },
      {
        name: 'Vehicle',
        type: 'item',
        icon: 'car',
        link: `/${prefix}/vehicle`,
        roles: ['ROLE_SCOPE_SCHOOL'],
      },
      {
        name: 'Setting',
        type: 'item',
        icon: 'settings',
        link: `/${prefix}/setting`,
        roles: ['ROLE_SCOPE_SCHOOL', 'ROLE_MANAGE_ALL'],
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