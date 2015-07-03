   var stream = require('../');
   var vueamd = new stream();

   process.stdin
       .pipe(vueamd)
       .pipe(process.stdout);
