function errorHandler(err, req, res, next) {
  // Verifica se o erro é do tipo SyntaxError (erro de sintaxe no JSON enviado)
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ error: 'Erro de sintaxe no JSON enviado' });
  }

  // Outros tipos de erros
  console.error(err.stack);
  res.status(500).json({ error: 'Erro interno do servidor' });

  next();
}

module.exports = {
  errorHandler,
};
