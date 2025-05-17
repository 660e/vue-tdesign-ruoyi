export interface IRoute {
  alwaysShow: boolean;
  children: IRoute[];
  component: string;
  hidden: boolean;
  meta: {
    icon: string;
    link: string;
    noCache: boolean;
    title: string;
  };
  name: string;
  path: string;
  redirect: string;
}
