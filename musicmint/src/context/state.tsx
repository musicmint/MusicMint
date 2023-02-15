import { createContext, useContext, useState } from 'react';

const initialContext = 
{ state: 
  { 
    darkMode: true, 
  },
  actions: 
  { 
    setDarkMode: (theme: boolean) => {},
  },
}
const AppContext = createContext(initialContext);

export default AppContext;

export function AppWrapper({ children }) {
  let [dark, setDark] = useState(()=> typeof window !== 'undefined' && localStorage.getItem('theme') ? (localStorage.getItem('theme')=="dark" ? true : false): false)


  // true - dark mode;  false - light mode
  let setDarkMode = function (theme: boolean) {
    state.darkMode = theme
    setDark(theme)
    console.log(`Changed Theme to: ${state.darkMode}`)
    localStorage.setItem('theme', theme ? "dark" : "light")
  };

  let state = {darkMode: dark}
  let setState = {setDarkMode: setDarkMode}

  let context = {state: state, actions: setState}

  return (
    <AppContext.Provider value={context}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}