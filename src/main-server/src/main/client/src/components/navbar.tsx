import {Button} from "@nextui-org/button";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/dropdown";
import {Image} from "@nextui-org/image";
import {
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Navbar as NextUINavbar,
} from "@nextui-org/navbar";
import {link as linkStyles} from "@nextui-org/theme";
import clsx from "clsx";
import {useLocation, useNavigate} from "react-router-dom";
import {Avatar} from "@nextui-org/avatar";

import {ThemeSwitch} from "./ui/theme-switch";

import Link from "@/components/util/link";
import {useAuth} from "@/contexts/auth-context";

const navbarItemsPreLogin = [
  {label: "Home", href: "/"},
  {label: "Cancer Prediction", href: "/questionnaire"},
  {label: "Survivor Stories", href: "/survivor-story"},
  {label: "Support Groups", href: "/support-groups"},
  {label: "Awareness & Prevention", href: "/awareness-prevention"},
  {label: "Myth Busters", href: "/myth-busters"},
  {label: "FAQ", href: "/faq"},
];

const navbarItemsPostLoginForPatient = [
  {label: "Dashboard", href: "/dashboard/patient"},
  {label: "My cases", href: "/dashboard/patient"},
  {
    label: "Appointments",
    href: "/dashboard/patient/medical-case/current?entitiesTab=appointments#entities",
  },
  {
    label: "Chat",
    href: "/dashboard/patient/medical-case/current?entitiesTab=chat#entities",
  },
  {label: "Questionnaire", href: "/dashboard/patient/questionnaire/respond"},
];

