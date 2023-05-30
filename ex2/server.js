const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const port = 15031;

// Set up the templates directory
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

function createVerticalTable(data) {
    let table = '<table class="w3-table-all w3-centered w3-hoverable" style="width:100%">';
    
    for (let key in data) {
      table += '<tr>';
      table += `<td>${key}</td>`;
      
      if (typeof data[key] === 'object' && data[key] !== null) {
        table += '<td>';
        table += createVerticalTable(data[key]);
        table += '</td>';
      } else {
        table += `<td>${data[key]}</td>`;
      }
      
      table += '</tr>';
    }
    
    table += '</table>';
    return table;
  }

  app.get('/especies/:especie', async (req, res) => {
    try {
      const especie = req.params.especie;
      const response = await axios.get(`http://localhost:15030/plantas?especie=${especie}`);
      const plantas = response.data;
      if (plantas.length==0){
        res.status(404).send("EspecieNotFound")
      }
      else{
        nomeCientifico = plantas[0].Nome_Científico
        res.render('especie', { plantas,especie,nomeCientifico});
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
  

app.get('/:item_id', async (req, res) => {
  try {
    const item_id = req.params.item_id;
    const response = await axios.get(`http://localhost:15030/plantas/${item_id}`);
    const emd_data = createVerticalTable(response.data);
    res.render('single', { emd_data });
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', async (req, res) => {
  try {
    const response = await axios.get('http://localhost:15030/plantas/');
    const plantas = response.data;
    const responsef = await axios.get('http://localhost:15030/plantas/freguesias/');
    const freguesias = responsef.data;
    const responsee = await axios.get('http://localhost:15030/plantas/especies/');
    const especies = responsee.data;
    res.render('index', { plantas,freguesias,especies});
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
