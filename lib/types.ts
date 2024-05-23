export type ScriptProps = {
  scriptID: string;
};

export type Script = {
  alert1: string;
  alert2: string;
  alert3: string;
  alpineScript: string;
  alpine_default_cpu: string;
  alpine_default_hdd: string;
  alpine_default_ram: string;
  collectionId: string;
  collectionName: string;
  created: string;
  default_cpu: string;
  default_hdd: string;
  default_ram: string;
  description: string;
  documentation: string;
  hasAlpineScript: boolean;
  id: string;
  installcommand: string;
  isUpdateable: boolean;
  item_type: string;
  logo: string;
  port: number;
  post_install: string;
  title: string;
  updated: string;
  website: string;
  isMostViewed: boolean;
  mostViewedPosition: number;
};

export interface Category {
  catagoryName: string;
  collectionId: string;
  collectionName: string;
  created: string;
  expand: {
    items: Script[];
  };
};

export type Scripts = {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  items: Category[];
};
