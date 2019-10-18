const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const categories = [
  {
    id: 1,
    name: 'Przeniczne'
  },
  {
    id: 2,
    name: 'Porter'
  },
  {
    id: 3,
    name: 'Lager'
  },
  {
    id: 4,
    name: 'IPA'
  }
];

let beers = [
  {
    id: 1,
    createdAt: '2019-01-01',
    title: 'Olsztyńskie',
    description: '',
    categoryId: 3,
    breweryId: 2,
    pasteurized: true,
    alcohol: 4.5,
    imageUrl: 'http://localhost:3000/images/swieze.png',
    elementsId: [1, 2, 3],
    commentsId: []
  },
  {
    id: 2,
    createdAt: '2019-03-11',
    title: 'Świeże',
    description: 'Mieszkańcy naszego regionu emigrując do Zagłębia Ruhry stworzyli piwa dortmundzkie. Ich smak wywieźli z rodzinnych stron. Piwo Świeże jest właśnie takim piwem – lekko słodkawym i jasnym. Piwo po procesie warzenia i fermentacji jest długo lagero- wane (leżakowane w zbiorniku w temperaturze bliskiej 0°C). Wszystko to składa się na delikatny smak, słodowo-chmielowy bukiet, wysoką klarowność i odpowiednie nasycenie dwutlenkiem węgla. Brak pasteryzacji pozwala na zachowanie wszystkich jego walorów. Aby uzyskać piwo o powtarzalnym smaku w czasie filtracji miesza się piwa z różnych leżaków – piwowar próbuje i tak dobiera proporcje aby było zawsze tak samo doskonałe. Świeże przez swą wysoką pijalność jest doskonałym zwieńczeniem dnia po ciężkiej pracy.',
    categoryId: 3,
    breweryId: 2,
    pasteurized: false,
    alcohol: 7.0,
    imageUrl: 'http://localhost:3000/images/swieze.png',
    elementsId: [1, 2, 3, 4],
    commentsId: [1, 2, 3, 4]
  },
  {
    id: 3,
    createdAt: '2019-05-23',
    title: 'Porter Warmiński',
    description: '',
    categoryId: 2,
    breweryId: 2,
    pasteurized: true,
    alcohol: 9.0,
    imageUrl: 'http://localhost:3000/images/swieze.png',
    elementsId: [1, 2, 5, 6, 7, 8],
    commentsId: []
  },
  {
    id: 4,
    createdAt: '2019-10-01',
    title: 'Akademickie Łódzkie Klasyczne',
    description: '',
    categoryId: 3,
    breweryId: 3,
    pasteurized: true,
    alcohol: 5.0,
    imageUrl: 'http://localhost:3000/images/swieze.png',
    elementsId: [1, 2, 3],
    commentsId: []
  },
  {
    id: 5,
    createdAt: '2019-06-07',
    title: 'Raciborskie Belgian IPA',
    description: '',
    categoryId: 4,
    breweryId: 3,
    pasteurized: true,
    alcohol: 5.8,
    imageUrl: 'http://localhost:3000/images/swieze.png',
    elementsId: [1, 2, 8, 9],
    commentsId: []
  }
];

const elements = [
  {
    id: 1,
    name: 'Woda'
  },
  {
    id: 2,
    name: 'Chmiel'
  },
  {
    id: 3,
    name: 'Słód jęcznienny'
  },
  {
    id: 4,
    name: 'Drożdże piwowarskie'
  },
  {
    id: 5,
    name: 'Drożdże'
  },
  {
    id: 6,
    name: 'Słód jęcznienny pilzeński'
  },
  {
    id: 7,
    name: 'Słód jęcznienny karmelowy'
  },
  {
    id: 8,
    name: 'Słód jęcznienny jasny'
  },
  {
    id: 9,
    name: 'Słód przeniczny'
  },
];

const breweries = [
  {
    id: 1,
    name:  'PINTA',
    beersId: []
  },
  {
    id: 2,
    name: 'Kormoran',
    beersId: [1, 2, 3]
  },
  {
    id: 3,
    name: 'Browar Zamkowy',
    beersId: [4, 5]
  }
];

const comments = [
  {
    id: 1,
    beerId: 2,
    author: 'Stachu',
    content: 'Gdyby Jezus tego spróbował to nie zamieniał by wody w wino tylko w Świeże'
  },
  {
    id: 2,
    beerId: 2,
    author: 'Janusz',
    content: 'Zacny popitek'
  },
  {
    id: 3,
    beerId: 2,
    author: 'Grażyna',
    content: 'Najlepszy polski strong lager'
  },
  {
    id: 4,
    beerId: 2,
    author: 'Mieczysław',
    content: 'Zapach zbożowy, kolor bursztyn, gęsta piana. W smaku słód z dobrą konkretną goryczką, lekkie masło. Jeśli wierzyć producentowi to jest to wariacja dortmunder export i faktycznie do Dab jest podobny.'
  }
];

app.get('/categories/:id', (req, res) => {
  res.json(categories.find(c => c.id === +req.params.id));
});

app.get('/categories', (req, res) => {
  res.json(categories);
});

function getBeersComposed() {
  return [...beers].map(beer => {
    const beerModified = {...beer};
    beerModified.brewery = {...[...breweries].find(b => b.id === beerModified.breweryId)};
    delete beerModified.brewery.beersId;

    beerModified.category = [...categories].find(c => c.id === beerModified.categoryId);
    delete beerModified.category.beersId;

    beerModified.elements = [...elements].filter(e => beerModified.elementsId.find(id => id === e.id));

    beerModified.comments = [...comments].filter(c => beerModified.commentsId.find(id => id === c.id));

    delete beerModified.breweryId;
    delete beerModified.categoryId;
    delete beerModified.elementsId;
    delete beerModified.commentsId;

    return beerModified;
  });
}

app.get('/beers/composed', (req, res) => {
  res.json(getBeersComposed());
});

app.get('/beers/:id/comments', (req, res) => {
  res.json(comments.filter(comment => comment.beerId === +req.params.id));
});

app.get('/beers/:id/elements', (req, res) => {
  const beer = beers.find(beer => beer.id === +req.params.id);
  res.json(elements.filter(c => beer.elementsId.find(i => +i === c.id)));
});

app.get('/beers/:id', (req, res) => {
  res.json(beers.find(b => b.id === +req.params.id));
});

app.put('/beers/:id', (req, res) => {
  beers.forEach(beer => {
    if (beer.id === +req.params.id) {
      beer = Object.assign(beer, req.body);
    }
    return beer;
  });
  res.json(beers.find(b => b.id === +req.params.id));
});

app.get('/beers', (req, res) => {
  res.json([...beers]);
});

app.get('/breweries/:id/beersComposed', (req, res) => {
  res.json(getBeersComposed().filter(beer => beer.brewery.id === +req.params.id));
});

app.get('/breweries/:id/beers', (req, res) => {
  res.json([...beers].filter(b => b.breweryId === +req.params.id));
});

app.get('/breweries/:id', (req, res) => {
  res.json(breweries.find(b => b.id ===  +req.params.id));
});

app.get('/breweries', (req, res) => {
  res.json(breweries);
});

app.get('/elements', (req, res) => {
  res.json(elements);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
