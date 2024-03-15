"use client"

import React from 'react';
import {Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button} from "@nextui-org/react";


function NavBar() {
    return (
        <Navbar shouldHideOnScroll>
      <NavbarBrand>

        <p className="font-bold text-inherit">Шамандура със стойност</p>
      </NavbarBrand>
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
          <Link color="foreground" href="https://github.com/j7zd/hacktues10">
            GitHub
          </Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="https://hacktues.bg/teams/nikva-stoynost">HTX Team</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="primary" href="#" variant="flat">
            Demo
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
    );
}

export default NavBar;