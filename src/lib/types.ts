export type ScriptProps = {
  scriptID: string;
};

export type Script = {
  alert1: string;
  alert2: string;
  alert3: string;
  alpineScript: alpine_script;
  collectionId: string;
  collectionName: string;
  created: string;
  default_cpu: string;
  default_hdd: string;
  default_ram: string;
  description: string;
  documentation: string;
  id: string;
  expand: {
    alpine_script: alpine_script;
    alerts: alerts[];
    default_login: default_login;
  };
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
  interface: string;
  privileged: boolean;
};

type alpine_script = {
  installCommand: string;
  default_cpu: string;
  default_hdd: string;
  default_ram: string;
};

type alerts = {
  content: string;
};

type default_login = {
  username: string;
  password: string;
};

export interface Category {
  catagoryName: string;
  collectionId: string;
  collectionName: string;
  id: string;
  created: string;
  expand: {
    items: Script[];
  };
}
