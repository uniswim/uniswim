import React from 'react';

import "typeface-roboto";
import ThemeModule from 'modules/Theme/Theme.module';
import ApolloGraphQLModule from 'modules/ApolloGraphQL/ApolloGraphQL.module';
import DashboardModule from 'modules/Dashboard/Dashboard.module';
import { Router } from '@reach/router';
import LayoutModule from 'modules/Layouts/Layout.module';
import InscriptionExpressModule from 'modules/InscriptionExpress/InscriptionExpress.module';


class App extends React.PureComponent{
  render(){
    return (
        <ApolloGraphQLModule>
          <ThemeModule>
            <LayoutModule>
              <Router>
                <DashboardModule path="/accueil/*" />
                <InscriptionExpressModule path="/inscriptionexpress/*" />
              </Router>
            </LayoutModule>
          </ThemeModule>
        </ApolloGraphQLModule>
    )
  }
}


export default App;
