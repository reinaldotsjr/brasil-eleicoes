'use client';
import {useEffect,useState} from 'react';
import './style.css';
type Data={ok:boolean;data?:any;error?:string;updatedAt?:string};
export default function Home(){
 const [result,setResult]=useState<Data|null>(null),[checked,setChecked]=useState(''),[clock,setClock]=useState('');
 useEffect(()=>{let active=true;async function poll(){try{const response=await fetch('/api/results',{cache:'no-store'});const json=await response.json();if(active){setResult(json);setChecked(new Date().toLocaleTimeString('pt-BR'));}}catch(e){if(active)setResult({ok:false,error:String(e)});}}poll();const id=setInterval(poll,5000);const tick=()=>setClock(new Date().toLocaleTimeString('pt-BR',{hour:'2-digit',minute:'2-digit'}));tick();const timer=setInterval(tick,10000);return()=>{active=false;clearInterval(id);clearInterval(timer)}},[]);
 const d=result?.data;const candidates=Array.isArray(d?.cand)?d.cand:[];const valid=candidates.map((c:any)=>({name:String(c.nm||c.n||'Candidato'),percent:String(c.pvap||c.pv||'—'),votes:String(c.vap||c.v||'—')}));const progress=d?.pst??null;
 return <main className="shell"><div className="orb orbOne"/><div className="orb orbTwo"/><div className="content">
 <header className="top"><div className="brand"><div className="brandMark">✦</div><div><div className="brandTitle">BRASIL<span>ELEIÇÕES</span></div><small>INTELIGÊNCIA ELEITORAL</small></div></div><div className="clock">{clock}<small>HORÁRIO DE BRASÍLIA</small></div></header>
 <div className="eyebrow"><span className="liveDot"/> PAINEL DE ACOMPANHAMENTO <span className="pill">2026 · 2º TURNO</span></div>
 <h1>O Brasil <em>decide.</em></h1><p className="subtitle">Acompanhe a totalização presidencial diretamente da fonte oficial, com clareza e transparência.</p>
 <section className="glass hero"><div className="sectionTop"><div><span className="kicker">RESULTADO NACIONAL</span><h2>Presidência da República</h2></div><span className={'status '+(result?.ok?'good':'pending')}><i/>{result?.ok?'Fonte conectada':result?'Aguardando fonte':'Conectando'}</span></div>
 <div className="candidateGrid">{[0,1].map(i=>{const c=valid[i];return <div className="candidate" key={i}><div className="candidateMeta"><span className={'avatar avatar'+i}>{i===0?'01':'02'}</span><span>{c?.name||'Aguardando dados'}</span></div><div className="bigNumber">{c?.percent||'—'}<span>{c?.percent&&c.percent!=='—'?'%':''}</span></div><div className="votes">{c?.votes&&c.votes!=='—'?c.votes+' votos':'Dados oficiais pendentes'}</div></div>})}</div>
 <div className="barTrack"><div className="barFill" style={{width:valid[0]&&Number.isFinite(Number(valid[0].percent.replace(',','.')))?valid[0].percent.replace(',','.')+'%':'50%'}}/></div><div className="barLabels"><span>● CANDIDATO 01</span><span>CANDIDATO 02 ●</span></div>
 </section>
 <div className="stats"><section className="glass stat"><span className="kicker">SEÇÕES TOTALIZADAS</span><div className="statValue">{progress===null?'—':progress+'%'}</div><div className="micro">Progresso informado pelo TSE</div></section><section className="glass stat"><span className="kicker">ÚLTIMA CONSULTA</span><div className="statValue">{checked||'—'}</div><div className="micro">Nova consulta a cada 5 segundos</div></section></div>
 <section className="glass info"><div className="infoIcon">↗</div><div><h3>Transparência em tempo real</h3><p>{result?.error||'Este painel apresenta dados recebidos do TSE. Não calcula projeções de vitória.'}</p></div></section>
 <footer><span>BRASIL ELEIÇÕES <b>·</b> 2026</span><span>PROJETO INDEPENDENTE · FONTE: TSE</span></footer>
 </div></main>
}