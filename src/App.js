import React, { useState, useEffect } from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Notes from "./pages/Notes";
import Trash from "./pages/Trash";
import Sidebar from "./components/Sidebar";
import { ListNotes } from "./services/notes";
import styled from "@emotion/styled";
import "./App.css";

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  color: #ffffff;
  background: #1d2128;
  min-height: 100%;
  height: max-content;
`;

const Container = styled.div`
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
`;

const Header = styled.header`
  height: 70px;
  display: flex;
  align-items: center;
  width: 100%;
  border-bottom: 1px white solid;
`;

const Content = styled.main`
  flex-grow: 1;
`;

const Title = styled.h1`
  font-size: 18px;
`;

const Page = styled.div`
  flex-grow: 1;
  border-left: 1px solid #d1d1d1;
`;

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, errors } = await ListNotes();
      if (!errors) {
        setNotes(data);
      }
    }
    fetchData();
  }, []);

  return (
    <AppWrapper>
      <Router>
        <Container>
          <Sidebar />
          <Content>
            <Header>
              <Title>{"Welcome to {keepable}"}</Title>
            </Header>
            <Page>
              <Switch>
                <Route path="/trash">
                  <Trash notes={notes} setNotes={setNotes} />
                </Route>
                <Route path="/">
                  <Notes notes={notes} setNotes={setNotes} />
                </Route>
              </Switch>
            </Page>
          </Content>
        </Container>
      </Router>
    </AppWrapper>
  );
}

export default App;
