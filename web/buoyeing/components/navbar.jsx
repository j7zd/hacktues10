"use client"

import React from 'react';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem, Link, Button } from "@nextui-org/react";


function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    {label: "Documentation", color: "foreground", href: "#"},
    {label: "Buoys", color: "foreground", href: "#"},
    {label: "Demo", color: "foreground", href: "#"},
    {label: "HTX Team", color: "foreground", href: "https://hacktues.bg/teams/nikva-stoynost"},
    {label: "GitHub", color: "foreground", href: "https://github.com/j7zd/hacktues10"}
  ];


  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <p className="font-bold text-inherit">Шамандура със стойност</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Documentation
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#" aria-current="page">
            Buoys
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="https://hacktues.bg/teams/nikva-stoynost">
            HTX Team
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Demo</Link>
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