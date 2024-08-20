
# expressCASADECARNE

**Versão:** 1.0.0  
**Descrição:** API EXPRESS VERCEL DASHBOARD CASA DE CARNES  
**Autor:** Guilherme Bonato  
**Licença:** ISC

## Descrição

Este projeto é uma API desenvolvida com Express para a aplicação "Casa de Carnes", que gerencia usuários, autenticação JWT, e se conecta a um banco de dados MySQL. A API está configurada para ser implantada na Vercel.

## Configuração do Ambiente

1. **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/expresscasadecarne.git
    cd expresscasadecarne
    ```

2. **Instale as dependências:**

    ```bash
    npm install
    ```

## Configuração do Banco de Dados

O banco de dados utilizado neste projeto está configurado conforme os detalhes abaixo:

- **Servidor:** `moab-server.ddns.me`
- **Banco de Dados:** `XMLcasadeCarnes`
- **Usuário:** `moab`
- **Porta:** `3306`

### Configuração no MySQL

1. **Acesse o MySQL:**

    ```bash
    mysql -u moab -p
    ```

2. **Crie o banco de dados e as tabelas:**

    ```sql
    CREATE DATABASE XMLcasadeCarnes;

    USE XMLcasadeCarnes;

    CREATE TABLE usuarios (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        password VARCHAR(255) NOT NULL,
        email VARCHAR(100),
        role ENUM('user', 'admin') DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    ```

