export type ScriptProps = {
  scriptID: string;
};

export type Script = {
  scriptID: string;
  title: string;
  description: string;
  installCommand: string;
  logo: string;
  updated: string;
  created: string;
  default_cpu: string;
  default_ram: string;
  default_hdd: string;
  port: number;
  item_type: string;
  website: string;
  documentation: string;
  isUpdateable: boolean;
  post_install: string;
  hasAlpineScript: boolean;
  alpineScript: string;
  alpine_default_cpu: string;
  alpine_default_ram: string;
  alpine_default_hdd: string;
  alert1: string;
  alert2: string;
  alert3: string;
};

export interface Category {
  id: string;
  Catagory_Title: string;
  Items: Script[];
}

export type Scripts = {
  id: string;
  title: string;
  logo: string;
};
