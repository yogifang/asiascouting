import { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppWrapper({ children }) {
  const [member, setMember] = useState('');
  const [sportItem, setSportItem] = useState('baseball');

  console.log('AppContext.............');
  console.log(member);
  let sharedState = { member, setMember, sportItem, setSportItem };
  return <AppContext.Provider value={sharedState}>{children}</AppContext.Provider>;
}
export function useAppContext() {
  return useContext(AppContext);
}
