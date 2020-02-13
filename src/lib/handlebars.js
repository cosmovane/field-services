const handlebars = require('handlebars')

handlebars.registerHelper('json', (content) => {
    return JSON.stringify(content);
  });
  
