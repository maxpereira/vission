import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Sigma, RelativeSize } from 'react-sigma';
import ReactDOM from 'react-dom';
import NodeMap from './nodeMap.js'
import CommentTest from './commentTest.js';
import NodeDialog from './nodeDialog.js';
import { Button, Header, Image, Modal, Container } from 'semantic-ui-react'
import uuid from "uuid"

// Backend imports
import firebase from 'firebase';
import {DB_CONFIG} from './Config.js';


class App extends Component {
  constructor(props) {
    super(props);
    
    // Connect to Firebase
    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('nodes');

    // Default state
    this.state = {
      nodes: []
    };

    this.onNodeDialogLoad = this.onNodeDialogLoad.bind(this);
    this.loadSigmaRender = this.loadSigmaRender.bind(this);
  };

  helper(nodes) {

    /* 
    INPUT DATA EXAMPLE
    {
    "nodes" : {
      "-K2ib4H77rj0LYewF7dP" : {
        "title" : "Brockhampton",
        "popularity" : "7",
        "parentid" : ""
      }
    }


    OUTPUT DATA EXAMPLE

    new_nodes = {
        "nodes": [
          {
            "id": "n0",
            "label": "A node",
            "x": 0,
            "y": 0,
            "size": 10000
          }
        ],
        "edges": [
          {
            "id": "e0",
            "source": "n0",
            "target": "n1"
          }
        ]
      }
    */

    var new_nodes = {
      "nodes" : [],
      "edges" : []
    };

    for (var node in nodes) {
      var new_node = {};

      new_node.id = node;
      new_node.label = nodes[node].title;
      new_node.size = nodes[node].popularity;
      new_node.x = 0;
      new_node.y = 0;

      new_nodes.nodes.push(new_node);
    }

    for (var node in nodes) {
      if (nodes[node].parentid) {
        for (var other_node in nodes) {
          if (other_node === nodes[node].parentid) {
            new_nodes.edges.push(
              {
                "id" : uuid.v4(),
                "source" : node,
                "target" : other_node
              })
          }
        }
      }
    }

    return new_nodes;
  };

  componentDidMount() {
    // Refresh state on value changes
    this.database.on('value', snap => {
      this.setState({
        nodes: snap.val()
      });
    });
  }

  onNodeDialogLoad() {
    console.log('loaded');
  };

  loadSigmaRender() {
    ReactDOM.render(<NodeMap/>, document.getElementById('nodemap'));
  };

  render() {
    return (
      <div className="App">
        <Modal trigger={<Button>Can I get a yeet.</Button>} onOpen = {this.onNodeDialogLoad}>
          <Modal.Header>Vission > Music > YeetMachine.tm</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Container>
                <Header>Oh my</Header>
                <p>What the fuck did you just fucking say about me, you little bitch? I’ll have you know I graduated top of my class in the Navy Seals, and I’ve been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I’m the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You’re fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that’s just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little “clever” comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn’t, you didn’t, and now you’re paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You’re fucking dead, kiddo.</p>
                <CommentTest/>
              </Container>
            </Modal.Description>
           </Modal.Content>  
        </Modal>
        <Button onClick={this.loadSigmaRender}>Load</Button>

        <div id="nodemap"></div>
      </div>
    );
  }
}

export default App;
