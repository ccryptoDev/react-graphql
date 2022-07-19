

import React, { useState, useEffect } from 'react';
//import data from "./data.json";
import "./style.css";
import Tree from './Tree';
import axios from  'axios'

export let maindata = {};
  
const App = () => {
  const [state, setState] = useState([]);
  const [dom, setDom] = useState([]);
  const [tempData, settempData] = useState(maindata);

  useEffect(() => {
    
   axios.post('http://localhost:3000/graphql?', {
    query: '{getCountriesByCategory}' 
   
  }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => {
      console.log(res.data);
      maindata = JSON.parse(res.data.data.getCountriesByCategory);
       settempData(JSON.parse(res.data.data.getCountriesByCategory));

    }
    
    
    )
}, [])

/**
 * @description collapse current node
 */
  const collapse_upgrade = (data, id) => {
    let node = { "id": "0", "name": "123", "children": [] };
    // for (let k in data)
    //   node[k] = data[k]
    let dataChildren = data.children;
    let tempNode = dataChildren.map((data) => {
      let dataNew = {};
      dataNew.name = data.name;
      dataNew.id = data.id;
      dataNew.children = data.children;

      return dataNew;
    }
    )
    node.children = tempNode;
    for (let k in tempData.children) {
      if ((id == node.children[k].id) || (tempData.children[k].children.length == 0)) {
        node.children[k].children = [];
        settempData(node);
        setState([]);
        return;
      }
    }

  }

  /**
   * @description expanding current node
   */
  const expand_upgrade = (data, id) => {
    let node = { "id": "0", "name": "123", "children": [] };
    let dataChildren = data.children;
    let tempNode = dataChildren.map((data) => {
      let dataNew = {};
      dataNew.name = data.name;
      dataNew.id = data.id;
      dataNew.children = data.children;

      return dataNew;
    });
    node.children = tempNode;


    var temporalData = [];

    for (let child of maindata.children) {
      if (id == child.id) {
        temporalData.push(child.children);
      }
      for (let grandchild of child.children){
        if (id == grandchild.id) {
          temporalData = grandchild.children;
        }
      }
    }

    for (let k in tempData.children) {
      if ((id == node.children[k].id)) {
        node.children[k].children = temporalData[0];
      }

      else {
        if (tempData.children[k].children.length == 0) {
          node.children[k].children = [];
        }
      }
      settempData(node);
      setState([]);
      return;
    }
  }

  /**
   * @description action for when we click leaf node 
   */
  const leafCollpase = (data) => {
    let node = { "id": "0", "name": "123", "children": [] };
    let dataChildren = data.children;
    let tempNode = dataChildren.map((data) => {
      let dataNew = {};
      dataNew.name = data.name;
      dataNew.id = data.id;
      dataNew.children = data.children;

      return dataNew;
    })
    node.children = tempNode;

    for (let child of node.children) {
      setState([]);
      child.children = [];
      settempData(node);
    }
    return;
  }

  /**
   * @description rendering tree function
   * @returns dom
   */
  const renderTreeView = (tempData, i) => {
    let dom = [];
    for (let k in tempData.children) {
      dom.push(<Tree
        data={maindata.children[k]}
        tempData={tempData.children[k]}
        i={i}
        setChanger={settempData}
        expand_upgrade={expand_upgrade}
        collapse_upgrade={collapse_upgrade}
        leafCollapse={leafCollpase}
      />)

      for (let j in tempData.children[k].children) {
        let temp = i + 1;
        dom.push(<Tree
          data={maindata.children[k].children[j]}
          tempData={tempData.children[k].children[j]}
          i={temp}
          setChanger={settempData}
          expand_upgrade={expand_upgrade}
          collapse_upgrade={collapse_upgrade}
          leafCollpase={leafCollpase}
        />)
      }
    }
    return dom;
  }

  return (
    <div className="App">
     { (tempData.name) && renderTreeView(tempData, 0)}
    </div>
  )
}

export default App;