const gp = require('./shared/services/getByParent');
const gf = require('./shared/services/getByFields');

(async () => {
  const data = {
    user: `78436`,
    password: `ragnarok1`,
    url: `https://www2.fiap.com.br/Aluno/Boletim`,
    urlLogin: `https://www2.fiap.com.br/`,
    parentName: `.i-content`
  };
  await gp.getByParentJSON(data);
})();