const navbarItemsPostLoginForDoctor = [
  {label: "Dashboard", href: "/dashboard/doctor"},
  {label: "Survivor Stories", href: "/survivor-story"},
  {label: "Support Groups", href: "/support-groups"},
  {label: "Awareness & Prevention", href: "/awareness-prevention"},
  {label: "Myth Busters", href: "/myth-busters"},
  {label: "FAQ", href: "/faq"},
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
              classNames={{wrapper: "size-[3.1rem] rounded-full"}}
              src="/logo.webp"
          />
          <p className="font-bold leading-tight text-black dark:text-textPrimary">
            HackForHer <br/> Health
          </p>
        </NavbarBrand>
        <NavbarContent className="basis-1/5 sm:basis-full" justify="center">
          <div className="ml-2 hidden justify-start gap-4 lg:flex xl:gap-6">
            {navbarItemsToRender.map((item, idx) => (
                <NavbarItem key={`${item.label}-${idx}`}>
                  <Link
                      className={clsx(
                          linkStyles({
                            color:
                                location.pathname === item.href
                                    ? "foreground"
                                    : "primary",
                          }),
                          "data-[active=true]:font-medium data-[active=true]:text-primary",
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
            className="hidden basis-1/6 sm:flex sm:basis-full"
            justify="end"
        >
          <NavbarItem className="hidden gap-4 lg:flex">
            <ThemeSwitch/>
            {auth.status !== "authenticated" && (
                <Button
                    className="text-textPrimary"
                    color="primary"
                    isLoading={auth.status === "loading"}
                    onClick={
                      auth.status === "unauthenticated"
                          ? () => navigate("/auth/login")
                          : undefined
                    }
                >
                  {auth.status === "unauthenticated" ? "Login" : null}
                </Button>
            )}
            {auth.status === "authenticated" && (
                <NavbarContent as="div" justify="end">
                  <Dropdown placement="bottom-end">
                    <DropdownTrigger>
                      <Avatar
                          isBordered
                          classNames={{
                            name: "text-textPrimary select-none",
                          }}
                          color="primary"
                          name={`${auth.user.firstName[0]}${auth.user.lastName[0]}`}
                      />
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Profile Actions" variant="flat">
                      <DropdownItem key="profile" className="h-14 gap-2">
                        <p className="font-semibold">Signed in as</p>
                        <p className="font-semibold">{auth.user.email}</p>
                      </DropdownItem>
                      <DropdownItem
                          key="profile"
                          href={`/dashboard/${auth.user.role.toLowerCase()}/profile`}
                      >
                        My Profile
                      </DropdownItem>
                      <DropdownItem
                          key="profile-edit"
                          href={`/dashboard/${auth.user.role.toLowerCase()}/profile/edit`}
                      >
                        Edit Profile
                      </DropdownItem>
                      <DropdownItem key="home" href="/">
                        Home
                      </DropdownItem>
                      <DropdownItem key="survivor-story" href="/survivor-story">
                        Survivor Stories
                      </DropdownItem>
                      <DropdownItem key="support-group" href="/support-groups">
                        Support Groups
                      </DropdownItem>
                      <DropdownItem key="awareness" href="/awareness-prevention">
                        Awareness & Prevention
                      </DropdownItem>
                      <DropdownItem key="myth" href="/myth-busters">
                        Myth Busters
                      </DropdownItem>
                      <DropdownItem key="faq" href="/faq">
                        FAQ
                      </DropdownItem>
                      <DropdownItem
                          key="logout"
                          color="danger"
                          onClick={() => auth.logout.mutate()}
                      >
                        Log Out
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </NavbarContent>
            )}
          </NavbarItem>
        </NavbarContent>

        <NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
          <ThemeSwitch/>
          {auth.status !== "authenticated" && (
              <Button
                  className="text-textPrimary"
                  color="primary"
                  isLoading={auth.status === "loading"}
                  onClick={
                    auth.status === "unauthenticated"
                        ? () => navigate("/auth/login")
                        : undefined
                  }
              >
                {auth.status === "unauthenticated" ? "Login" : null}
              </Button>
          )}
          {auth.status === "authenticated" && (
              <NavbarContent as="div" justify="end">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                        isBordered
                        classNames={{
                          name: "text-textPrimary select-none",
                        }}
                        color="primary"
                        name={`${auth.user.firstName[0]}${auth.user.lastName[0]}`}
                    />
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="profile" className="h-14 gap-2">
                      <p className="font-semibold">Signed in as</p>
                      <p className="font-semibold">{auth.user.email}</p>
                    </DropdownItem>
                    <DropdownItem
                        key="settings"
                        href={`/dashboard/${auth.user.role.toLowerCase()}/profile`}
                    >
                      My Profile
                    </DropdownItem>
                    <DropdownItem
                        key="profile-edit"
                        href={`/dashboard/${auth.user.role.toLowerCase()}/profile/edit`}
                    >
                      Edit Profile
                    </DropdownItem>
                    <DropdownItem key="home" href="/">
                      Home
                    </DropdownItem>
                    <DropdownItem key="survivor-story" href="/survivor-story">
                      Survivor Stories
                    </DropdownItem>
                    <DropdownItem key="support-group" href="/support-groups">
                      Support Groups
                    </DropdownItem>
                    <DropdownItem key="awareness" href="/awareness-prevention">
                      Awareness & Prevention
                    </DropdownItem>
                    <DropdownItem key="myth" href="/myth-busters">
                      Myth Busters
                    </DropdownItem>
                    <DropdownItem key="faq" href="/faq">
                      FAQ
                    </DropdownItem>
                    <DropdownItem
                        key="logout"
                        color="danger"
                        onClick={() => auth.logout.mutate()}
                    >
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </NavbarContent>
          )}
          <NavbarMenuToggle/>
        </NavbarContent>

        <NavbarMenu>
          <div className="mx-4 mt-2 flex flex-col gap-2">
            {navbarItemsToRender.map((item, index) => (
                <NavbarMenuItem key={`${item.label}-${index}`}>
                  <Link
                      className={clsx(
                          linkStyles({
                            color:
                                location.pathname === item.href
                                    ? "foreground"
                                    : "primary",
                          }),
                          "data-[active=true]:font-medium data-[active=true]:text-primary",
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
