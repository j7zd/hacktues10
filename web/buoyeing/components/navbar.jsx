"use client"

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";
import { BuoyIcon } from '@/components/buoyIcon';


function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: "Documentation", color: "foreground", href: "#" },
    { label: "Buoys", color: "foreground", href: "/buoys" },
    { label: "Demo", color: "foreground", href: "#" },
    { label: "HTX Team", color: "foreground", href: "https://hacktues.bg/teams/nikva-stoynost" },
    { label: "GitHub", color: "foreground", href: "https://github.com/j7zd/hacktues10" }
  ];


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          {/* <BuoyIcon /> */}
          <Link color="foreground" href="/">
            <p className="font-bold text-inherit">Шамандура със стойност</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Документация
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="/buoys" aria-current="page">
            Шамандури
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="https://hacktues.bg/teams/nikva-stoynost">
            Отборът ни
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Демо</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="https://github.com/j7zd/hacktues10" variant="flat">
            GitHub
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              color={item.color}
              className="w-full"
              href={item.href}
              size="lg"
            >
              {item.label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}

export default NavBar;