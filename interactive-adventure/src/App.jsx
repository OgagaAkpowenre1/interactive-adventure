import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { ThemeProvider, useTheme } from './contexts/ThemeContext.jsx';
import GlobalStyles from './styles/GlobalStyles.jsx';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';

const AppWrapper = () => {
  const { theme } = useTheme();

  return (
    <StyledThemeProvider theme={theme}>
      <GlobalStyles />
      <Layout>
        <Home />
      </Layout>
    </StyledThemeProvider>
  );
};

const App = () => (
  <ThemeProvider>
    <AppWrapper />
  </ThemeProvider>
);

export default App;
