import type { ReactNode } from 'react';
export const metadata = {title:'Brasil Eleições | Monitor TSE',description:'Painel independente de resultados oficiais'};
export default function Layout({children}:{children:ReactNode}){return <html lang="pt-BR"><body style={{margin:0,fontFamily:'system-ui, sans-serif',background:'#091323',color:'#fff'}}>{children}</body></html>}