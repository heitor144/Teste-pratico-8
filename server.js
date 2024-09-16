const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const SECRET_KEY = 'heitor';

// Rota para gerar JWT
app.post('/jwt/auth', (req, res) => {
  const { username, password } = req.body;

  if (username && password) {
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(400).json({ error: 'Usuário ou senha inválidos' });
  }
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get('/jwt/metodosHttp', authenticateToken, (req, res) => {
  res.json({
    get: {
      objetivo_principal: 'Recuperar informações',
      limite_caracteres: 'Sem limite específico',
      aceita_https: 'Sim',
      aceita_http: 'Sim',
    },
    post: {
      objetivo_principal: 'Enviar informações',
      limite_caracteres: 'Sem limite específico',
      aceita_https: 'Sim',
      aceita_http: 'Sim',
    },
    put: {
      objetivo_principal: 'Atualizar informações',
      limite_caracteres: 'Sem limite específico',
      aceita_https: 'Sim',
      aceita_http: 'Sim',
    },
    patch: {
      objetivo_principal: 'Atualizar parcialmente informações',
      limite_caracteres: 'Sem limite específico',
      aceita_https: 'Sim',
      aceita_http: 'Sim',
    },
    delete: {
      objetivo_principal: 'Excluir informações',
      limite_caracteres: 'Sem limite específico',
      aceita_https: 'Sim',
      aceita_http: 'Sim',
    },
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
