import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { VscArrowCircleLeft, VscArrowLeft, VscTools } from "react-icons/vsc";

import {
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineUsers,
} from "react-icons/hi2";
import { BiMessage, BiPurchaseTag } from "react-icons/bi";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
`;

function MainNav() {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/equipments">
            <VscTools />
            <span>Equipments</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/purchase-requests">
            <BiPurchaseTag />
            <span>Buy Requests</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/sell-requests">
            <VscArrowCircleLeft style={{ rotate: "-45deg" }} />
            <span>Sell Requests</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/layout">
            <HiOutlineCog6Tooth />
            <span>Layout</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/inbox">
            <BiMessage />
            <span>Messages</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users">
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
