const { getByParentJSON, getByParentPDF, grades } = require('./services/webscrapServices');

(async () => {
  const data = {
    user: `YOUR_LOGIN`,
    password: `YOUR_PASSWORD`,
    url: `https://www2.fiap.com.br/Aluno/Boletim`,
    urlLogin: `https://www2.fiap.com.br/`,
    parentName: `.i-content`
  };

  // To get JSON
  await getByParentJSON(data);
  // To get grade (with navigation)
  await grades(data.user, data.password);
  // To get PDF
  await getByParentPDF(data);
})();
