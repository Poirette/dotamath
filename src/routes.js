import React from 'react';
import {IndexRoute, Route} from 'react-router';
// import { isLoaded as isAuthLoaded, load as loadAuth } from 'redux/modules/auth';
import {
  App,
  NotFound,
  HomeContainer,
  SummaryContainer,
  Match,
  Stats
} from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Route path="/" component={App}>
      { /* Home (main) route */ }
      <IndexRoute component={HomeContainer}/>
      <Route path="stats/:playerIds/:active" component={HomeContainer}>
        <IndexRoute component={SummaryContainer}/>
        <Route path="matches" component={SummaryContainer} />
        <Route path="matches/:matchId" component={Match}>
          <Route path="matches/:matchId/:slot" component={Stats} />
        </Route>
      </Route>

      { /* Catch all route */ }
      <Route path="*" component={NotFound} status={404} />
    </Route>
  );
};
