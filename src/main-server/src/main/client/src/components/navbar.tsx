import { Image } from "@nextui-org/image";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import { link as linkStyles } from "@nextui-org/theme";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/button";

import { ThemeSwitch } from "./ui/theme-switch";

import Link from "@/components/util/link";
import { useAuth } from "@/contexts/auth-context";

const navbarItemsPreLogin = [
  { label: "Home", href: "/" },
  { label: "Survivor Stories", href: "/survivor-stories" },
  { label: "Support Groups", href: "/support-groups" },
  { label: "Awareness & Prevention", href: "/awareness-prevention" },
  { label: "Myth Busters", href: "/myth-busters" },
  { label: "FAQ", href: "/faq" },
  { label: "Sitemap", href: "/sitemap" },
];

const navbarItemsPostLoginForPatient = [
  { label: "Dashboard", href: "/dashboard/patient" },
  { label: "My cases", href: "/dashboard/patient/cases" },
  { label: "Appointments", href: "/dashboard/patient/appointments" },
  { label: "Chat", href: "/dashboard/patient/chat" },
  { label: "Questionnaire", href: "/dashboard/patient/questionnaire" },
  { label: "Sitemap", href: "/sitemap" },
];

const navbarItemsPostLoginForDoctor = [
  { label: "Dashboard", href: "/dashboard/doctor" },
  { label: "Survivor Stories", href: "/survivor-stories" },
  { label: "Support Groups", href: "/support-groups" },
  { label: "Awareness & Prevention", href: "/awareness-prevention" },
  { label: "Myth Busters", href: "/myth-busters" },
  { label: "FAQ", href: "/faq" },
  { label: "Sitemap", href: "/sitemap" },
];

export default function Navbar() {
  const location = useLocation();
  const auth = useAuth();
  const navigate = useNavigate();

  let navbarItemsToRender: { label: string; href: string }[];

  switch (auth.status) {
    case "loading":
    case "unauthenticated":
      navbarItemsToRender = navbarItemsPreLogin;
      break;
    case "authenticated":
      navbarItemsToRender =
        auth.user.role === "PATIENT"
          ? navbarItemsPostLoginForPatient
          : navbarItemsPostLoginForDoctor;
      break;
  }

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarBrand as={Link} className="gap-2" href="/">
        <Image
          classNames={{ wrapper: "size-[3.1rem] rounded-full" }}
          src="/logo.webp"
        />
        <p className="font-bold text-black leading-tight">
          Cervical <br /> Buddy
        </p>
      </NavbarBrand>
      <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
        <div className="hidden lg:flex gap-4 xl:gap-6 justify-start ml-2">
          {navbarItemsToRender.map((item) => (
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
        <NavbarItem className="hidden lg:flex gap-4">
          <ThemeSwitch />
          <Button
            className="text-textPrimary"
            color="primary"
            isLoading={auth.status === "loading"}
            onClick={
              auth.status === "authenticated"
                ? () => auth.logout.mutate()
                : auth.status === "unauthenticated"
                  ? () => navigate("/auth/login")
                  : undefined
            }
          >
            {auth.status === "authenticated"
              ? "Logout"
              : auth.status === "unauthenticated"
                ? "Login"
                : null}
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
        <ThemeSwitch />
        <Button
          className="text-textPrimary"
          color="primary"
          isLoading={auth.status === "loading"}
          onClick={
            auth.status === "authenticated"
              ? () => auth.logout.mutate()
              : auth.status === "unauthenticated"
                ? () => navigate("/auth/login")
                : undefined
          }
        >
          {auth.status === "authenticated"
            ? "Logout"
            : auth.status === "unauthenticated"
              ? "Login"
              : null}
        </Button>
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {navbarItemsToRender.map((item, index) => (
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
}
