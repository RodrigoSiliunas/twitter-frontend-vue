# Projeto Vue.js de Tweets e Trending Topics

Este projeto é uma aplicação web desenvolvida com Vue 3 e Pinia, para gerenciamento de estado, utilizando JavaScript. A aplicação inclui uma tela de registro, uma tela de login e uma página principal onde são exibidos os últimos tweets e os trending topics. Os usuários autenticados podem também publicar seus próprios tweets.

## Funcionalidades

- **Tela de Registro:** Permite que novos usuários criem uma conta na plataforma.
- **Tela de Login:** Autenticação de usuários com email e senha.
- **Página de Tweets:** Exibição dos tweets mais recentes dos usuários, com a possibilidade de publicar novos tweets.
- **Trending Topics:** Exibição dos tópicos mais comentados no momento. As hashtags mais utilizadas.

## Tecnologias Utilizadas

- **Vue 3:** Framework JavaScript progressivo para construção de interfaces de usuário.
- **Pinia:** Biblioteca para gerenciamento de estado global no Vue, utilizada para armazenar dados como tokens de autenticação e informações do usuário.
- **JavaScript:** Utilizado para a lógica de negócios e manipulação de dados.

## Notas Importantes

Este projeto foi desenvolvido como um freelance simples para um projeto de faculdade, o meu contratante me permitiu publicar para manter o GitHub ativo. Estou ciente de que muitas práticas utilizadas aqui podem não ser ideais, como a falta de segurança na proteção de dados sensíveis, a ausência de testes automatizados, a arquitetura ruim. No entanto, a intenção é compartilhar o código para manter meu GitHub ativo e para que um iniciante possa consultar com facilidade o código e visualizar maneiras diferentes de resolver um problema.

## Considerações

- **Segurança:** Embora a autenticação esteja implementada, a aplicação não deve ser considerada segura para produção, especialmente na forma como as credenciais são gerenciadas e armazenadas.
- **Persistência de Dados:** Utilização do Pinia para gerenciamento de estado e armazenamento de dados, com persistência simples via LocalStorage.
- **Experiência do Usuário:** Interface simples para facilitar o uso e o aprendizado.

## Contribuições

Gostaria de agradecer a participação da *Victoria Silva* nesse repositório sendo remunerada por suas primeiras páginas construidas com HTML, CSS e Bootstrap.

## Como Utilizar

1. **Clonar o repositório:**

```bash
git clone https://github.com/RodrigoSiliunas/twitter-frontend-vue.git
cd twitter-frontend-vue
```

2. **Instalar as dependências:**

```bash
yarn
```

3. **Iniciar o servidor:**

```bash
yarn dev
```
