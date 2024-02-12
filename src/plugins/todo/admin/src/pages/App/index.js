/**
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

/*
This code defines the main component for the admin interface of the todo 
plugin in a Strapi application. Let's break it down:

1. `import React from 'react';`: This line imports the React library,
 allowing the use of JSX syntax to define React components.

2. `import { Switch, Route } from 'react-router-dom';`: This line imports the 
`Switch` and `Route` components from the `react-router-dom` library.
 These components are used to define routing within the React application.

3. `import { AnErrorOccurred } from '@strapi/helper-plugin';`: This line imports
 the `AnErrorOccurred` component from the `@strapi/helper-plugin` package. This
  component is used to display an error message in case of an error.

4. `import pluginId from '../../pluginId';`: This line imports the `pluginId` 
variable from the `../../pluginId` file. This variable is used to get the plugin's 
identifier, which is necessary for defining routes specific to the plugin.

5. `import HomePage from '../HomePage';`: This line imports the `HomePage` component 
from the `../HomePage` file relative to the current directory. This component likely 
represents the main page of the todo plugin.

6. `const App = () => { ... };`: This defines a functional component named `App`. 
It returns the main structure of the admin interface for the todo plugin.

7. `<Switch>...</Switch>`: This block uses the `Switch` component from `react-router-dom` 
to conditionally render one of its child `Route` components based on the current URL path.

8. `<Route path={`/plugins/${pluginId}`} component={HomePage} exact />`: This line defines a
 route that matches the path `/plugins/{pluginId}` where `{pluginId}` is the identifier of
  the plugin. It renders the `HomePage` component when the URL matches exactly.

9. `<Route component={AnErrorOccurred} />`: This line defines a catch-all route that 
renders the `AnErrorOccurred` component when no other route matches the current URL path.

10. `export default App;`: This line exports the `App` component as the default export 
from this file, allowing it to be imported and used in other parts of the application.

Overall, this code sets up the main structure of the admin interface for the todo plugin,
 defining routing and rendering logic for different pages.
*/

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { AnErrorOccurred } from '@strapi/helper-plugin';
import pluginId from '../../pluginId';
import HomePage from '../HomePage';

const App = () => {
  return (
    <div>
      <Switch>
        <Route path={`/plugins/${pluginId}`} component={HomePage} exact />
        <Route component={AnErrorOccurred} />
      </Switch>
    </div>
  );
};

export default App;
