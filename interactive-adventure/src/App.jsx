import React from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.jsx";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import SceneReader from "./pages/SceneReader.jsx";
import StoryEditor from "./pages/StoryEditor.jsx";
import StoryList from "./pages/StoryList.jsx";
import Navbar from "./components/Navbar.jsx";

const AppWrapper = () => {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      
        <Router>
        <Layout>
        <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/editor" element={<StoryEditor />} />
            <Route path="/stories" element={<StoryList />} />
            <Route path="/reader/:sceneId" element={<SceneReader />} />
          </Routes>
          </Layout>
        </Router>
      
    </StyledThemeProvider>
  );
};

const App = () => (
  <ThemeProvider>
    <AppWrapper />
  </ThemeProvider>
);

export default App;
