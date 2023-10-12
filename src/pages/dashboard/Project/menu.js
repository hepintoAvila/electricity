
const tabItems = [
  {
    id: 1,
    title: 'Consultar',
    icon: 'mdi mdi-home-variant',
    text: 'Clasificación por Consultas',
  },
  {
    id: 2,
    title: 'Gráficas',
    icon: 'mdi mdi-chart-bar',
    text: 'En esta session puedes consultar las estadsticas',
  }
  ,
  {
    id: 3,
    title: 'Total General',
    icon: 'mdi mdi-calendar-search',
    text: 'En esta session puedes consultar los reportes',
  },
];

const tabMatriculados = [
  {
    id: 1,
    title: 'Consultar',
    icon: 'mdi mdi-home-variant',
    text: 'Clasificación por Consultas',
  },
  {
    id: 2,
    title: 'Por Estratificación Social',
    icon: 'mdi mdi-calendar-search',
    text: 'En esta session puedes consultar los estracto',
  },
  {
    id: 3,
    title: 'Por Género',
    icon: 'mdi mdi-calendar-search',
    text: 'En esta session puedes consultar por Género',
  },{
    id: 4,
    title: 'Por Categorías',
    icon: 'mdi mdi-calendar-search',
    text: 'En esta session puedes consultar por Categorías',
  },{
    id: 5,
    title: 'Gráficas',
    icon: 'mdi mdi-chart-bar',
    text: 'En esta session puedes consultar las estadsticas',
  },
];

const tabAdmitidos = [
  {
    id: 1,
    title: 'Consultar',
    icon: 'mdi mdi-home-variant',
    text: 'Clasificación por Consultas',
  },
  {
    id: 2,
    title: 'Gráficas',
    icon: 'mdi mdi-chart-bar',
    text: 'En esta session puedes consultar las estadsticas',
  },
];
/*
const tabInscritos = [
  {
    id: 1,
    title: 'Consultar',
    icon: 'mdi mdi-home-variant',
    text: 'Clasificación por Consultas',
  },
  {
    id: 2,
    title: 'Gráficas',
    icon: 'mdi mdi-chart-bar',
    text: 'En esta session puedes consultar las estadsticas',
  },
  {
    id: 3,
    title: 'Categorias',
    icon: 'mdi mdi-calendar-search',
    text: 'En esta session puedes consultar los Categorias',
  }
];
*/
const columItemsPrincipal = [
  {
    Header: 'Sede',
    accessor: 'sede',
    sort: true,
},
  {
      Header: 'Programa',
      accessor: 'programa',
      sort: true,
  },
  {
      Header: 'Etiqueta',
      accessor: 'etiqueta',
      sort: false,
  },{
      Header: 'Periodo',
      accessor: 'periodo',
      sort: true,
  },{
      Header: 'Total',
      accessor: 'total',
      sort: true,
  },
];
const columFecha = [
  {
    Header: 'Sede',
    accessor: 'sede',
    sort: true,
},
  {
      Header: 'Periodo',
      accessor: 'periodo',
      sort: true,
  },
  {
      Header: 'Inscritos',
      accessor: 'inscritos',
      sort: false,
  },{
      Header: 'Admitidos',
      accessor: 'admitidos',
      sort: true,
  },{
      Header: 'Matriculados',
      accessor: 'matriculados',
      sort: true,
  },{
      Header: 'Graduados',
      accessor: 'graduados',
      sort: true,
  },{
      Header: 'Total',
      accessor: 'total',
      sort: true,
  },
];
const columTotales = [
  {
    Header: 'Sede',
    accessor: 'sede',
    sort: false,
},
  {
      Header: 'Programa',
      accessor: 'programa',
      sort: false,
  },
  {
      Header: 'Pregrado - Programas',
      accessor: 'etiqueta',
      sort: false,
  },{
      Header: 'Rango de Fechas',
      accessor: 'periodo',
      sort: false,
  },{
      Header: 'Total',
      accessor: 'total',
      sort: false,
  },
];
const columAdInsMa = [
  {
    Header: 'Periodos',
    accessor: 'periodo',
    sort: false,
},
  {
      Header: 'Inscritos',
      accessor: 'inscritos',
      sort: false,
  },
  {
      Header: 'Admitidos',
      accessor: 'admitidos',
      sort: false,
  },{
      Header: 'Matriculados',
      accessor: 'matriculados',
      sort: false,
  },{
      Header: 'Graduados',
      accessor: 'graduados',
      sort: false,
  },
];

