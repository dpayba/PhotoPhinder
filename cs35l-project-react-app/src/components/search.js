import React from 'react';
import { firebase } from '../firebase';
import db from '../firebase';
import { Feed } from './posts.js';
import {
    Card,
    Media,
    Heading,
    Content,
    Button,
    Columns,
    Navbar,
} from 'react-bulma-components';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import CustomNavbar from "./navbar.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


/* 2 functions below (editDistance and similarity) are taken from https://stackoverflow.com/a/36566052/13604329.
 * these are used for the filtering of results in the search 
 * page.
 * */
function editDistance(s1, s2) {
  s1 = s1.toLowerCase();
  s2 = s2.toLowerCase();

  var costs = new Array();
  for (var i = 0; i <= s1.length; i++) {
    var lastValue = i;
    for (var j = 0; j <= s2.length; j++) {
      if (i == 0)
        costs[j] = j;
      else {
        if (j > 0) {
          var newValue = costs[j - 1];
          if (s1.charAt(i - 1) != s2.charAt(j - 1))
            newValue = Math.min(Math.min(newValue, lastValue),
              costs[j]) + 1;
          costs[j - 1] = lastValue;
          lastValue = newValue;
        }
      }
    }
    if (i > 0)
      costs[s2.length] = lastValue;
  }
  return costs[s2.length];
}

function similarity(s1, s2) {
  var longer = s1;
  var shorter = s2;
  if (s1.length < s2.length) {
    longer = s2;
    shorter = s1;
  }
  var longerLength = longer.length;
  if (longerLength == 0) {
    return 1.0;
  }
  return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

class UserSearchResult extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <tr
                className="search-result"
                onClick={() => this.props.selectEntry(this.props.uid)}
            >
                <td>{this.props.username}</td>
            </tr>
        );
    }
}

class SearchForUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchEntry: '',
            hasSearched: false, // for properly displaying "no results" message
            results: [],
        };
    }

    updateSearchEntry(event) {
        this.setState({
            searchEntry: event.target.value,
        });
    }

    search() {
        if (!this.state.searchEntry) return;
        db.ref('users')
            .get()
            .then((snapshot) => {
                /* this would not be an ideal solution for
                 * a production environment, as we query 
                 * every result in the db. I couldn't find 
                 * a solution to filter results based on
                 * similarity of values with firebase, so
                 * this is required for now.
                 * */
                const response = snapshot.val();
                var results = [];

                for (var uid in response) {
                    results.push({ uid, username: response[uid].username });
                }

                // return all results with a similar username
                const searchQuery = this.state.searchEntry.toLowerCase();
                results = results.filter(result => {
                    const username = result.username.toLowerCase();
                    return username.includes(searchQuery) || searchQuery.includes(username) || similarity(username, searchQuery) > 0.5;
                });

                this.setState({
                    results,
                    hasSearched: true,
                });
            });
    }

    selectEntry(uid) {
        this.props.history.push(`/view-user/${uid}`);
        /* redirect user to visit profile page for the entry they selected */
    }

    handleKeyPress(event) {
        if (event.key === "Enter") {
            this.search() 
        }
    }

    render() {
        const results = this.state.results.map((result) => (
            <UserSearchResult
                selectEntry={(uid) => this.selectEntry(uid)}
                {...result}
                key={result.uid}
            />
        ));

        var resultBody;

        if (this.state.hasSearched) {
            if (this.state.results.length) {
                resultBody = (
                    <>
                        <p className="is-size-4">Results:</p>
                        <table className="table is-fullwidth">
                            <tbody>{results}</tbody>
                        </table>
                    </>
                );
            } else {
                resultBody = (
                    <p className="is-size-4 has-text-danger">No matches</p>
                );
            }
        }

        return (
            <div>
                <CustomNavbar />

                <Columns centered>
                    <Columns.Column className="mx-5">
                        <div className="field has-addons">
                            <div className="control is-expanded">
                                <input
                                    onChange={(event) =>
                                        this.updateSearchEntry(event)
                                    }
                                    className="input"
                                    type="text"
                                    placeholder="Search by username"
                                    onKeyPress={(event) => this.handleKeyPress(event)}
                                />
                            </div>
                            <div className="control">
                                <a
                                    onClick={() => this.search()}
                                    className="button is-info"
                                >
                                    <FontAwesomeIcon icon={faSearch} />
                                </a>
                            </div>
                        </div>

                        <div className="has-text-left">{resultBody}</div>
                    </Columns.Column>
                </Columns>
            </div>
        );
    }
}

export default SearchForUser;
