const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const app = express();
let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
];

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

app.use(express.json());
app.use(cors());

morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :total-time[3] ms :body'));

app.get('/info', (req, res) => {
  res.send(`Phonebook has info for ${persons.length} people\n${new Date()}`);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((p) => p.id === id);

  if (!person) return res.status(404).end();
  res.send(person);
});

app.post('/api/persons', (req, res) => {
  const { name, number } = req.body;
  if (!name || !number) {
    return res.status(400).send({ error: 'fill all fields' });
  }

  if (persons.find((p) => p.name === name || p.number === number)) {
    return res.status(400).send({ error: 'name and number must be unique' });
  }
  const person = { name, number, id: getRandomInt(999999) };
  persons = persons.concat(person);
  res.send(person);
});

app.use(unknownEndpoint);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Listening on', PORT);
});
