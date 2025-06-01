export interface AppRoute {
  children?: AppRoute[];
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
