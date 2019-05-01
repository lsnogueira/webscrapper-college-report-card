const { getByParentJSON, getByParentPDF, grades } = require('./shared/services/webscrapServices');

(async () => {
  const data = {
    user: `78436`,
    password: `ragnarok1`,
    url: `https://www2.fiap.com.br/Aluno/Boletim`,
    urlLogin: `https://www2.fiap.com.br/`,
    parentName: `.i-content`
  };

  // To get JSON
  await getByParentJSON(data);
  return;
  // To get grade (with navigation)
  await grades(data.user, data.password);
  // To get PDF
  await getByParentPDF(data);
})();
