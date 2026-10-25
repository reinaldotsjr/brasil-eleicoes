# Brasil Eleições

Web app responsivo (Next.js) para acompanhamento de dados oficiais do TSE. **Protótipo inicial: não publicado e não validado contra o JSON ao vivo.**

## Executar
`npm install` e `npm run dev`.

Configure `TSE_JSON_URL` no ambiente com URL HTTPS validada do domínio `resultados.tse.jus.br`. O servidor valida o domínio e repassa o JSON sem armazenamento. Atualização da interface: 5 segundos. Para produção, hospedar em serviço que suporte Next.js (Node). **Atenção:** a interface usa campos provisórios (`cand`, `pst`); conferir esquema real do JSON antes de confiar nos percentuais. Não há alertas push, projeções nem histórico nesta versão.

## Codex — próximas tarefas
1. Confirmar o endpoint e esquema oficiais de 2026 com testes de fixtures.
2. Normalizar candidatos, votos válidos, seções e timestamps.
3. Criar gráfico de evolução e histórico persistente.
4. Implementar notificações e PWA com consentimento.
5. Testar Android e publicar com HTTPS.
