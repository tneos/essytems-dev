import {AreaChart, Layers, AppWindow} from "lucide-react";

type NavLink = {
  href: string;
  label: string;
  icon: React.ReactNode;
};

const links: NavLink[] = [
  {
    href: "/add-employee",
    label: "add job",
    icon: <Layers />,
  },
  {
    href: "/employees",
    label: "employees",
    icon: <AppWindow />,
  },
  {
    href: "/info",
    label: "info",
    icon: <AreaChart />,
  },
];

export default links;
