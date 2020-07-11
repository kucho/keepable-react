import React from "react";
import { Link, NavLink } from "react-router-dom";
import styled from "@emotion/styled";

import logo from "../images/logo.png";
import bracketsIcon from "../images/icons/code.svg";
import trashIcon from "../images/icons/trash.svg";

const Container = styled.nav`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 280px;
  flex-shrink: 0;
`;

const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 70px;
  border-bottom: 1px solid #ffffff;
`;

const List = styled.ul`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 100%;
  list-style: none;
`;

const Item = styled.li`
  width: 100%;
  font-size: 18px;
  line-height: 20px;
  color: #ffffff;

  a {
    color: inherit;
    text-decoration: none;
  }
`;

const Section = ({ to, children }) => {
  return (
    <Item>
      <NavLink
        to={to}
        style={{
          width: "100%",
          display: "flex",
          padding: "1rem 1.5rem",
          alignItems: "center",
        }}
        exact
        activeStyle={{ backgroundColor: "#999B9E" }}
      >
        {children}
      </NavLink>
    </Item>
  );
};

const Sidebar = () => {
  return (
    <Container>
      <Logo>
        <Link to="/">
          <img src={logo} width="150" height="34" alt="Keepeable" />
        </Link>
      </Logo>
      <List>
        <Section to="/">
          <img src={bracketsIcon} alt="notes" style={{ marginRight: "10px" }} />
          Notes
        </Section>
        <Section to="/trash">
          <img src={trashIcon} alt="trash" style={{ marginRight: "10px" }} />
          Trash
        </Section>
      </List>
    </Container>
  );
};

export default Sidebar;
