express = require('express');
app = express();

path = require('path')
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', __dirname + "/views");
app.set('view engine', 'ejs');

app.set('port', 8082);

metrics = require('./metrics.js');

/*
app.get('/', function (req, res) {
    // GET
});

app.post('/', (req, res) => {
    // POST
});

app
    .put('/', function (req, res) {
        // PUT
    })
    .delete('/', (req, res) => {
        // DELETE
    });
*/

app.get(
    '/hello',
    (req, res) => {
        process.stdout.write("Hello");
        const name = req.query.name;
        res.status(200).render('hello.ejs', {name: req.query.name});
    }
);

app.get(
    '/',
    (req, res) => {
        res.status(200)
            .send('<p>Root page</p>');
        process.stdout.write("Hey");
    }
);

app.get('/metrics.js', (req, res) => {
    metrics.get((err, data) => {
        process.stdout.write("path");
        if(err) throw err
        res.status(200).json(data)
    })
})

app.listen(
    app.get('port'),
    () => console.log(`server nlistening on ${app.get('port')}`)
);