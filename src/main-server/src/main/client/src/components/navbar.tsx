import {Link} from "@nextui-org/link";
import {
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import {link as linkStyles} from "@nextui-org/theme";
import clsx from "clsx";
import {useLocation} from "react-router-dom";

import {ThemeSwitch} from "./ui/theme-switch";

import {Button} from "@nextui-org/button";

const navbarItemsPreLogin = [
  {label: "Home", href: "/"},
  {label: "Survivor Stories", href: "/survivor-stories"},
  {label: "Support Groups", href: "/support-groups"},
  {label: "Awareness & Prevention", href: "/awareness-prevention"},
  {label: "Myth Busters", href: "/myth-busters"},
  {label: "FAQ", href: "/faq"},
] as const;

const navbarItemsPostLoginForPatient = [
  {label: "Dashboard", href: "/dashboard/p"},
  {label: "My cases", href: "/dashboard/p/cases"},
  {label: "Appointments", href: "/dashboard/p/appointments"},
  {label: "Chat", href: "/dashboard/p/chat"},
  {label: "Questionnaire", href: "/dashboard/p/questionnaire"},
  {label: "Logout", href: "/logout"},
] as const;

const navbarItemsPostLoginForDoctor = [
  {label: "Dashboard", href: "/dashboard"},
  {label: "Survivor Stories", href: "/survivor-stories"},
  {label: "Support Groups", href: "/support-groups"},
  {label: "Awareness & Prevention", href: "/awareness-prevention"},
  {label: "Myth Busters", href: "/myth-busters"},
  {label: "FAQ", href: "/faq"},
] as const;

const navMenuItems = [
  {label: "Home", href: "/"},
  {label: "Survivor Stories", href: "/survivor-stories"},
  {label: "Support Groups", href: "/support-groups"},
  {label: "Awareness & Prevention", href: "/awareness-prevention"},
  {label: "Myth Busters", href: "/myth-busters"},
  {label: "FAQ", href: "/faq"},
];

export const Navbar = () => {
  const location = useLocation();

  return (
      <NextUINavbar maxWidth="xl" position="sticky">
        <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
          <div className="hidden lg:flex gap-4 justify-start ml-2">
            {navbarItemsPreLogin.map((item) => (
                <NavbarItem key={item.href}>
                  <Link
                      className={clsx(
                          linkStyles({
                            color:
                                location.pathname === item.href
                                    ? "foreground"
                                    : "primary",
                          }),
                          "data-[active=true]:text-primary data-[active=true]:font-medium",
                      )}
                      color="foreground"
                      href={item.href}
                  >
                    {item.label}
                  </Link>
                </NavbarItem>
            ))}
          </div>
        </NavbarContent>

        <NavbarContent
            className="hidden sm:flex basis-1/6 sm:basis-full"
            justify="end"
        >
          <NavbarItem className="hidden sm:flex gap-2">
            <Button>Login</Button>
            <ThemeSwitch/>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
          <ThemeSwitch/>
          <NavbarMenuToggle/>
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {navMenuItems.map((item, index) => (
                <NavbarMenuItem key={`${item}-${index}`}>
                  <Link
                      className={clsx(
                          linkStyles({
                            color:
                                location.pathname === item.href
                                    ? "foreground"
                                    : "primary",
                          }),
                          "data-[active=true]:text-primary data-[active=true]:font-medium",
                      )}
                      color="foreground"
                      href={item.href}
                  >
                    {item.label}
                  </Link>
                </NavbarMenuItem>
            ))}
          </div>
        </NavbarMenu>
      </NextUINavbar>
  );
};
