import React, { Suspense } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.jsx";
import Layout from "./components/Layout.jsx";
import Navbar from "./components/Navbar.jsx";

const Home = React.lazy(() => import("./pages/Home"));
const StoryEditor = React.lazy(() => import("./pages/StoryEditor"));
const StoryList = React.lazy(() => import("./pages/StoryList"));
const SceneReader = React.lazy(() => import("./pages/SceneReader"));

// import Home from "./pages/Home";
// import StoryEditor from "./pages/StoryEditor";
// import StoryList from "./pages/StoryList";
// import SceneReader from "./pages/SceneReader";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const AppWrapper = () => {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />

      <Router>
        <Layout>
          <Navbar />
          <ErrorBoundary>
            <Suspense fallback={<div>Loading page...</div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor" element={<StoryEditor />} />
                <Route path="/stories" element={<StoryList />} />
                <Route path="/reader/:sceneId" element={<SceneReader />} />
              </Routes>
            </Suspense>
          </ErrorBoundary>
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
