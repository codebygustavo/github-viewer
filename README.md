# GitHub User Viewer

Bem-vindo ao GitHub User Finder, uma ferramenta que permite buscar usuários do GitHub utilizando a API da plataforma. Este projeto é desenvolvido para fornecer informações detalhadas sobre um usuário, incluindo seu nome, foto de perfil, descrição, número de seguidores, número de pessoas que ele está seguindo e a lista de seus repositórios públicos.

### Funcionalidades Principais

1. **Busca de Usuários**
   - Através da API do GitHub, é possível buscar usuários fornecendo seus nomes de usuário.

2. **Detalhes do Usuário**
   - Uma vez encontrado o usuário, o sistema exibe informações detalhadas, incluindo:
     - Nome
     - Foto de Perfil
     - Descrição
     - Número de Seguidores
     - Número de Pessoas Seguidas
     - Lista de Repositórios Públicos

3. **Validação de Existência do Usuário**
   - Antes de exibir as informações, o sistema valida se o usuário realmente existe no GitHub.

4. **Verificação de Repositórios**
   - O sistema verifica se o usuário possui repositórios públicos. Se sim, lista-os; caso contrário, indica que o usuário não tem repositórios.

#### Recursos Principais
Design Responsivo
A interface é projetada para se adaptar a diferentes tamanhos de tela, garantindo uma experiência consistente em dispositivos desktop, tablets e smartphones.

#### Busca dinamica
Implementamos um input de busca dinamica, que requisita a API do GitHub

### como usar

Ariar o arquivo de index.js

```bash
tsc .\index.ts

```

Após, basta abrir o arquivo index.html.