export interface ChangesInfo {
    version: string;
    date: string;
    added: string[];
    fixed: string[];
  }

  export interface ApplicationInfo {
    name: string;
    description?: string;
    emailInfo?: {
      email: string;
      description: string;
    }[];
    phones?: {
      number: string;
      exts: string[];
      description: string;
    }[];
    entity: string;
    changesInfo: ChangesInfo[];
  }

  export const appInfo: ApplicationInfo = {
    name: ' Sistema Integral de Recursos Humanos',
    description: '2025',
    emailInfo: [
      {
        email: '',
        description: ''
      },

    ],
    phones: [
      {
        number: '228 841 7700',
        exts: ['7002'],
        description: ''
      },
    ],
    entity: 'Secretaría de Educación de Veracruz',
    changesInfo: [
      {
        version: '1.0.0',
        date: '1 de abril de 2023',
        added: [
          'Liberación de la primera versión'
        ],
        fixed: []
      }
    ]
  };
