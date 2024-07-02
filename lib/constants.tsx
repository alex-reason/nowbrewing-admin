import { MdOutlineSpaceDashboard, MdDiscount, MdGroupWork, MdShoppingBasket, MdPeople   } from "react-icons/md";
  
  export const navLinks = [
    {
      url: "/",
      icon: <MdOutlineSpaceDashboard />,
      label: "Dashboard",
    },
    {
      url: "/collections",
      icon: <MdGroupWork />,
      label: "Collections",
    },
    {
      url: "/products",
      icon: <MdDiscount  />,
      label: "Products",
    },
    {
      url: "/orders",
      icon: <MdShoppingBasket  />,
      label: "Orders",
    },
    {
      url: "/customers",
      icon: <MdPeople  />,
      label: "Customers",
    },
  ];