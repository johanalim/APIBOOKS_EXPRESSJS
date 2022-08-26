const express = require('express');
const app = express();
app.use(express.json())
const port = '6060';
const books = [
    {title:'Detektif Conan 98',description:'Gara-gara usahanya menyelidiki Ai Haibara, Masumi Sera malah harus berhadapan dengan Subaru Okiya!',id:1},
    {title:'One Piece 97',description:'“KITAB SUCIKU” Pengkhianatan Kanjuro yang terungkap tepat sebelum penyerbuan',id:2},
    {title:'Tempat Paling Liar di Muka Bumi',description:'Aku ingin menjadi tenang dan mencintaimu tanpa banyak kekhawatiran. Sekali lagi kita menemukan asin laut',id:3},
    {title:'Demon Slayer: Kimetsu No Yaiba 05',description:'Tanjiro Dkk. akhirnya beranjak menuju Gunung Natagumo dan bertarung begitu alot melawan keluarga iblis laba-laba penghuni gunung tersebut!',id:4},
    {title:'Tanya Jawab Seru Tentang Tumbuhan',description:'Kenapa Lebah memiliki keranjang di kakinya?',id:5}
]

app.get('/',(req,resp) =>{
    resp.send('Welcome to gramedia');
})
app.get('/api/books',(req,resp) =>{
    resp.send(books);
})
app.get('/api/books/:id',(req,resp) =>{
    const book = books.find(v => v.id === parseInt(req.params.id));
    if(!book) resp.status(404).send('Book Not Found');
    resp.send(book);
})
app.post('/api/books/addBook',(req,resp) =>{
    const book = {
        id: books.length+1,
        title: req.body.title,
        description: req.body.description,
    }
    books.push(book);
    resp.send(book);
})
app.put('/api/books/:id',(req,resp) => {
    const book = books.find(v => v.id === parseInt(req.params.id));
    if(!book) resp.status(404).send('book not found');
    
    book.title = req.body.title;

    resp.send(book);
})
app.delete('/api/books/:id', (req, res) => {
    const book = books.find(v => v.id === parseInt(req.params.id));
    if(!book) resp.status(404).send('delete failed');
    const index = books.indexOf(book);
    books.splice(index,1);
    resp.send(book);
})
app.listen(port);