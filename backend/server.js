const express = require('express');
const app = express();

app.set('port', process.env.PORT || 3000);

app.get('/',function(req,res){
	//res.send('Welcome to my site.'+app.get('port'));
	res.write('<h1>Welcome</h1>');
	res.write('<p>Worwideweb, the best website in the world</p>');
	res.end()
})

app.listen(app.get('port'),function(req,res){
	console.log('Welcome listening on the port ' + app.get('port'))
});