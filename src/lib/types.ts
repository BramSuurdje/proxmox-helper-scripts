export type ScriptProps = {
  scriptID: string;
};

export type Script = {
  title: string;
  description: string;
  documentation: string;
  website: string;
  logo: string;
  created: string;
  updated: string;
  id: string;
  item_type: string;
  interface: string;
  port: number;
  post_install: string;
  default_cpu: string;
  default_hdd: string;
  default_ram: string;
  isUpdateable: boolean;
  isMostViewed: boolean;
  privileged: boolean;
  alpineScript: alpine_script;
  installCommand: string;
  expand: {
    alpine_script: alpine_script;
    alerts: alerts[];
    default_login: default_login;
  };
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
