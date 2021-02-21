import express from 'express';
import consign from 'consign';
const app = express();


consign({
    cwd: __dirname
})
.include('libs/config.js')
.then('db.js')
.then('libs/middlewares.js')
.then('routes')
.then('libs/boot.js')
.into(app)
//settings
app.set('port', process.env.PORT || 9000);

app.listen(app.get('port'), () => {
    console.log('servidor en puerto', app.get('port'));
});