export const menuItemData = [
  {
    menuName: 'Inventory Management',
    icon: 'dashboard',
    opened: false,
    menuCategory : [
       {
          categoryTitle: 'Inventory',
          categoryDetail: [
            {
              name: 'List',
              routeLink: 'inventory/list'
            },
            {
              name: 'New',
              routeLink: 'inventory/new'
            }
          ]
       }
    ]
  },
  {
    menuName: 'Settings',
    icon: 'settings',
    opened: false,
    menuCategory : [
      {
        categoryTitle: 'Country',
        categoryDetail: [
          {
            name: 'List',
            routeLink: 'settings/country/list'
          },
          {
            name: 'New',
            routeLink: 'settings/country/new'
          }
        ]
     },
     {
      categoryTitle: 'City',
      categoryDetail: [
        {
          name: 'List',
          routeLink: 'settings/city/list'
        },
        {
          name: 'New',
          routeLink: 'settings/city/new'
        }
      ]
   },
       {
          categoryTitle: 'District',
          categoryDetail: [
            {
              name: 'List',
              routeLink: 'settings/districts'
            },
            {
              name: 'New',
              routeLink: 'settings/districts/0'
            }
          ]
       }
    ]
  },
];