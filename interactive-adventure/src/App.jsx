import React, { Suspense } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext.jsx";
import { StoryProvider } from "./contexts/storyContext.jsx";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GlobalStyles from "./styles/GlobalStyles.jsx";
import Layout from "./components/Layout.jsx";
import Navbar from "./components/Navbar.jsx";
import styled from "styled-components";
import testStory from "./testData.js";
import { Toaster } from "react-hot-toast";

const Home = React.lazy(() => import("./pages/Home"));
const StoryEditor = React.lazy(() => import("./pages/StoryEditor"));
const StoryList = React.lazy(() => import("./pages/StoryList"));
const SceneReader = React.lazy(() => import("./pages/SceneReader"));
const StoryDetails = React.lazy(() => import("./pages/StoryDetails.jsx"))

// import Home from "./pages/Home";
// import StoryEditor from "./pages/StoryEditor";
// import StoryList from "./pages/StoryList";
// import SceneReader from "./pages/SceneReader";

const FullScreenWrapper = styled.main`
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* Ensures it always takes the full height of the viewport */
  width: 100%;       /* Ensures it stretches across the screen */
`;

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
          <Toaster position="bottom-right" />
          <Navbar />
          <ErrorBoundary>
            <Suspense fallback={<div>Loading page...</div>}>
            <StoryProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/editor/:storyId" element={<StoryEditor />} />
                <Route path="/stories" element={<StoryList />} />
                <Route path="/reader/:storyId/:sceneId" element={<SceneReader />} />
                <Route path="story/:storyId" element={<StoryDetails story={testStory} />} />
              </Routes>
              </StoryProvider>
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
