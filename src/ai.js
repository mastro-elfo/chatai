import * as tf from '@tensorflow/tfjs';
import {browserLocalStorage, localStorage} from './node_storage';

/*eslint no-unused-vars: ["off"]*/

var model = null;
var intents = [];
var dictionary = [];
var labels = [];

function clearWord(word) {
  return word.replace(/[.,/#!?$%^&*;:{}=\-_`~()[\]]/g, '').toLowerCase();
}

function transform(sentence) {
  let transformed = sentence.split(' ')
    // Remove duplicates
    .filter((item, pos, self) => self.indexOf(item) == pos)
    .map(w => clearWord(w));
  return dictionary.map(w => transformed.indexOf(w) !== -1 ? 1 : 0);
}

function get_intents() {
  console.log('fetch intents');
  fetch('intents.json')
    .then(response => response.json())
    .then(json => {
      // console.log('intents.json', json);
      intents = json.intents;
    });
}

function get_dictionary(){
  console.log('fetch dictionary');
  fetch('dictionary.json')
    .then(response => response.json())
    .then(json => {
      // console.log('dictionary.json', json);
      dictionary = json;
    });
}

function get_labels() {
  console.log('fetch labels');
  fetch('labels.json')
    .then(response => response.json())
    .then(json => {
      // console.log('labels.json', json);
      labels = json;
    });
}

function get_model() {
  console.log('fetch model');
  fetch('model.json')
    .then(response => response.json())
    .then(json => {
      // console.log('model.json', json);
      localStorage.__dict = json;
      localStorage.length = Object.keys(localStorage.__dict).length;
      // console.log(JSON.parse(localStorage.__dict));
      tf.loadLayersModel(
        browserLocalStorage('localStorage://model'))
        .then(mdl => {
          model = mdl;
          // model.summary();
        });
    });
}

function get_response(label) {
  let responses = intents.find(i => i.tag === label).responses;
  // console.log({responses}, responses[Math.floor(Math.random() *responses.length)]);
  return responses[Math.floor(Math.random() *responses.length)];
}

export function ai_init(){
  // console.log('ai_init');
  get_intents();
  get_dictionary();
  get_labels();
  get_model();
}

export function ai_response(message) {
  if (!model) {
    return "Sorry, I'm disconnected";
  }
  let q = transform(message);
  let prediction = model.predict(tf.tensor2d([q], [1, q.length]));
  // console.log({prediction});
  let data = prediction.dataSync();
  // console.log({data});
  let best = Math.max(...data);
  // console.log({best});
  let label = labels[data.indexOf(best)];
  // console.log({label});
  let response = get_response(label);
  // console.log({response});
  if (best > 0.8) {
    return response;
  }
  else if(best > 0.5) {
    return 'I think the correct answer is: ' + response;
  }
  else {
    return "Sorry, I didn't understand";
  }
}