const columnsEstadistInscritos = [
  {
    Header: 'ASPIRANTE REGULAR',
    accessor: 'ASPIRANTEREGULAR',
    sort: false,
},
  {
      Header: 'AFROCOLOMBIANOS',
      accessor: 'AFROCOLOMBIANOS',
      sort: false,
  },{
      Header: 'DESPLAZADOS',
      accessor: 'DESPLAZADOS',
      sort: false,
  },{
      Header: 'ESCUELA BÁSICA DE PERFACADÉMICO',
      accessor: 'ESCUELABASICADEPERFACADEMICO',
      sort: false,
  },{
      Header: 'MINORIAS ETNICAS Y CULTURALES',
      accessor: 'MINORIASETNICASYCULTURALES',
      sort: false,
  },{
      Header: 'PERSONERO (A) ESTUDIANTIL',
      accessor: 'PERSONERO(A)ESTUDIANTIL',
      sort: false,
  },{
      Header: 'PERSONA CON DISCAPACIDAD',
      accessor: 'PERSONACONDISCAPACIDAD',
      sort: false,
  },{
      Header: 'HIJO DE EMPLEADO',
      accessor: 'HIJODEEMPLEADO',
      sort: false,
  },{
      Header: 'VOLUNTARIO CRUZ ROJA',
      accessor: 'VOLUNTARIOCRUZROJA',
      sort: false,
  },{
      Header: 'VOLUNTARIO CUERPO DE BOMBEROS',
      accessor: 'VOLUNTARIOCUERPODEBOMBEROS',
      sort: false,
  },{
      Header: 'REINSERTADO',
      accessor: 'REINSERTADO',
      sort: false,
  },{
      Header: 'VOLUNTARIO DEFENSA CIVIL',
      accessor: 'VOLUNTARIO DEFENSA CIVIL',
      sort: false,
  },{
      Header: 'ESCUELA BASICA (ANTIGUA)',
      accessor: 'ESCUELABASICA(ANTIGUA)',
      sort: false,
  },{
      Header: 'ESCUELA NORMAL MANAURE',
      accessor: 'ESCUELANORMALMANAURE',
      sort: false,
  },{
      Header: 'EDUCACIÓN CONTINUA',
      accessor: 'EDUCACIONCONTINUA',
      sort: false,
  },
];
const columnsAdmitidos = [
  {
    Header: 'Periodo',
    accessor: 'Periodo',
    sort: false,
},
  {
      Header: 'Categorias',
      accessor: 'Categoria',
      sort: false,
  },{
      Header: 'Total',
      accessor: 'Total',
      sort: false,
  }
];
const sizePerPageList = [
  {
      text: '5',
      value: 5,
  },
  {
      text: '10',
      value: 10,
  },
  {
      text: '25',
      value: 25,
  },
  {
      text: 'All',
      value:9999,
  },
];
const columItemsMatriculados = [
  {
    Header: 'Sede',
    accessor: 'Sede',
    sort: true,
},
  {
      Header: 'Programa',
      accessor: 'Programa',
      sort: true,
  },
  {
      Header: 'Periodo',
      accessor: 'Periodo',
      sort: true,
  },{
      Header: 'Total',
      accessor: 'Total',
      sort: true,
  },
];

const colMatricGenero = [
  {
    Header: 'Sede',
    accessor: 'Sede',
    sort: true,
},
  {
      Header: 'Programa',
      accessor: 'Programa',
      sort: true,
  },
  {
      Header: 'Periodo',
      accessor: 'Periodo',
      sort: true,
  },{
      Header: 'Femenino',
      accessor: 'F',
      sort: true,
  },
  {
    Header: 'Masculino',
    accessor: 'M',
    sort: true,
},
  {
    Header: 'Total',
    accessor: 'Total',
    sort: true,
},
];
const colMatricEstracto = [
  {
    Header: 'Sede',
    accessor: 'Sede',
    sort: false,
},
  {
      Header: 'Programa',
      accessor: 'Programa',
      sort: false,
  },
  {
      Header: 'Periodo',
      accessor: 'Periodo',
      sort: false,
  },{
      Header: '1',
      accessor: '1',
      sort: false,
  },
  {
    Header: '2',
    accessor: '2',
    sort: false,
},  {
    Header: '3',
    accessor: '3',
    sort: false,
},  {
    Header: '4',
    accessor: '4',
    sort: false,
},  {
    Header: '5',
    accessor: '5',
    sort: false,
},  {
    Header: '6',
    accessor: '6',
    sort: false,
},  {
    Header: '7',
    accessor: '7',
    sort: false,
},  {
    Header: '8',
    accessor: '8',
    sort: false,
},
  {
    Header: 'Total',
    accessor: 'Total',
    sort: false,
},
];
export {
  tabItems,
  tabMatriculados,
  colMatricGenero,
  colMatricEstracto,
  tabAdmitidos,
  columItemsPrincipal,
  columTotales,columAdInsMa,
  columnsEstadistInscritos,
  columnsAdmitidos,
  sizePerPageList,
  columItemsMatriculados,
  columFecha
 };
