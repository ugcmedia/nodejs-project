import express from 'express';
import bodyParser  from 'body-parser';
const app = express();
const PORT = 8000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.post('/api/v1/parse',(req, res) => {
  let data = req.body.data;

  let firstName = data.substr(0, data.indexOf('0'));
  let lastName = ""
  let clientId = ""
  let iteration = 0
  for (let index = firstName.length; index < data.length; index++) {
    if(data.charAt(index) == "0" && iteration == 0){
      firstName +=  data.charAt(index)
    }else{
      iteration = 1
      if(data.charAt(index).match(/[a-z]/i) || data.charAt(index) == "0"){
        lastName += data.charAt(index)
      }else{
        clientId += data.charAt(index)
      }
    }
  }

  let response = {
    firstName,
    lastName,
    clientId
  }
  
  res.status(200).send(response);
});


app.post('/api/v2/parse',(req, res) => {
  let data = req.body.data;
  var p = req.body.p;

  let firstName = data.substr(0, data.indexOf('0'));
  let lastName = ""
  let clientId = ""

  for (let index = firstName.length; index < data.length; index++) {
    if(data.charAt(index).match(/[a-z]/i)){
      lastName +=  data.charAt(index)
    }else if(data.charAt(index) !== "0" ){
      if(clientId.length == 3){
        clientId += "-"
      }
      clientId += data.charAt(index)
    }
  }

  let response = {
    firstName,
    lastName,
    clientId
  }

  res.status(200).send(response);
});


app.listen(PORT, () => {
  console.log(`Server is running at port:${PORT}`);
});