import {NextRequest,NextResponse} from 'next/server';
export const dynamic='force-dynamic';
const UFS=['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
const ELECTION='6258';
export async function GET(request:NextRequest){
 const uf=(request.nextUrl.searchParams.get('uf')||'BR').toUpperCase();
 if(uf!=='BR'&&!UFS.includes(uf))return NextResponse.json({ok:false,error:'UF inválida'},{status:400});
 const slug=uf.toLowerCase();
 const source=`https://resultados.tse.jus.br/oficial/ele2026/${ELECTION}/dados/${slug}/${slug}-c0001-e006258-u.json`;
 try{
  const response=await fetch(source,{next:{revalidate:10},signal:AbortSignal.timeout(8000)});
  if(!response.ok)throw new Error(`Fonte TSE indisponível (HTTP ${response.status})`);
  const data=await response.json();
  return NextResponse.json({ok:true,uf,data,updatedAt:new Date().toISOString()},{headers:{'Cache-Control':'public, s-maxage=10, stale-while-revalidate=20'}});
 }catch(error){
  return NextResponse.json({ok:false,uf,error:error instanceof Error?error.message:'Falha de consulta'},{status:502});
 }
}
