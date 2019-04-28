const gp = require('./shared/services/getByParent');
const gf = require('./shared/services/getByFields');

(async () => {
  const user = `YOUR_USER`;
  const password = `YOUR_PASSWORD`;
  await gp.notes(user, password);
})();
