import React from 'react';
import './Popup.css';
import axios from 'axios';
import { DOMParser } from 'xmldom';
import LogoEuromilhoes from '../../assets/img/euromilhoes.png';
import LogoTotoloto from '../../assets/img/totoloto.png';
import LogoMilhao from '../../assets/img/milhao.png';

function Result(name, key, date) {
  this.name = name;
  this.key = key;
  this.date = date;
}

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      pubdate: '',
    };
  }
  componentDidMount() {
    this.GetXMLData('https://www.jogossantacasa.pt/web/SCRss/rssFeedCartRes');
  }

  ParseData(data) {
    const parser = new DOMParser().parseFromString(data);

    let pubdate = parser.getElementsByTagName('pubDate');
    let items = parser.getElementsByTagName('item');

    let results = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i].childNodes;
      if (
        item[1].textContent === 'Euromilhões' ||
        item[1].textContent === 'M1lhão' ||
        item[1].textContent === 'Totoloto'
      ) {
        let result = new Result(
          item[1].textContent,
          item[5].textContent.split(': ')[1],
          item[5].textContent
            .split(': ')[0]
            .replace('<b>', '')
            .replace('</b>', '')
        );
        results.push(result);
      }
    }
    this.setState({ results, pubdate: pubdate[0].textContent });
  }

  GetXMLData(url) {
    axios
      .get(url)
      .then((response) => {
        this.ParseData(response.data);
      })
      .catch((e) => {
        console.log('Error: ', e.response.data);
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={LogoEuromilhoes} alt="logo" style={{ marginBottom: 12 }} />
          {this.state.results.map((r, i) => {
            if (r.name === 'Euromilhões') {
              let key = r.key.split(' ');
              return (
                <div key={i}>
                  <div className="new-line" style={{ marginBottom: 8 }}>
                    <span className="lastGameKey">
                      <span>{key[0]}</span>
                      <span>{key[1]}</span>
                      <span>{key[2]}</span>
                      <span>{key[3]}</span>
                      <span>{key[4]}</span>
                      <span className="spacer">{key[5]}</span>
                      <span className="star">{key[6]}</span>
                      <span className="star">{key[7]}</span>
                    </span>
                  </div>
                  <div className="new-line" style={{ fontSize: 14 }}>
                    {r.date}
                  </div>
                </div>
              );
            } else return '';
          })}
          <br></br>
          <img src={LogoMilhao} alt="logo" style={{ marginBottom: 12 }} />
          {this.state.results.map((r, i) => {
            if (r.name === 'M1lhão')
              return (
                <div key={i}>
                  <div
                    className="new-line"
                    style={{ marginBottom: 8, fontSize: 16 }}
                  >
                    {r.key}
                  </div>
                  <div className="new-line" style={{ fontSize: 14 }}>
                    {r.date}
                  </div>
                </div>
              );
            else return '';
          })}
          <br></br>
          <img src={LogoTotoloto} alt="logo" style={{ marginBottom: 12 }} />
          {this.state.results.map((r, i) => {
            if (r.name === 'Totoloto') {
              let key = r.key.split(' ');
              return (
                <div key={i}>
                  <div className="new-line" style={{ marginBottom: 8 }}>
                    <span className="lastGameKey">
                      <span>{key[0]}</span>
                      <span>{key[1]}</span>
                      <span>{key[2]}</span>
                      <span>{key[3]}</span>
                      <span>{key[4]}</span>
                      <span className="spacer">{key[5]}</span>
                      <span className="star">{key[6]}</span>
                    </span>
                  </div>
                  <div className="new-line" style={{ fontSize: 14 }}>
                    {r.date}
                  </div>
                </div>
              );
            } else return '';
          })}
          <br></br>
          <br></br>
          <div className="new-line" style={{ fontSize: 10 }}>
            Last Update: {this.state.pubdate}
          </div>
        </header>
      </div>
    );
  }
}

export default Popup;
