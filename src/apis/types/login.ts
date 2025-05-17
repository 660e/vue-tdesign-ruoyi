export interface IRoute {
  children?: IRoute[];
  component: string;
  hidden: boolean;
  meta: {
    icon: string;
    link: string;
    title: string;
  };
  name: string;
  path: string;
}
