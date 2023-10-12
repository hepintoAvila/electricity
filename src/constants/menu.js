const MENU_ITEMS = [{
    key: 'programas',
    label: 'Estadísticas por Programas',
    isTitle: false,
    children: [{
        key: 'graduados',
        label: 'Graduados',
        isTitle: false,
        icon: 'uil uil-graduation-hat',
        badge: {
          variant: 'success',
          text: '5'
        },
        parentKey: 'programas',
        children: [{
            key: 'ds-doctorados',
            label: 'Doctorados',
            url: '/estadisticas_programas/graduados/doctorados',
            parentKey: 'graduados'
          },
          {
            key: 'ds-maestrias',
            label: 'Maestrias',
            url: '/estadisticas_programas/graduados/maestrias',
            parentKey: 'graduados'
          },
          {
            key: 'ds-especializaciones',
            label: 'Especializaciones',
            url: '/estadisticas_programas/graduados/especializaciones',
            parentKey: 'graduados',
          },
          {
            key: 'ds-pregrado',
            label: 'Pregrado',
            url: '/estadisticas_programas/graduados/pregrado',
            parentKey: 'graduados'
          },
          {
            key: 'ds-tecnologos',
            label: 'Tecnologos',
            url: '/estadisticas_programas/graduados/tecnologos',
            parentKey: 'graduados'
          },
        ],
      },
      {
        key: 'matriculados',
        label: 'Matriculados',
        isTitle: false,
        icon: 'uil uil-user-check',
        badge: {
          variant: 'success',
          text: '5'
        },
        parentKey: 'programas',
        children: [
          {
            key: 'ds-pregrado',
            label: 'Todos',
            url: '/estadisticas_programas/matriculados/pregrado',
            parentKey: 'matriculados'
          }
        ],
      },
      {
        key: 'admitidos',
        label: 'Admitidos',
        isTitle: false,
        icon: 'uil uil-user-square',
        badge: {
          variant: 'success',
          text: '1'
        },
        parentKey: 'programas',
        children: [
          {
            key: 'ds-pregrado',
            label: 'Pregrado',
            url: '/estadisticas_programas/admitidos/pregrado',
            parentKey: 'admitidos'
          },
        ],
      },
      {
        key: 'inscritos',
        label: 'Inscritos',
        isTitle: false,
        icon: 'uil uil-book-reader',
        badge: {
          variant: 'success',
          text: '1'
        },
        parentKey: 'programas',
        children: [
          {
            key: 'ds-pregrado',
            label: 'Pregrado',
            url: '/estadisticas_programas/inscritos/pregrado',
            parentKey: 'inscritos'
          },
        ],
      },
      {
        key: 'totales',
        label: 'Total General',
        isTitle: false,
        icon: 'uil uil-book-reader',
        badge: {
          variant: 'success',
          text: '1'
        },
        parentKey: 'programas',
        children: [
          {
            key: 'ds-pregrado',
            label: 'Por Años',
            url: '/estadisticas_programas/por_fecha/general',
            parentKey: 'totales'
          },
        ],
      },
    ],
  },
];

export default MENU_ITEMS;
