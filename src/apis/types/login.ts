export interface IRouter {
  alwaysShow: boolean;
  children: IRouter[];
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
